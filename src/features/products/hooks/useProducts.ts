import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { overviewKeys } from '@/features/overview/hooks/useOverview';
import type { Product } from '@/types/domain';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  type ProductsQueryParams,
  type ProductUpsertPayload,
} from '../api/productsApi';

export const productKeys = {
  all: ['products'] as const,
  list: (params: ProductsQueryParams) => ['products', params] as const,
};

export function useProducts(params: ProductsQueryParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => fetchProducts(params),
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductUpsertPayload) => createProduct(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      qc.invalidateQueries({ queryKey: overviewKeys.all });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProductUpsertPayload> }) =>
      updateProduct(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      qc.invalidateQueries({ queryKey: overviewKeys.all });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onMutate: async (productId) => {
      await qc.cancelQueries({ queryKey: productKeys.all });
      const previous = qc.getQueriesData<Product[]>({ queryKey: productKeys.all });
      qc.setQueriesData<Product[]>({ queryKey: productKeys.all }, (old) =>
        old?.filter((p) => p.id !== productId),
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      ctx?.previous.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      qc.invalidateQueries({ queryKey: overviewKeys.all });
    },
  });
}
