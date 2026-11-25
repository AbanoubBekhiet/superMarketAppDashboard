import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { overviewKeys } from '@/features/overview/hooks/useOverview';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
  type CategoryUpsertPayload,
} from '../api/categoriesApi';

export const categoryKeys = {
  all: ['categories'] as const,
  list: (search?: string) => ['categories', { search }] as const,
};

export function useCategories(search?: string) {
  return useQuery({
    queryKey: categoryKeys.list(search),
    queryFn: () => fetchCategories(search),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryUpsertPayload) => createCategory(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: categoryKeys.all });
      await qc.refetchQueries({ queryKey: categoryKeys.all });
      qc.invalidateQueries({ queryKey: overviewKeys.all });
    },
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CategoryUpsertPayload> }) =>
      updateCategory(id, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: categoryKeys.all });
      await qc.refetchQueries({ queryKey: categoryKeys.all });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
      qc.invalidateQueries({ queryKey: overviewKeys.all });
    },
  });
}
