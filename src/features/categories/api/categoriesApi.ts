import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { deleteStorageImage, firestoreDb, uploadStorageImage } from '@/services/firebase/app';
import { mapCategories, type FirestoreCategoryDoc } from '@/services/firebase/mappers';
import type { Category } from '@/types/domain';

export interface CategoryUpsertPayload {
  name: string;
  isActive: boolean;
  parentId?: string | null;
  imageUrl?: string | null;
}

function makeSlug(name: string): string {
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06ff-]/g, '');
  return `${cleaned || 'cat'}-${Date.now().toString().slice(-4)}`;
}

export async function fetchCategories(search?: string): Promise<Category[]> {
  const [catSnap, prodSnap] = await Promise.all([
    getDocs(collection(firestoreDb, 'categories')),
    getDocs(collection(firestoreDb, 'products')),
  ]);

  const productCounts = new Map<string, number>();
  prodSnap.docs.forEach((d) => {
    const data = d.data() as { categoryId?: string; deletedAt?: string | null };
    if (!data.deletedAt && data.categoryId) {
      productCounts.set(data.categoryId, (productCounts.get(data.categoryId) ?? 0) + 1);
    }
  });

  const activeRows = catSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as FirestoreCategoryDoc) }))
    .filter((c) => !c.deletedAt);

  const mapped = mapCategories(activeRows, productCounts);
  const q = search?.trim().toLowerCase();
  if (!q) return mapped;
  return mapped.filter((c) => c.name.toLowerCase().includes(q));
}

export async function uploadCategoryImage(file: File): Promise<string> {
  const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  return uploadStorageImage(`categories/${cleanName}`, file);
}

export async function createCategory(payload: CategoryUpsertPayload): Promise<Category> {
  const now = new Date().toISOString();
  const imageUrl = payload.imageUrl ?? 'local://logo';
  const ref = await addDoc(collection(firestoreDb, 'categories'), {
    name: payload.name.trim(),
    slug: makeSlug(payload.name),
    isActive: payload.isActive,
    parentId: payload.parentId ?? null,
    imageUrl,
    sortOrder: 0,
    deletedAt: null,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: ref.id,
    parentId: payload.parentId ?? null,
    name: payload.name.trim(),
    imageKey: imageUrl,
    productCount: 0,
    sortOrder: 0,
    isActive: payload.isActive,
    subcategories: [],
  };
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryUpsertPayload>,
): Promise<Category> {
  const catRef = doc(firestoreDb, 'categories', id);
  const snap = await getDoc(catRef);
  if (!snap.exists() || (snap.data() as FirestoreCategoryDoc).deletedAt) {
    throw new Error('القسم غير موجود');
  }
  const current = snap.data() as FirestoreCategoryDoc;

  const patch: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };
  if (payload.name !== undefined) patch.name = payload.name.trim();
  if (payload.isActive !== undefined) patch.isActive = payload.isActive;
  if (payload.parentId !== undefined) patch.parentId = payload.parentId;
  if (payload.imageUrl !== undefined) patch.imageUrl = payload.imageUrl;

  await updateDoc(catRef, patch);

  if (payload.imageUrl !== undefined && current.imageUrl && payload.imageUrl !== current.imageUrl) {
    void deleteStorageImage(current.imageUrl).catch(() => undefined);
  }

  const updated = await fetchCategories();
  return (
    updated.find((c) => c.id === id) ?? {
      id,
      parentId: current.parentId ?? null,
      name: payload.name ?? current.name,
      imageKey: payload.imageUrl ?? current.imageUrl ?? 'local://logo',
      productCount: 0,
      sortOrder: current.sortOrder ?? 0,
      isActive: payload.isActive ?? current.isActive ?? true,
      subcategories: [],
    }
  );
}

export async function deleteCategory(id: string): Promise<void> {
  const catRef = doc(firestoreDb, 'categories', id);
  const snap = await getDoc(catRef);
  const previousImageUrl = snap.exists()
    ? (snap.data() as FirestoreCategoryDoc).imageUrl
    : null;

  await updateDoc(catRef, {
    deletedAt: new Date().toISOString(),
    isActive: false,
    updatedAt: new Date().toISOString(),
  });

  if (previousImageUrl) {
    void deleteStorageImage(previousImageUrl).catch(() => undefined);
  }
}
