import { BellRing, Megaphone, Settings, TicketPercent, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { STRINGS } from '@/constants/strings';
import {
  useAppSettings,
  useBanners,
  useCoupons,
  useDeleteCoupon,
  useSendBroadcast,
  useUpdateAppSettings,
  useUpsertBanner,
  useUpsertCoupon,
} from '@/features/marketing/hooks/useMarketing';
import { formatCurrency } from '@/lib/format';

export function MarketingPage() {
  const { data: coupons = [] } = useCoupons();
  const { data: banners = [] } = useBanners();
  const { data: settings = [] } = useAppSettings();

  const { mutateAsync: saveCoupon, isPending: savingCoupon } = useUpsertCoupon();
  const { mutate: removeCoupon } = useDeleteCoupon();
  const { mutateAsync: saveBanner, isPending: savingBanner } = useUpsertBanner();
  const { mutateAsync: saveSettings, isPending: savingSettings } = useUpdateAppSettings();
  const { mutateAsync: sendBroadcast, isPending: sendingBroadcast } = useSendBroadcast();

  const [audience, setAudience] = useState<'all_customers' | 'active_buyers'>('all_customers');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');

  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'fixed' | 'percentage'>('fixed');
  const [couponValue, setCouponValue] = useState('25');
  const [couponMinOrder, setCouponMinOrder] = useState('100');

  const [bannerTag, setBannerTag] = useState('عرض خاص');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');

  const [draftSettings, setDraftSettings] = useState<Record<string, string>>({});

  const getSettingValue = (key: string) =>
    draftSettings[key] ?? settings.find((s) => s.key === key)?.value ?? '';

  const handleBroadcast = async () => {
    if (!notifTitle.trim() || !notifBody.trim()) return;
    await sendBroadcast({
      audience,
      title: notifTitle.trim(),
      body: notifBody.trim(),
      type: 'promotion',
    });
    toast.success(STRINGS.marketing.broadcastSentToast);
    setNotifTitle('');
    setNotifBody('');
  };

  const handleAddCoupon = async () => {
    const val = Number(couponValue);
    const min = Number(couponMinOrder);
    if (!couponCode.trim() || !Number.isFinite(val) || val <= 0) return;
    await saveCoupon({
      code: couponCode.trim(),
      type: couponType,
      value: val,
      minOrder: Number.isFinite(min) ? min : 0,
      isActive: true,
    });
    toast.success(STRINGS.marketing.couponSavedToast);
    setCouponCode('');
  };

  const handleAddBanner = async () => {
    if (!bannerTitle.trim() || !bannerSubtitle.trim()) return;
    await saveBanner({
      tag: bannerTag.trim() || 'عرض طازج',
      title: bannerTitle.trim(),
      subtitle: bannerSubtitle.trim(),
      ctaLabel: 'تسوق الآن',
      imageUrl: 'local://promo-basket',
      sortOrder: banners.length + 1,
      isActive: true,
    });
    toast.success(STRINGS.marketing.bannerSavedToast);
    setBannerTitle('');
    setBannerSubtitle('');
  };

  const handleSaveSettings = async () => {
    const entries = Object.entries(draftSettings).map(([key, value]) => ({ key, value }));
    if (entries.length === 0) return;
    await saveSettings(entries);
    toast.success(STRINGS.marketing.settingsSavedToast);
  };

  return (
    <AdminLayout title={STRINGS.marketing.pageTitle}>
      <div className="flex flex-col gap-lg">
        <p className="font-body text-body-md text-on-surface-muted">{STRINGS.marketing.subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-start">
          {/* Broadcast Notifications */}
          <Card className="flex flex-col gap-md">
            <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
              <BellRing className="w-5 h-5 text-primary" />
              <h2 className="font-headline text-title-lg text-on-surface">
                {STRINGS.marketing.broadcastTitle}
              </h2>
            </div>

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
              value={notifTitle}
              onChange={(e) => setNotifTitle(e.target.value)}
            />
            <Input
              label={STRINGS.marketing.broadcastBodyLabel}
              value={notifBody}
              onChange={(e) => setNotifBody(e.target.value)}
            />
            <Button
              variant="primary"
              size="lg"
              isLoading={sendingBroadcast}
              onClick={handleBroadcast}
            >
              {STRINGS.marketing.broadcastBtn}
            </Button>
          </Card>

          {/* Store App Settings */}
          <Card className="flex flex-col gap-md">
            <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="font-headline text-title-lg text-on-surface">
                {STRINGS.marketing.settingsTitle}
              </h2>
            </div>

            {settings.map((setting) => (
              <Input
                key={setting.key}
                label={setting.description || setting.key}
                value={getSettingValue(setting.key)}
                onChange={(e) =>
                  setDraftSettings((prev) => ({ ...prev, [setting.key]: e.target.value }))
                }
              />
            ))}

            <Button
              variant="mint-outline"
              size="lg"
              isLoading={savingSettings}
              onClick={handleSaveSettings}
            >
              {STRINGS.common.save}
            </Button>
          </Card>
        </div>

        {/* Coupons & Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-start">
          <Card className="flex flex-col gap-md">
            <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
              <TicketPercent className="w-5 h-5 text-primary" />
              <h2 className="font-headline text-title-lg text-on-surface">
                {STRINGS.marketing.couponsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <Input
                label={STRINGS.marketing.couponCode}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Select
                label={STRINGS.marketing.couponType}
                value={couponType}
                onChange={(e) => setCouponType(e.target.value as 'fixed' | 'percentage')}
                options={[
                  { value: 'fixed', label: STRINGS.marketing.couponTypeFixed },
                  { value: 'percentage', label: STRINGS.marketing.couponTypePercent },
                ]}
              />
              <Input
                label={STRINGS.marketing.couponValue}
                type="number"
                value={couponValue}
                onChange={(e) => setCouponValue(e.target.value)}
              />
              <Input
                label={STRINGS.marketing.couponMinOrder}
                type="number"
                value={couponMinOrder}
                onChange={(e) => setCouponMinOrder(e.target.value)}
              />
            </div>

            <Button variant="mint" isLoading={savingCoupon} onClick={handleAddCoupon}>
              {STRINGS.marketing.addCouponBtn}
            </Button>

            <div className="divide-y divide-outline-subtle">
              {coupons.map((c) => (
                <div key={c.id} className="py-sm flex items-center justify-between gap-sm">
                  <div className="flex items-center gap-sm">
                    <Badge variant="mint">{c.code}</Badge>
                    <span className="font-body text-body-sm text-on-surface-muted">
                      {c.type === 'fixed' ? formatCurrency(c.value) : `${c.value}%`} (حد أدنى{' '}
                      {formatCurrency(c.minOrder)})
                    </span>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => removeCoupon(c.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="flex flex-col gap-md">
            <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
              <Megaphone className="w-5 h-5 text-primary" />
              <h2 className="font-headline text-title-lg text-on-surface">
                {STRINGS.marketing.bannersTitle}
              </h2>
            </div>

            <Input
              label="الشارة"
              value={bannerTag}
              onChange={(e) => setBannerTag(e.target.value)}
            />
            <Input
              label="عنوان البانر"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
            />
            <Input
              label="الوصف المختصر"
              value={bannerSubtitle}
              onChange={(e) => setBannerSubtitle(e.target.value)}
            />
            <Button variant="mint" isLoading={savingBanner} onClick={handleAddBanner}>
              {STRINGS.marketing.addBannerBtn}
            </Button>

            <div className="divide-y divide-outline-subtle">
              {banners.map((b) => (
                <div key={b.id} className="py-sm flex items-center justify-between gap-sm">
                  <div className="flex flex-col">
                    <span className="font-title text-title-sm text-on-surface">{b.title}</span>
                    <span className="font-body text-body-sm text-on-surface-subtle">
                      {b.subtitle}
                    </span>
                  </div>
                  <Badge variant={b.isActive ? 'mint' : 'neutral'}>
                    {b.isActive ? STRINGS.categories.activeLabel : STRINGS.categories.inactiveLabel}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
