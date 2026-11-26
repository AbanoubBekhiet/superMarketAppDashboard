import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { env } from '@/lib/env';

const isFreshApp = getApps().length === 0;
export const firebaseApp = isFreshApp ? initializeApp(env.firebase) : getApp();
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDb = getFirestore(firebaseApp, 'default');

/**
 * Creates a Firebase Auth user on an isolated secondary app instance so the
 * signed-in primary admin session remains active and uninterrupted.
 */
export async function createSecondaryAuthUser(email: string, password: string): Promise<string> {
  const secondaryApp = initializeApp(
    env.firebase,
    `tazaj-secondary-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  );
  const secondaryAuth = getAuth(secondaryApp);
  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    await signOut(secondaryAuth).catch(() => undefined);
    return cred.user.uid;
  } finally {
    await deleteApp(secondaryApp).catch(() => undefined);
  }
}

/**
 * Uploads an image to Cloudflare R2 via the configured Cloudflare Worker endpoint.
 */
export async function uploadStorageImage(path: string, file: File): Promise<string> {
  const baseUrl = env.r2UploadUrl.trim().replace(/\/+$/, '');
  if (!baseUrl) {
    throw new Error('يرجى ضبط رابط Cloudflare R2 (VITE_R2_UPLOAD_URL) في ملف الإعدادات لرفع الصور');
  }

  const idToken = await firebaseAuth.currentUser?.getIdToken();
  if (!idToken) {
    throw new Error('يرجى تسجيل الدخول أولاً لرفع الصور');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);

  const response = await fetch(`${baseUrl}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errBody = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errBody?.error ?? 'تعذر رفع الصورة إلى Cloudflare R2');
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error('لم يتم استلام رابط الصورة من Cloudflare R2');
  }
  return data.url;
}

export function extractR2KeyFromUrl(urlOrKey?: string | null): string | null {
  if (!urlOrKey) return null;
  const trimmed = urlOrKey.trim();
  if (!trimmed || trimmed.startsWith('local://') || trimmed.startsWith('/')) {
    return null;
  }
  const baseUrl = env.r2UploadUrl.trim().replace(/\/+$/, '');
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      const baseOrigin = baseUrl ? new URL(baseUrl).origin : '';
      if (baseOrigin && parsed.origin !== baseOrigin && !parsed.hostname.endsWith('.r2.dev')) {
        return null;
      }
      const key = decodeURIComponent(parsed.pathname).replace(/^\/+/, '');
      return key || null;
    } catch {
      return null;
    }
  }
  if (trimmed.includes('/')) {
    return trimmed.replace(/^\/+/, '');
  }
  return null;
}

/**
 * Deletes an uploaded image from Cloudflare R2 via the configured Cloudflare Worker endpoint.
 */
export async function deleteStorageImage(urlOrKey?: string | null): Promise<void> {
  const key = extractR2KeyFromUrl(urlOrKey);
  if (!key) return;

  const baseUrl = env.r2UploadUrl.trim().replace(/\/+$/, '');
  if (!baseUrl) return;

  const idToken = await firebaseAuth.currentUser?.getIdToken();
  if (!idToken) return;

  await fetch(`${baseUrl}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key }),
  });
}
