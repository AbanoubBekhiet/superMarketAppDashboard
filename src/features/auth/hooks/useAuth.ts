import { useMutation } from '@tanstack/react-query';
import { useWebAuthStore } from '@/store/authStore';
import { loginAdmin, type LoginPayload } from '../api/authApi';

export function useAdminLogin() {
  const setSession = useWebAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginAdmin(payload),
    onSuccess: (session) => {
      setSession(session);
    },
  });
}
