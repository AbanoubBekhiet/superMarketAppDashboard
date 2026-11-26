import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { deleteStorageImage, firestoreDb, uploadStorageImage } from '@/services/firebase/app';
import { mapProduct, type FirestoreProductDoc } from '@/services/firebase/mappers';
import { notifyAllCustomersAndPush } from '@/services/notifications/dispatcher';
import type { Product } from '@/types/domain';

export interface ProductsQueryParams {
  categoryId?: string;
  search?: string;
}

export interface ProductUpsertPayload {
  id?: string;
  name: string;
  categoryId: string;
  price: number;
  salePrice?: number | null;
  purchasePrice?: number | null;
  stockUnit?: string;
  isActive?: boolean;
  isDailyOffer?: boolean;
  imageUrl?: string | null;
}

export function reserveProductId(): string {
  return doc(collection(firestoreDb, 'products')).id;
}

function buildOfferNotificationText(
  productName: string,
  price: number,
  salePrice?: number | null,
): { title: string; body: string } {
  const displayPrice = salePrice && salePrice < price ? salePrice : price;
  const priceStr = new Intl.NumberFormat('ar-EG', {
    numberingSystem: 'latn',
    maximumFractionDigits: 2,
  }).format(displayPrice);
  return {
    title: `عرض خاص على ${productName}`,
    body: `تسوق الآن "${productName}" بسعر ${priceStr} ج.م لفترة محدودة من طازج.`,
  };
}

export async function fetchProducts(params: ProductsQueryParams = {}): Promise<Product[]> {
  const [prodSnap, catSnap, costSnap] = await Promise.all([
    getDocs(collection(firestoreDb, 'products')),
    getDocs(collection(firestoreDb, 'categories')),
    getDocs(collection(firestoreDb, 'productCosts')).catch(() => null),
  ]);

  const categoryMap = new Map<string, string>();
  catSnap.docs.forEach((d) => {
    const data = d.data() as { name?: string };
    if (data.name) categoryMap.set(d.id, data.name);
  });

  const costMap = new Map<string, number | null>();
  costSnap?.docs.forEach((d) => {
    const data = d.data() as { purchasePrice?: number | null };
    costMap.set(d.id, data.purchasePrice ?? null);
  });

  let mapped = prodSnap.docs
    .map((d) => ({ id: d.id, data: d.data() as FirestoreProductDoc }))
    .filter(({ data }) => !data.deletedAt)
    .map(({ id, data }) => mapProduct(id, data, categoryMap, costMap.get(id) ?? null));

  if (params.categoryId && params.categoryId !== 'all') {
    mapped = mapped.filter((p) => p.categoryId === params.categoryId);
  }

  const search = params.search?.trim().toLowerCase();
  if (search) {
    mapped = mapped.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.categoryName.toLowerCase().includes(search),
    );
  }

  return mapped;
}

export async function uploadProductImage(productId: string, file: File): Promise<string> {
  const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const cleanId = productId.trim().replace(/[^a-zA-Z0-9_-]/g, '');
  if (!cleanId) {
    throw new Error('معرف المنتج غير صالح لرفع الصورة');
  }
  return uploadStorageImage(`products/${cleanId}/${cleanName}`, file);
}

export async function createProduct(payload: ProductUpsertPayload): Promise<Product> {
  const now = new Date().toISOString();
  const internalSku = `TZ-${Date.now().toString().slice(-6)}`;
  const unit = payload.stockUnit?.trim() || 'عبوة';
  const imageUrl = payload.imageUrl ?? 'local://logo';

  const catSnap = await getDoc(doc(firestoreDb, 'categories', payload.categoryId));
  const categoryName = catSnap.exists()
    ? ((catSnap.data() as { name?: string }).name ?? '')
    : '';

  const isActive = payload.isActive ?? true;
  const isDailyOffer = payload.isDailyOffer ?? false;
  const salePrice = payload.salePrice ?? null;

  const docData: FirestoreProductDoc = {
    categoryId: payload.categoryId,
    categoryName,
    name: payload.name.trim(),
    brand: 'مزارع طازج',
    description: '',
    sku: internalSku,
    price: payload.price,
    salePrice,
    stockQuantity: 1000,
    lowStockThreshold: 10,
    unit,
    imageUrl,
    isActive,
    isFeatured: false,
    isDailyOffer,
    weights: [
      {
        id: `w-${Date.now()}`,
        label: unit,
        price: payload.price,
        salePrice,
        sortOrder: 0,
        isDefault: true,
      },
    ],
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  };

  const targetId = payload.id?.trim();
  let productId: string;
  if (targetId) {
    await setDoc(doc(firestoreDb, 'products', targetId), docData);
    productId = targetId;
  } else {
    const ref = await addDoc(collection(firestoreDb, 'products'), docData);
    productId = ref.id;
  }

  await setDoc(doc(firestoreDb, 'productCosts', productId), {
    purchasePrice: payload.purchasePrice ?? null,
    updatedAt: now,
  });

  if (isDailyOffer && isActive) {
    const tpl = buildOfferNotificationText(payload.name.trim(), payload.price, salePrice);
    void notifyAllCustomersAndPush({
      title: tpl.title,
      body: tpl.body,
      type: 'promotion',
      data: { productId, kind: 'product_offer' },
    }).catch(() => undefined);
  }

  return mapProduct(productId, docData, new Map([[payload.categoryId, categoryName]]), payload.purchasePrice ?? null);
}

