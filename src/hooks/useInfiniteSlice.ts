import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseInfiniteSliceOptions<T> {
  items: T[];
  initialCount?: number;
  step?: number;
  resetKey?: string | number;
}

/** Progressive infinite-scrolling slice with automatic IntersectionObserver loading. */
export function useInfiniteSlice<T>({
  items,
  initialCount = 15,
  step = 15,
  resetKey = '',
}: UseInfiniteSliceOptions<T>) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  const observerRef = useRef<IntersectionObserver | null>(null);

  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey);
    setVisibleCount(initialCount);
  }

  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(items.length, prev + step));
  }, [items.length, step]);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node || !hasMore || typeof IntersectionObserver === 'undefined') return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            loadMore();
          }
        },
        { rootMargin: '200px' },
      );
      observerRef.current.observe(node);
    },
    [hasMore, loadMore],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount],
  );

  return {
    visibleItems,
    visibleCount: visibleItems.length,
    totalCount: items.length,
    hasMore,
    loadMore,
    sentinelRef,
  };
}
