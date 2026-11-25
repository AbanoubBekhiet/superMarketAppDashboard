import { adminListAllProducts } from '@/dataconnect-generated';
import { callFunction, dataConnect, uploadStorageImage } from '@/services/firebase/app';
import { mapProduct } from '@/services/firebase/mappers';
import type { Product } from '@/types/domain';

export interface ProductsQueryParams {
  categoryId?: string;
  search?: string;
}

export interface ProductUpsertPayload {
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  stock: number;
  stockUnit?: string;
  imageUrl?: string | null;
}

export async function fetchProducts(params: ProductsQueryParams = {}): Promise<Product[]> {
  const { data } = await adminListAllProducts(dataConnect, {
    categoryId:
      params.categoryId && params.categoryId !== 'all' ? params.categoryId : undefined,
  });

  const mapped = data.products.map(mapProduct);
  const search = params.search?.trim().toLowerCase();
  if (!search) return mapped;

  return mapped.filter(
    (p) => p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search),
  );
}

export async function uploadProductImage(sku: string, file: File): Promise<string> {
  const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  return uploadStorageImage(`products/${sku || 'general'}/${cleanName}`, file);
}

export async function createProduct(payload: ProductUpsertPayload): Promise<Product> {
  const { id } = await callFunction<Record<string, unknown>, { id: string }>('upsertProduct', {
    categoryId: payload.categoryId,
    name: payload.name,
    sku: payload.sku,
    price: payload.price,
    stockQuantity: payload.stock,
    unit: payload.stockUnit ?? 'عبوة',
    imageUrl: payload.imageUrl ?? 'local://prod-tomatoes',
    isActive: true,
  });
  const all = await fetchProducts({});
  const created = all.find((p) => p.id === id);
  if (!created) throw new Error('تعذر جلب المنتج بعد الحفظ');
  return created;
}

export async function updateProduct(
  productId: string,
  payload: Partial<ProductUpsertPayload>,
): Promise<Product> {
  const existingList = await fetchProducts({});
  const current = existingList.find((p) => p.id === productId);
  if (!current) throw new Error('المنتج غير موجود');

  await callFunction<Record<string, unknown>, { id: string }>('upsertProduct', {
    id: productId,
    categoryId: payload.categoryId ?? current.categoryId,
    name: payload.name ?? current.name,
    sku: payload.sku ?? current.sku,
    price: payload.price ?? current.price,
    stockQuantity: payload.stock ?? current.stock,
    unit: payload.stockUnit ?? current.stockUnit,
    imageUrl: payload.imageUrl ?? current.imageKey,
    isActive: current.isActive ?? true,
    isFeatured: current.isBestSeller ?? false,
    isDailyOffer: current.isDailyOffer ?? false,
  });

  const updatedList = await fetchProducts({});
  const updated = updatedList.find((p) => p.id === productId);
  if (!updated) throw new Error('المنتج غير موجود');
  return updated;
}

export async function deleteProduct(productId: string): Promise<void> {
  await callFunction<{ id: string }, { deleted: boolean }>('softDeleteProduct', { id: productId });
}
