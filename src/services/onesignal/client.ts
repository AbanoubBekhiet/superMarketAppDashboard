import { doc, getDoc, setDoc } from 'firebase/firestore';
import { env } from '@/lib/env';
import { firebaseAuth, firestoreDb } from '@/services/firebase/app';

export interface OneSignalPushResult {
  ok: boolean;
  recipientCount: number;
  skipped?: boolean;
  errorMessage?: string;
}

export interface OneSignalConfigStatus {
  appId: string;
  restApiKey: string;
  source: 'env' | 'firestore' | 'none';
  hasInvalidEnvUuidKey: boolean;
}

export function isLikelyOneSignalAppIdInsteadOfKey(restApiKey: string, appId: string): boolean {
  const cleanKey = restApiKey.trim();
  const cleanApp = appId.trim();
  if (!cleanKey) return false;
  if (cleanApp && cleanKey === cleanApp) return true;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanKey);
}

export async function loadOneSignalConfig(): Promise<OneSignalConfigStatus> {
  const envAppId = env.onesignalAppId.trim();
  const envKey = env.onesignalRestApiKey.trim();
  const hasInvalidEnvUuidKey = isLikelyOneSignalAppIdInsteadOfKey(envKey, envAppId);

  if (envAppId && envKey && !hasInvalidEnvUuidKey) {
    return {
      appId: envAppId,
      restApiKey: envKey,
      source: 'env',
      hasInvalidEnvUuidKey: false,
    };
  }

  try {
    const snap = await getDoc(doc(firestoreDb, 'privateSettings', 'onesignal'));
    if (snap.exists()) {
      const data = snap.data() as { appId?: string; restApiKey?: string };
      const fsAppId = (data.appId ?? '').trim() || envAppId;
      const fsKey = (data.restApiKey ?? '').trim();
      if (fsAppId && fsKey && !isLikelyOneSignalAppIdInsteadOfKey(fsKey, fsAppId)) {
        return {
          appId: fsAppId,
          restApiKey: fsKey,
          source: 'firestore',
          hasInvalidEnvUuidKey,
        };
      }
    }
  } catch {
    // Ignore permission errors before auth completes
  }

  return {
    appId: envAppId,
    restApiKey: '',
    source: 'none',
    hasInvalidEnvUuidKey,
  };
}

export async function saveOneSignalConfig(restApiKey: string, appId?: string): Promise<void> {
  const resolvedAppId = (appId ?? env.onesignalAppId).trim();
  const cleanKey = restApiKey.trim();
  if (!resolvedAppId) {
    throw new Error('يرجى ضبط VITE_ONESIGNAL_APP_ID أولاً.');
  }
  if (!cleanKey) {
    throw new Error('يرجى إدخال OneSignal REST API Key.');
  }
  if (isLikelyOneSignalAppIdInsteadOfKey(cleanKey, resolvedAppId)) {
    throw new Error(
      'القيمة المدخلة عبارة عن App ID وليست REST API Key. انسخ App API Key من OneSignal (Settings → Keys & IDs).',
    );
  }
  await setDoc(
    doc(firestoreDb, 'privateSettings', 'onesignal'),
    {
      appId: resolvedAppId,
      restApiKey: cleanKey,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );
}

async function postOneSignalNotification(
  restApiKey: string,
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; id?: string; recipients?: number; errorMessage?: string }> {
  const sendWithScheme = async (scheme: 'Key' | 'Basic') => {
    const res = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${scheme} ${restApiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => null)) as {
      id?: string;
      recipients?: number;
      errors?: string[] | Record<string, unknown>;
    } | null;
    return { res, json };
  };

  const primaryScheme = restApiKey.startsWith('os_v2_') ? 'Key' : 'Basic';
  let { res, json } = await sendWithScheme(primaryScheme);
  if (res.status === 401 || res.status === 403) {
    const retry = await sendWithScheme(primaryScheme === 'Key' ? 'Basic' : 'Key');
    if (retry.res.ok) {
      res = retry.res;
      json = retry.json;
    }
  }

  const errObj = json?.errors;
  const formattedErrors = Array.isArray(errObj)
    ? errObj.join(', ')
    : errObj && typeof errObj === 'object' && Object.keys(errObj).length > 0
      ? JSON.stringify(errObj)
      : '';

  if (!res.ok) {
    return { ok: false, errorMessage: formattedErrors || `HTTP ${res.status}` };
  }

  if (formattedErrors && !json?.id) {
    return { ok: false, errorMessage: formattedErrors };
  }

  return { ok: true, id: json?.id, recipients: json?.recipients };
}

