import { env } from '@/lib/env';

export interface OneSignalPushResult {
  ok: boolean;
  recipientCount: number;
  skipped?: boolean;
  errorMessage?: string;
}

async function postOneSignalNotification(
  restApiKey: string,
  payload: Record<string, unknown>,
): Promise<{ ok: boolean; id?: string; errorMessage?: string }> {
  const res = await fetch('https://api.onesignal.com/notifications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${restApiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const json = (await res.json().catch(() => null)) as {
    id?: string;
    errors?: string[] | Record<string, string[]>;
  } | null;

  if (!res.ok) {
    const rawErr = Array.isArray(json?.errors)
      ? json.errors.join(', ')
      : json?.errors
        ? JSON.stringify(json.errors)
        : `HTTP ${res.status}`;
    return { ok: false, errorMessage: rawErr };
  }

  if (Array.isArray(json?.errors) && json.errors.length > 0 && !json.id) {
    return { ok: false, errorMessage: json.errors.join(', ') };
  }

  return { ok: true, id: json?.id };
}

export async function sendOneSignalPush(params: {
  title: string;
  body: string;
  externalIds?: string[];
  sendToAllSubscribed?: boolean;
  data?: Record<string, string>;
}): Promise<OneSignalPushResult> {
  const appId = env.onesignalAppId.trim();
  const restApiKey = env.onesignalRestApiKey.trim();

  if (!appId || !restApiKey) {
    return {
      ok: false,
      recipientCount: 0,
      skipped: true,
      errorMessage: 'يرجى ضبط VITE_ONESIGNAL_APP_ID و VITE_ONESIGNAL_REST_API_KEY في ملف .env.',
    };
  }

  const externalIds = Array.from(new Set((params.externalIds ?? []).filter(Boolean)));
  if (externalIds.length === 0 && !params.sendToAllSubscribed) {
    return { ok: true, recipientCount: 0 };
  }

  try {
    if (params.sendToAllSubscribed) {
      const result = await postOneSignalNotification(restApiKey, {
        app_id: appId,
        target_channel: 'push',
        included_segments: ['Total Subscriptions'],
        headings: { en: params.title, ar: params.title },
        contents: { en: params.body, ar: params.body },
        data: params.data ?? {},
      });
      return {
        ok: result.ok,
        recipientCount: result.ok ? Math.max(1, externalIds.length) : 0,
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
        contents: { en: params.body, ar: params.body },
        data: params.data ?? {},
      });
      if (result.ok) {
        sent += chunk.length;
      } else {
        lastError = result.errorMessage;
      }
    }
    return { ok: sent > 0, recipientCount: sent, errorMessage: lastError };
  } catch (err) {
    return {
      ok: false,
      recipientCount: 0,
      errorMessage: err instanceof Error ? err.message : 'تعذر الاتصال بخادم OneSignal',
    };
  }
}
