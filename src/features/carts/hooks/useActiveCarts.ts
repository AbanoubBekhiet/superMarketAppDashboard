import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, onSnapshot } from 'firebase/firestore';
import { fetchActiveCarts } from '@/features/carts/api/cartsApi';
import { firestoreDb } from '@/services/firebase/app';

export const activeCartKeys = {
  all: ['active-carts'] as const,
  list: (search: string) => ['active-carts', search] as const,
};

export function useActiveCarts(search = '') {
  const qc = useQueryClient();

  useEffect(() => {
    let initial = true;
    const unsub = onSnapshot(
      collection(firestoreDb, 'carts'),
      () => {
        if (initial) {
          initial = false;
          return;
        }
        void qc.invalidateQueries({ queryKey: activeCartKeys.all });
      },
      () => undefined,
    );
    return () => unsub();
  }, [qc]);

  return useQuery({
    queryKey: activeCartKeys.list(search),
    queryFn: () => fetchActiveCarts(search),
  });
}