async function tryWorkerOneSignalProxy(params: {
  title: string;
  body: string;
  externalIds?: string[];
  sendToAllSubscribed?: boolean;
  data?: Record<string, string>;
  appId?: string;
}): Promise<OneSignalPushResult | null> {
  const baseUrl = env.r2UploadUrl.trim().replace(/\/+$/, '');
  const idToken = await firebaseAuth.currentUser?.getIdToken().catch(() => null);
  if (!baseUrl || !idToken) return null;

  try {
    const res = await fetch(`${baseUrl}/push/onesignal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(params),
    });
    const json = (await res.json().catch(() => null)) as {
      ok?: boolean;
      recipientCount?: number;
      errorMessage?: string;
    } | null;
    if (!json) return null;
    if (!res.ok && !json.errorMessage) return null;
    return {
      ok: Boolean(json.ok),
      recipientCount: json.recipientCount ?? 0,
      errorMessage: json.errorMessage,
    };
  } catch {
    return null;
  }
}

export async function sendOneSignalPush(params: {
  title: string;
  body: string;
  externalIds?: string[];
  sendToAllSubscribed?: boolean;
  data?: Record<string, string>;
}): Promise<OneSignalPushResult> {
  const config = await loadOneSignalConfig();
  const appId = config.appId;
  const restApiKey = config.restApiKey;

  if (!appId || !restApiKey) {
    const workerAttempt = await tryWorkerOneSignalProxy({ ...params, appId });
    if (workerAttempt && workerAttempt.ok) {
      return workerAttempt;
    }

    return {
      ok: false,
      recipientCount: 0,
      skipped: true,
      errorMessage: config.hasInvalidEnvUuidKey
        ? 'قيمة VITE_ONESIGNAL_REST_API_KEY في ملف .env مطابقة لـ App ID وليست REST API Key — أضف مفتاح App API Key الحقيقي (os_v2_app_...) في .env أو من صفحة الإشعارات.'
        : 'يرجى ضبط OneSignal REST API Key الصحيح (os_v2_app_...) في .env أو من صفحة الإشعارات بالداشبورد.',
    };
  }

  const externalIds = Array.from(new Set((params.externalIds ?? []).filter(Boolean)));
  if (externalIds.length === 0 && !params.sendToAllSubscribed) {
    return { ok: true, recipientCount: 0 };
  }

  try {
    if (params.sendToAllSubscribed) {
      let result = await postOneSignalNotification(restApiKey, {
        app_id: appId,
        target_channel: 'push',
        included_segments: ['Total Subscriptions'],
        headings: { en: params.title, ar: params.title },
        contents: { en: params.body, ar: params.body },
        data: params.data ?? {},
      });
      if (!result.ok) {
        const legacySegment = await postOneSignalNotification(restApiKey, {
          app_id: appId,
          target_channel: 'push',
          included_segments: ['Subscribed Users'],
          headings: { en: params.title, ar: params.title },
          contents: { en: params.body, ar: params.body },
          data: params.data ?? {},
        });
        if (legacySegment.ok) result = legacySegment;
      }
      return {
        ok: result.ok,
        recipientCount: result.ok ? Math.max(result.recipients ?? 1, externalIds.length, 1) : 0,
        errorMessage: result.errorMessage,
      };
    }

    let sent = 0;
    let lastError: string | undefined;
    for (let i = 0; i < externalIds.length; i += 20000) {
      const chunk = externalIds.slice(i, i + 20000);
      const result = await postOneSignalNotification(restApiKey, {
        app_id: appId,
        target_channel: 'push',
        include_aliases: { external_id: chunk },
        headings: { en: params.title, ar: params.title },
        contents: { en: params.body, ar: bodyText(params.body) },
        data: params.data ?? {},
      });
      if (result.ok) {
        sent += result.recipients ?? chunk.length;
      } else {
        lastError = result.errorMessage;
      }
    }
    return { ok: sent > 0 && !lastError, recipientCount: sent, errorMessage: lastError };
  } catch (err) {
    return {
      ok: false,
      recipientCount: 0,
      errorMessage: err instanceof Error ? err.message : 'تعذر الاتصال بخادم OneSignal',
    };
  }
}

function bodyText(text: string): string {
  return text;
}
