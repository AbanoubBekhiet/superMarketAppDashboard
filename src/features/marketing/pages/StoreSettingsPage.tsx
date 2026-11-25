import { Megaphone, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Input } from '@/components/ui/Input';
import { STRINGS } from '@/constants/strings';
import {
  useAppSettings,
  useBanners,
  useDeleteBanner,
  useUpdateAppSettings,
  useUpsertBanner,
} from '@/features/marketing/hooks/useMarketing';
import { getImageUrl } from '@/lib/images';

export function StoreSettingsPage() {
  const { data: banners = [] } = useBanners();
  const { data: settings = [] } = useAppSettings();

  const { mutateAsync: saveBanner, isPending: savingBanner } = useUpsertBanner();
  const { mutateAsync: removeBanner, isPending: isDeletingBanner } = useDeleteBanner();
  const { mutateAsync: saveSettings, isPending: savingSettings } = useUpdateAppSettings();

  const [bannerTag, setBannerTag] = useState('عرض خاص');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [deletingBanner, setDeletingBanner] = useState<{ id: string; title: string } | null>(null);
  const [draftSettings, setDraftSettings] = useState<Record<string, string>>({});

  const getSettingValue = (key: string) =>
    draftSettings[key] ?? settings.find((s) => s.key === key)?.value ?? '';

  const handleAddBanner = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!bannerTitle.trim() || !bannerSubtitle.trim()) {
      toast.error(STRINGS.common.requiredField);
      return;
    }
    try {
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  const handleSaveSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    const entries = Object.entries(draftSettings).map(([key, value]) => ({ key, value }));
    if (entries.length === 0) return;
    try {
      await saveSettings(entries);
      toast.success(STRINGS.marketing.settingsSavedToast);
      setDraftSettings({});
    } catch (err) {
      const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
      toast.error(msg || STRINGS.common.errorMessage);
    }
  };

  return (
    <AdminLayout title={STRINGS.sidebar.storeSettings}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg items-start">
        {/* Store Operational Settings */}
        <Card className="flex flex-col gap-md">
          <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
            <Settings className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="font-headline text-title-lg text-on-surface">
              {STRINGS.marketing.settingsTitle}
            </h2>
          </div>

          <form onSubmit={handleSaveSettings} className="flex flex-col gap-md">
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

            <Button type="submit" variant="mint-outline" size="lg" isLoading={savingSettings}>
              {STRINGS.common.save}
            </Button>
          </form>
        </Card>

        {/* Home Banners */}
        <Card className="flex flex-col gap-md">
          <div className="flex items-center gap-sm pb-sm border-b border-outline-subtle">
            <Megaphone className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="font-headline text-title-lg text-on-surface">
              {STRINGS.marketing.bannersTitle}
            </h2>
          </div>

          <form onSubmit={handleAddBanner} className="flex flex-col gap-md" noValidate>
            <Input
              label="الشارة"
              value={bannerTag}
              onChange={(e) => setBannerTag(e.target.value)}
            />
            <Input
              label="عنوان البانر"
              placeholder="مثال: خصم ١٥٪ على الألبان"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
            />
            <Input
              label="الوصف المختصر"
              placeholder="يسري العرض طوال عطلة نهاية الأسبوع"
              value={bannerSubtitle}
              onChange={(e) => setBannerSubtitle(e.target.value)}
            />
            <Button type="submit" variant="mint" isLoading={savingBanner}>
              {STRINGS.marketing.addBannerBtn}
            </Button>
          </form>

          <div className="divide-y divide-outline-subtle">
            {banners.map((b) => (
              <div key={b.id} className="py-sm flex items-center justify-between gap-sm">
                <div className="flex items-center gap-sm min-w-0">
                  <img
                    src={getImageUrl(b.imageKey)}
                    alt={b.title}
                    className="w-12 h-12 rounded-md object-cover bg-surface shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-title text-title-sm text-on-surface truncate">
                      {b.title}
                    </span>
                    <span className="font-body text-body-sm text-on-surface-subtle truncate">
                      {b.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-xs shrink-0">
                  <Badge variant={b.isActive ? 'mint' : 'neutral'}>
                    {b.isActive ? STRINGS.categories.activeLabel : STRINGS.categories.inactiveLabel}
                  </Badge>
                  <Button
                    variant="danger"
                    size="sm"
                    aria-label={STRINGS.common.delete}
                    onClick={() => setDeletingBanner({ id: b.id, title: b.title })}
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ConfirmModal
        open={deletingBanner !== null}
        onClose={() => setDeletingBanner(null)}
        isLoading={isDeletingBanner}
        message={
          deletingBanner
            ? `هل أنت متأكد من حذف البانر الترويجي «${deletingBanner.title}»؟`
            : STRINGS.common.confirmDeleteGeneric
        }
        onConfirm={async () => {
          if (!deletingBanner) return;
          try {
            await removeBanner(deletingBanner.id);
            toast.success('تم حذف البانر بنجاح');
            setDeletingBanner(null);
          } catch (err) {
            const msg = err instanceof Error ? err.message : STRINGS.common.errorMessage;
            toast.error(msg || STRINGS.common.errorMessage);
          }
        }}
      />
    </AdminLayout>
  );
}
