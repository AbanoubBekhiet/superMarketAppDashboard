import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import { notifyAllCustomersAndPush } from '@/services/notifications/dispatcher';
import type { AppSettingItem, Banner, Coupon } from '@/types/domain';

interface FirestoreCouponDoc {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  usedCount?: number;
  expiresAt?: string | null;
  isActive?: boolean;
  deletedAt?: string | null;
}

interface FirestoreBannerDoc {
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageUrl?: string | null;
  categoryId?: string | null;
  productId?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  deletedAt?: string | null;
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const snap = await getDocs(collection(firestoreDb, 'coupons'));
  return snap.docs
    .map((d) => ({ id: d.id, data: d.data() as FirestoreCouponDoc }))
    .filter(({ data }) => !data.deletedAt)
    .map(({ id, data }) => ({
      id,
      code: data.code,
      type: data.type,
      value: data.value,
      minOrder: data.minOrder,
      maxDiscount: data.maxDiscount ?? null,
      usageLimit: data.usageLimit ?? null,
      usedCount: data.usedCount ?? 0,
      expiresAt: data.expiresAt ?? null,
      isActive: data.isActive ?? true,
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
  const now = new Date().toISOString();
  const cleanCode = payload.code.trim();
  const isNew = !payload.id;

  if (payload.id) {
    await updateDoc(doc(firestoreDb, 'coupons', payload.id), {
      code: cleanCode,
      type: payload.type,
      value: payload.value,
      minOrder: payload.minOrder,
      isActive: payload.isActive,
      updatedAt: now,
    });
  } else {
    await addDoc(collection(firestoreDb, 'coupons'), {
      code: cleanCode,
      type: payload.type,
      value: payload.value,
      minOrder: payload.minOrder,
      maxDiscount: null,
      usageLimit: 1000,
      usedCount: 0,
      expiresAt: null,
      isActive: payload.isActive,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  if (isNew && payload.isActive) {
    const valStr = new Intl.NumberFormat('ar-EG', {
      numberingSystem: 'latn',
      maximumFractionDigits: 2,
    }).format(payload.value);
    const benefit = payload.type === 'percentage' ? `خصم ${valStr}%` : `خصم ${valStr} ج.م`;
    void notifyAllCustomersAndPush({
      title: `عرض جديد: كود ${cleanCode}`,
      body: `لا تفوّت الفرصة! استخدم كود الخصم «${cleanCode}» واحصل على ${benefit} على طلبك من طازج.`,
      type: 'promotion',
      data: { code: cleanCode, kind: 'coupon_offer' },
    }).catch(() => undefined);
  }
}

export async function deleteCoupon(id: string): Promise<void> {
  await updateDoc(doc(firestoreDb, 'coupons', id), {
    deletedAt: new Date().toISOString(),
    isActive: false,
    updatedAt: new Date().toISOString(),
  });
}

export async function fetchBanners(): Promise<Banner[]> {
  const snap = await getDocs(collection(firestoreDb, 'banners'));
  return snap.docs
    .map((d) => ({ id: d.id, data: d.data() as FirestoreBannerDoc }))
    .filter(({ data }) => !data.deletedAt)
    .sort((a, b) => (a.data.sortOrder ?? 0) - (b.data.sortOrder ?? 0))
    .map(({ id, data }) => ({
      id,
      tag: data.tag,
      title: data.title,
      subtitle: data.subtitle,
      ctaLabel: data.ctaLabel,
      imageKey: data.imageUrl ?? 'promo-basket',
      categoryId: data.categoryId ?? null,
      productId: data.productId ?? null,
      sortOrder: data.sortOrder ?? 0,
      isActive: data.isActive ?? true,
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
  const now = new Date().toISOString();
  const isNew = !payload.id;

  if (payload.id) {
    await updateDoc(doc(firestoreDb, 'banners', payload.id), {
      tag: payload.tag.trim(),
      title: payload.title.trim(),
      subtitle: payload.subtitle.trim(),
      ctaLabel: payload.ctaLabel.trim(),
      imageUrl: payload.imageUrl ?? 'local://promo-basket',
      sortOrder: payload.sortOrder ?? 0,
      isActive: payload.isActive,
      updatedAt: now,
    });
  } else {
    await addDoc(collection(firestoreDb, 'banners'), {
      tag: payload.tag.trim(),
      title: payload.title.trim(),
      subtitle: payload.subtitle.trim(),
      ctaLabel: payload.ctaLabel.trim(),
      imageUrl: payload.imageUrl ?? 'local://promo-basket',
      categoryId: null,
      productId: null,
      sortOrder: payload.sortOrder ?? 0,
      isActive: payload.isActive,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  if (isNew && payload.isActive) {
    void notifyAllCustomersAndPush({
      title: `عرض جديد: ${payload.title.trim()}`,
      body: payload.subtitle.trim(),
      type: 'promotion',
      data: { kind: 'banner_offer' },
    }).catch(() => undefined);
  }
}

export async function deleteBanner(id: string): Promise<void> {
  await updateDoc(doc(firestoreDb, 'banners', id), {
    deletedAt: new Date().toISOString(),
    isActive: false,
    updatedAt: new Date().toISOString(),
  });
}

const DEFAULT_STORE_SETTINGS: AppSettingItem[] = [
  { key: 'delivery_fee', value: '20', description: 'رسوم التوصيل القياسية بالجنيه' },
  { key: 'min_order_amount', value: '50', description: 'الحد الأدنى لقيمة الطلب' },
  { key: 'free_delivery_threshold', value: '450', description: 'التوصيل المجاني للطلبات الأعلى من' },
  { key: 'support_phone', value: '+20 102 458 9120', description: 'رقم خدمة العملاء' },
  { key: 'working_hours', value: 'يومياً من ٨ صباحاً حتى ١٢ منتصف الليل', description: 'ساعات العمل' },
];

export async function fetchAppSettings(): Promise<AppSettingItem[]> {
  const snap = await getDocs(collection(firestoreDb, 'appSettings'));
  const items = snap.docs
    .map((d) => d.data() as { key?: string; value?: string; description?: string | null })
    .filter((s) => Boolean(s.key) && s.key !== 'onesignal_app_id')
    .map((s) => ({
      key: s.key!,
      value: s.value ?? '',
      description: s.description ?? null,
    }));

  if (items.length === 0) {
    return DEFAULT_STORE_SETTINGS;
  }
  return items;
}

export async function updateAppSettings(
  entries: { key: string; value: string; description?: string }[],
): Promise<void> {
  const now = new Date().toISOString();
  const batch = writeBatch(firestoreDb);
  entries.forEach((entry) => {
    const desc =
      entry.description ??
      DEFAULT_STORE_SETTINGS.find((d) => d.key === entry.key)?.description ??
      entry.key;
    batch.set(
      doc(firestoreDb, 'appSettings', entry.key),
      {
        key: entry.key,
        value: entry.value,
        description: desc,
        updatedAt: now,
      },
      { merge: true },
    );
  });
  await batch.commit();
}

export async function sendBroadcastNotification(payload: {
  audience: 'all_customers' | 'active_buyers' | 'single_user';
  targetUserId?: string;
  title: string;
  body: string;
  type: 'promotion' | 'system';
}): Promise<{ ok: boolean; recipientsCount: number; pushOk: boolean; pushError?: string }> {
  return notifyAllCustomersAndPush(payload);
}