export async function updateProduct(
  productId: string,
  payload: Partial<ProductUpsertPayload>,
): Promise<Product> {
  const prodRef = doc(firestoreDb, 'products', productId);
  const snap = await getDoc(prodRef);
  if (!snap.exists() || (snap.data() as FirestoreProductDoc).deletedAt) {
    throw new Error('المنتج غير موجود');
  }
  const current = snap.data() as FirestoreProductDoc;
  const now = new Date().toISOString();

  const nextCategoryId = payload.categoryId ?? current.categoryId;
  let nextCategoryName = current.categoryName ?? '';
  if (payload.categoryId && payload.categoryId !== current.categoryId) {
    const catSnap = await getDoc(doc(firestoreDb, 'categories', nextCategoryId));
    nextCategoryName = catSnap.exists()
      ? ((catSnap.data() as { name?: string }).name ?? nextCategoryName)
      : nextCategoryName;
  }

  const nextName = payload.name?.trim() ?? current.name;
  const nextPrice = payload.price ?? current.price;
  const nextSalePrice = payload.salePrice !== undefined ? payload.salePrice : (current.salePrice ?? null);
  const nextIsActive = payload.isActive ?? current.isActive ?? true;
  const nextIsDailyOffer = payload.isDailyOffer ?? current.isDailyOffer ?? false;
  const nextUnit = payload.stockUnit?.trim() || current.unit || 'عبوة';
  const nextImageUrl = payload.imageUrl ?? current.imageUrl ?? 'local://logo';

  const patch: Partial<FirestoreProductDoc> = {
    categoryId: nextCategoryId,
    categoryName: nextCategoryName,
    name: nextName,
    price: nextPrice,
    salePrice: nextSalePrice,
    unit: nextUnit,
    imageUrl: nextImageUrl,
    isActive: nextIsActive,
    isDailyOffer: nextIsDailyOffer,
    updatedAt: now,
  };

  await updateDoc(prodRef, patch);

  if (payload.imageUrl !== undefined && current.imageUrl && payload.imageUrl !== current.imageUrl) {
    void deleteStorageImage(current.imageUrl).catch(() => undefined);
  }

  if (payload.purchasePrice !== undefined) {
    await setDoc(doc(firestoreDb, 'productCosts', productId), {
      purchasePrice: payload.purchasePrice,
      updatedAt: now,
    });
  }

  const wasDailyOffer = Boolean(current.isDailyOffer);
  if (nextIsDailyOffer && !wasDailyOffer && nextIsActive) {
    const tpl = buildOfferNotificationText(nextName, nextPrice, nextSalePrice);
    void notifyAllCustomersAndPush({
      title: tpl.title,
      body: tpl.body,
      type: 'promotion',
      data: { productId, kind: 'product_offer' },
    }).catch(() => undefined);
  }

  const all = await fetchProducts({});
  const updated = all.find((p) => p.id === productId);
  if (updated) return updated;

  return mapProduct(
    productId,
    { ...current, ...patch },
    new Map([[nextCategoryId, nextCategoryName]]),
    payload.purchasePrice ?? null,
  );
}

export async function deleteProduct(productId: string): Promise<void> {
  const prodRef = doc(firestoreDb, 'products', productId);
  const snap = await getDoc(prodRef);
  const previousImageUrl = snap.exists()
    ? (snap.data() as FirestoreProductDoc).imageUrl
    : null;

  await updateDoc(prodRef, {
    deletedAt: new Date().toISOString(),
    isActive: false,
    updatedAt: new Date().toISOString(),
  });

  if (previousImageUrl) {
    void deleteStorageImage(previousImageUrl).catch(() => undefined);
  }
}
