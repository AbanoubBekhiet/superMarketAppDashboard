import { getApp, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { connectorConfig } from '@/dataconnect-generated';
import { env } from '@/lib/env';

const isFreshApp = getApps().length === 0;
export const firebaseApp = isFreshApp ? initializeApp(env.firebase) : getApp();
export const firebaseAuth = getAuth(firebaseApp);
export const dataConnect = getDataConnect(firebaseApp, connectorConfig);
export const firebaseFunctions = getFunctions(firebaseApp, 'europe-west3');
export const firebaseStorage = getStorage(firebaseApp);

if (isFreshApp && env.useEmulators) {
  const host = env.emulatorHost;
  connectAuthEmulator(firebaseAuth, `http://${host}:9099`, { disableWarnings: true });
  connectDataConnectEmulator(dataConnect, host, 9399);
  connectFunctionsEmulator(firebaseFunctions, host, 5001);
  connectStorageEmulator(firebaseStorage, host, 9199);
}

export async function callFunction<TReq, TRes>(name: string, payload: TReq): Promise<TRes> {
  const fn = httpsCallable<TReq, TRes>(firebaseFunctions, name);
  const result = await fn(payload);
  return result.data;
}

export async function uploadStorageImage(path: string, file: File): Promise<string> {
  const storageRef = ref(firebaseStorage, path);
  await uploadBytes(storageRef, file, { contentType: file.type || 'image/jpeg' });
  return getDownloadURL(storageRef);
}
