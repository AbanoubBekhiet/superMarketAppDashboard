import { apiClient } from '@/services/api/client';
import type { Category } from '@/types/domain';

export interface CategoryUpsertPayload {
  name: string;
  isActive: boolean;
}

export async function fetchCategories(search?: string): Promise<Category[]> {
  const { data } = await apiClient.get<Category[]>('/categories', {
    params: search ? { search } : undefined,
  });
  return data;
}

export async function createCategory(payload: CategoryUpsertPayload): Promise<Category> {
  const { data } = await apiClient.post<Category>('/categories', payload);
  return data;
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryUpsertPayload>,
): Promise<Category> {
  const { data } = await apiClient.patch<Category>(`/categories/${id}`, payload);
  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await apiClient.delete(`/categories/${id}`);
}
