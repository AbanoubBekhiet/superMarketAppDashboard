import { BellRing } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { STRINGS } from '@/constants/strings';
import { useSendBroadcast } from '@/features/marketing/hooks/useMarketing';

export function NotificationsBroadcastPage() {
  const { mutateAsync: sendBroadcast, isPending: sendingBroadcast } = useSendBroadcast();

  const [audience, setAudience] = useState<'all_customers' | 'active_buyers'>('all_customers');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');

  const handleBroadcast = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!notifTitle.trim() || !notifBody.trim()) {
      toast.error(STRINGS.common.requiredField);
      return;
    }
    try {
      await sendBroadcast({
        audience,
        title: notifTitle.trim(),
        body: notifBody.trim(),
        type: 'promotion',
      });
      toast.success(STRINGS.marketing.broadcastSentToast);
      setNotifTitle('');
      setNotifBody('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  return (
    <AdminLayout title={STRINGS.sidebar.notifications}>
      <div className="max-w-2xl">
        <Card className="flex flex-col gap-md">
          <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
            <BellRing className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="font-headline text-title-lg text-on-surface">
              {STRINGS.marketing.broadcastTitle}
            </h2>
          </div>

          <form onSubmit={handleBroadcast} className="flex flex-col gap-md" noValidate>
            <Select
              label={STRINGS.marketing.broadcastAudience}
              value={audience}
              onChange={(e) => setAudience(e.target.value as 'all_customers' | 'active_buyers')}
              options={[
                { value: 'all_customers', label: STRINGS.marketing.audienceAll },
                { value: 'active_buyers', label: STRINGS.marketing.audienceActive },
              ]}
            />
            <Input
              label={STRINGS.marketing.broadcastTitleLabel}
              placeholder="مثال: عروض نهاية الأسبوع الطازجة"
              value={notifTitle}
              onChange={(e) => setNotifTitle(e.target.value)}
            />
            <Input
              label={STRINGS.marketing.broadcastBodyLabel}
              placeholder="اكتب نص الإشعار الذي سيصل للعملاء..."
              value={notifBody}
              onChange={(e) => setNotifBody(e.target.value)}
            />
            <Button type="submit" variant="primary" size="lg" isLoading={sendingBroadcast}>
              {STRINGS.marketing.broadcastBtn}
            </Button>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
