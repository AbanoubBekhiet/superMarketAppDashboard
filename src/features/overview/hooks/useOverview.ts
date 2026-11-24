import { useQuery } from '@tanstack/react-query';
import { fetchOverview } from '../api/overviewApi';

export const overviewKeys = {
  all: ['overview'] as const,
};

export function useOverview() {
  return useQuery({
    queryKey: overviewKeys.all,
    queryFn: fetchOverview,
  });
}
