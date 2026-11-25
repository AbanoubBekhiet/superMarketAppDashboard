import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteCoupon,
  fetchAppSettings,
  fetchBanners,
  fetchCoupons,
  sendBroadcastNotification,
  updateAppSettings,
  upsertBanner,
  upsertCoupon,
} from '../api/marketingApi';

export const marketingKeys = {
  coupons: ['coupons'] as const,
  banners: ['banners'] as const,
  settings: ['app-settings'] as const,
};

export function useCoupons() {
  return useQuery({ queryKey: marketingKeys.coupons, queryFn: fetchCoupons });
}

export function useUpsertCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertCoupon,
    onSuccess: () => qc.invalidateQueries({ queryKey: marketingKeys.coupons }),
  });
}

export function useDeleteCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => qc.invalidateQueries({ queryKey: marketingKeys.coupons }),
  });
}

export function useBanners() {
  return useQuery({ queryKey: marketingKeys.banners, queryFn: fetchBanners });
}

export function useUpsertBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: upsertBanner,
    onSuccess: () => qc.invalidateQueries({ queryKey: marketingKeys.banners }),
  });
}

export function useAppSettings() {
  return useQuery({ queryKey: marketingKeys.settings, queryFn: fetchAppSettings });
}

export function useUpdateAppSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAppSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: marketingKeys.settings }),
  });
}

export function useSendBroadcast() {
  return useMutation({ mutationFn: sendBroadcastNotification });
}
