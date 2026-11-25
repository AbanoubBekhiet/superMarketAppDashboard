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
  categoryId: string;
  price: number;
  salePrice?: number | null;
  purchasePrice?: number | null;
  stockUnit?: string;
  isActive?: boolean;
  isDailyOffer?: boolean;
  imageUrl?: string | null;
}

function sameUuid(a: string, b: string): boolean {
  return a.replace(/-/g, '').toLowerCase() === b.replace(/-/g, '').toLowerCase();
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
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.categoryName.toLowerCase().includes(search),
  );
}

export async function uploadProductImage(nameHint: string, file: File): Promise<string> {
  const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const folder = nameHint.trim().replace(/[^a-zA-Z0-9_-]/g, '') || 'general';
  return uploadStorageImage(`products/${folder}/${cleanName}`, file);
}

export async function createProduct(payload: ProductUpsertPayload): Promise<Product> {
  const internalSku = `TZ-${Date.now().toString().slice(-6)}`;
  const { id } = await callFunction<Record<string, unknown>, { id: string }>('upsertProduct', {
    categoryId: payload.categoryId,
    name: payload.name,
    sku: internalSku,
    price: payload.price,
    salePrice: payload.salePrice ?? null,
    purchasePrice: payload.purchasePrice ?? null,
    stockQuantity: 1000,
    unit: payload.stockUnit?.trim() || 'عبوة',
    imageUrl: payload.imageUrl ?? 'local://prod-tomatoes',
    isActive: payload.isActive ?? true,
    isDailyOffer: payload.isDailyOffer ?? false,
  });
  const all = await fetchProducts({});
  const created = all.find((p) => sameUuid(p.id, id));
  if (created) return created;

  return {
    id: id.replace(/-/g, ''),
    sku: internalSku,
    name: payload.name,
    brand: 'مزارع طازج',
    categoryId: payload.categoryId,
    categoryName: '',
    description: '',
    imageKey: payload.imageUrl ?? 'local://prod-tomatoes',
    unitLabel: payload.stockUnit?.trim() || 'عبوة',
    price: payload.salePrice ?? payload.price,
    regularPrice: payload.price,
    salePrice: payload.salePrice ?? null,
    purchasePrice: payload.purchasePrice ?? null,
    stock: 1000,
    stockUnit: payload.stockUnit?.trim() || 'عبوة',
    isActive: payload.isActive ?? true,
    isDailyOffer: payload.isDailyOffer ?? false,
    weights: [],
  };
}

export async function updateProduct(
  productId: string,
  payload: Partial<ProductUpsertPayload>,
): Promise<Product> {
  const existingList = await fetchProducts({});
  const current = existingList.find((p) => sameUuid(p.id, productId));
  if (!current) throw new Error('المنتج غير موجود');

  await callFunction<Record<string, unknown>, { id: string }>('upsertProduct', {
    id: current.id,
    categoryId: payload.categoryId ?? current.categoryId,
    name: payload.name ?? current.name,
    sku: current.sku,
    price: payload.price ?? current.regularPrice ?? current.price,
    salePrice: payload.salePrice !== undefined ? payload.salePrice : (current.salePrice ?? null),
    purchasePrice:
      payload.purchasePrice !== undefined ? payload.purchasePrice : (current.purchasePrice ?? null),
    stockQuantity: current.stock,
    unit: payload.stockUnit ?? current.stockUnit,
    imageUrl: payload.imageUrl ?? current.imageKey,
    isActive: payload.isActive ?? current.isActive ?? true,
    isFeatured: current.isBestSeller ?? false,
    isDailyOffer: payload.isDailyOffer ?? current.isDailyOffer ?? false,
  });

  const updatedList = await fetchProducts({});
  return (
    updatedList.find((p) => sameUuid(p.id, productId)) ?? {
      ...current,
      ...payload,
      isActive: payload.isActive ?? current.isActive,
    }
  );
}

export async function deleteProduct(productId: string): Promise<void> {
  await callFunction<{ id: string }, { deleted: boolean }>('softDeleteProduct', { id: productId });
}
