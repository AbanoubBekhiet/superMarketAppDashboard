import { adminListAllCategories } from '@/dataconnect-generated';
import { callFunction, dataConnect, uploadStorageImage } from '@/services/firebase/app';
import { mapCategories } from '@/services/firebase/mappers';
import type { Category } from '@/types/domain';

export interface CategoryUpsertPayload {
  name: string;
  isActive: boolean;
  parentId?: string | null;
  imageUrl?: string | null;
}

export async function fetchCategories(search?: string): Promise<Category[]> {
  const { data } = await adminListAllCategories(dataConnect);
  const mapped = mapCategories(data.categories);
  const q = search?.trim().toLowerCase();
  if (!q) return mapped;
  return mapped.filter((c) => c.name.toLowerCase().includes(q));
}

export async function uploadCategoryImage(file: File): Promise<string> {
  const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  return uploadStorageImage(`categories/${cleanName}`, file);
}

export async function createCategory(payload: CategoryUpsertPayload): Promise<Category> {
  const { id } = await callFunction<Record<string, unknown>, { id: string }>('upsertCategory', {
    name: payload.name,
    isActive: payload.isActive,
    parentId: payload.parentId ?? null,
    imageUrl: payload.imageUrl ?? 'local://cat-vegetables',
  });
  const list = await fetchCategories();
  const created = list.find((c) => c.id === id);
  if (!created) throw new Error('تعذر جلب القسم بعد الإنشاء');
  return created;
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryUpsertPayload>,
): Promise<Category> {
  const list = await fetchCategories();
  const current = list.find((c) => c.id === id);
  if (!current) throw new Error('القسم غير موجود');

  await callFunction<Record<string, unknown>, { id: string }>('upsertCategory', {
    id,
    name: payload.name ?? current.name,
    isActive: payload.isActive ?? current.isActive,
    parentId: payload.parentId ?? current.parentId ?? null,
    imageUrl: payload.imageUrl ?? current.imageKey,
    sortOrder: current.sortOrder ?? 0,
  });

  const updatedList = await fetchCategories();
  const updated = updatedList.find((c) => c.id === id);
  if (!updated) throw new Error('القسم غير موجود');
  return updated;
}

export async function deleteCategory(id: string): Promise<void> {
  await callFunction<{ id: string }, { deleted: boolean }>('softDeleteCategory', { id });
}
