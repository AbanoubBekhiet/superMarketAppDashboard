interface AppEnv {
  apiBaseUrl: string;
  useMocks: boolean;
}

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;
const rawUseMocks = import.meta.env.VITE_USE_MOCKS;

export const env: AppEnv = {
  apiBaseUrl: typeof rawBaseUrl === 'string' && rawBaseUrl.length > 0 ? rawBaseUrl : '/api',
  useMocks: rawUseMocks !== 'false',
};
