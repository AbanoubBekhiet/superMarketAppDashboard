interface FirebaseEnvConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface AppEnv {
  firebase: FirebaseEnvConfig;
  onesignalAppId: string;
  onesignalRestApiKey: string;
  r2UploadUrl: string;
}

export const env: AppEnv = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'supermarketapp-cd828',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  },
  onesignalAppId: import.meta.env.VITE_ONESIGNAL_APP_ID ?? '',
  onesignalRestApiKey: import.meta.env.VITE_ONESIGNAL_REST_API_KEY ?? '',
  r2UploadUrl: import.meta.env.VITE_R2_UPLOAD_URL ?? '',
};
