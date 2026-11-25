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
  useEmulators: boolean;
  emulatorHost: string;
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
  useEmulators: import.meta.env.VITE_USE_EMULATORS === 'true',
  emulatorHost: import.meta.env.VITE_EMULATOR_HOST ?? '127.0.0.1',
};
