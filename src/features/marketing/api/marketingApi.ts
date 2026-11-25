import {
  adminListBanners,
  adminListCoupons,
  listAppSettings,
} from '@/dataconnect-generated';
import { callFunction, dataConnect } from '@/services/firebase/app';
import type { AppSettingItem, Banner, Coupon } from '@/types/domain';

export async function fetchCoupons(): Promise<Coupon[]> {
  const { data } = await adminListCoupons(dataConnect);
  return data.coupons.map((c) => ({
    id: c.id,
    code: c.code,
    type: c.type as Coupon['type'],
    value: c.value,
    minOrder: c.minOrder,
    maxDiscount: c.maxDiscount ?? null,
    usageLimit: c.usageLimit ?? null,
    usedCount: c.usedCount,
    expiresAt: c.expiresAt ?? null,
    isActive: c.isActive,
  }));
}

export async function upsertCoupon(payload: {
  id?: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  isActive: boolean;
}): Promise<void> {
  await callFunction('upsertCoupon', payload);
}

export async function deleteCoupon(id: string): Promise<void> {
  await callFunction('softDeleteCoupon', { id });
}

export async function fetchBanners(): Promise<Banner[]> {
  const { data } = await adminListBanners(dataConnect);
  return data.banners.map((b) => ({
    id: b.id,
    tag: b.tag,
    title: b.title,
    subtitle: b.subtitle,
    ctaLabel: b.ctaLabel,
    imageKey: b.imageUrl ?? 'promo-basket',
    categoryId: b.categoryId ?? null,
    productId: b.productId ?? null,
    sortOrder: b.sortOrder,
    isActive: b.isActive,
  }));
}

export async function upsertBanner(payload: {
  id?: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageUrl?: string | null;
  sortOrder?: number;
  isActive: boolean;
}): Promise<void> {
  await callFunction('upsertBanner', payload);
}

export async function fetchAppSettings(): Promise<AppSettingItem[]> {
  const { data } = await listAppSettings(dataConnect);
  return data.appSettings.map((s) => ({
    key: s.key,
    value: s.value,
    description: s.description ?? null,
  }));
}

export async function updateAppSettings(
  entries: { key: string; value: string; description?: string }[],
): Promise<void> {
  await callFunction('updateAppSettings', { entries });
}

export async function sendBroadcastNotification(payload: {
  audience: 'all_customers' | 'active_buyers' | 'single_user';
  targetUserId?: string;
  title: string;
  body: string;
  type: 'promotion' | 'system';
}): Promise<{ ok: boolean; recipientsCount: number }> {
  return callFunction('sendNotificationBroadcast', payload);
}
