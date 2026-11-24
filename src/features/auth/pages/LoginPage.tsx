import { zodResolver } from '@hookform/resolvers/zod';
import { Leaf, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { STRINGS } from '@/constants/strings';
import { useAdminLogin } from '@/features/auth/hooks/useAuth';
import { useWebAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().trim().email(STRINGS.auth.emailInvalid),
  password: z.string().min(6, STRINGS.auth.passwordMin),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const user = useWebAuthStore((s) => s.user);
  const { mutateAsync: login, isPending } = useAdminLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@tazaj.eg',
      password: 'password123',
    },
  });

  if (user?.role === 'admin') {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success(STRINGS.auth.loginSuccess);
    } catch {
      toast.error(STRINGS.auth.invalidCredentials);
    }
  };

  const handleQuickDemo = async () => {
    try {
      await login({ email: 'admin@tazaj.eg', password: 'password123' });
      toast.success(STRINGS.auth.loginSuccess);
    } catch {
      toast.error(STRINGS.auth.invalidCredentials);
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
              label={STRINGS.auth.emailLabel}
              type="email"
              placeholder={STRINGS.auth.emailPlaceholder}
              startIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
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

            <Button
              type="button"
              variant="mint"
              size="md"
              disabled={isPending}
              onClick={handleQuickDemo}
            >
              {STRINGS.auth.demoAdminButton}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
