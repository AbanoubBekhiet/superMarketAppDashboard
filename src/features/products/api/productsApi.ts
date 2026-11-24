import { apiClient } from '@/services/api/client';
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
}

export async function fetchProducts(params: ProductsQueryParams = {}): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>('/products', { params });
  return data;
}

export async function createProduct(payload: ProductUpsertPayload): Promise<Product> {
  const { data } = await apiClient.post<Product>('/products', payload);
  return data;
}

export async function updateProduct(
  productId: string,
  payload: Partial<ProductUpsertPayload>,
): Promise<Product> {
  const { data } = await apiClient.patch<Product>(`/products/${productId}`, payload);
  return data;
}

export async function deleteProduct(productId: string): Promise<void> {
  await apiClient.delete(`/products/${productId}`);
}
