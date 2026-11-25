import { zodResolver } from '@hookform/resolvers/zod';
import { Leaf, Lock, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { STRINGS } from '@/constants/strings';
import { useAdminLogin } from '@/features/auth/hooks/useAuth';
import { env } from '@/lib/env';
import { isValidPhoneNumber } from '@/lib/phoneAuth';
import { useWebAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  phone: z.string().trim().refine(isValidPhoneNumber, STRINGS.auth.phoneInvalid),
  password: z.string().min(6, STRINGS.auth.passwordMin),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const user = useWebAuthStore((s) => s.user);
  const { mutateAsync: login, isPending } = useAdminLogin();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: env.useEmulators ? '01000000001' : '',
      password: env.useEmulators ? 'Admin123!' : '',
    },
  });

  if (user && (user.role === 'admin' || user.role === 'sub_admin') && user.isActive) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success(STRINGS.auth.loginSuccess);
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.auth.invalidCredentials;
      toast.error(msg || STRINGS.auth.invalidCredentials);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-xl">
      <div className="w-full max-w-md flex flex-col gap-xl">
        <div className="flex flex-col items-center text-center gap-sm">
          <div className="w-14 h-14 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-card">
            <Leaf className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-headline text-headline-lg text-on-surface">{STRINGS.auth.loginTitle}</h1>
          <p className="font-body text-body-md text-on-surface-muted">{STRINGS.auth.loginSubtitle}</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md" noValidate>
            <Input
              label={STRINGS.auth.phoneLabel}
              type="tel"
              dir="ltr"
              placeholder={STRINGS.auth.phonePlaceholder}
              startIcon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label={STRINGS.auth.passwordLabel}
              type="password"
              placeholder={STRINGS.auth.passwordPlaceholder}
              startIcon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" variant="primary" size="lg" isLoading={isPending} className="mt-sm">
              {STRINGS.auth.loginButton}
            </Button>

            {env.useEmulators ? (
              <div className="flex flex-col gap-xs pt-xs border-t border-outline-subtle">
                <Button
                  type="button"
                  variant="mint"
                  size="sm"
                  disabled={isPending}
                  onClick={() => {
                    setValue('phone', '01000000001');
                    setValue('password', 'Admin123!');
                  }}
                >
                  {STRINGS.auth.demoAdminButton}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => {
                    setValue('phone', '01000000002');
                    setValue('password', 'SubAdmin123!');
                  }}
                >
                  {STRINGS.auth.demoSubAdminButton}
                </Button>
              </div>
            ) : null}
          </form>
        </Card>
      </div>
    </div>
  );
}
