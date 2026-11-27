import { useQuery } from '@tanstack/react-query';

export interface ResolvedGeoAddress {
  formattedAddress: string;
  area: string;
  city: string;
  street: string;
}

const geoCache = new Map<string, ResolvedGeoAddress>();

function buildCacheKey(latitude: number, longitude: number): string {
  return `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
}

function dedupeParts(parts: (string | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of parts) {
    const clean = part?.trim();
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

export function formatLatLngCoords(
  latitude?: number | null,
  longitude?: number | null,
): string | null {
  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number' ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null;
  }
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

export async function reverseGeocodeCoords(
  latitude: number,
  longitude: number,
): Promise<ResolvedGeoAddress | null> {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  const cacheKey = buildCacheKey(latitude, longitude);
  const cached = geoCache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      String(latitude),
    )}&lon=${encodeURIComponent(String(longitude))}&accept-language=ar`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      display_name?: string;
      address?: {
        road?: string;
        pedestrian?: string;
        neighbourhood?: string;
        suburb?: string;
        city_district?: string;
        city?: string;
        town?: string;
        village?: string;
        state?: string;
      };
    };
    const addr = data.address;
    const street = addr?.road || addr?.pedestrian || addr?.neighbourhood || '';
    const area =
      addr?.suburb || addr?.city_district || addr?.neighbourhood || addr?.town || addr?.village || '';
    const city = addr?.city || addr?.town || addr?.state || '';
    const formattedAddress =
      dedupeParts([street, area, city, addr?.state]).join('، ') || data.display_name?.trim() || '';
    if (!formattedAddress) return null;
    const resolved: ResolvedGeoAddress = {
      formattedAddress,
      area: area || city || 'الإسكندرية',
      city: city || 'الإسكندرية',
      street: street || area || formattedAddress,
    };
    geoCache.set(cacheKey, resolved);
    return resolved;
  } catch {
    return null;
  }
}

export function useResolvedGeoAddress(params: {
  latitude?: number | null;
  longitude?: number | null;
  fallback?: string | null;
}) {
  const { latitude, longitude, fallback } = params;
  const coordsText = formatLatLngCoords(latitude, longitude);
  const hasCoords = latitude != null && longitude != null && coordsText !== null;

  const query = useQuery({
    queryKey: ['reverse-geocode', coordsText ?? 'none'],
    queryFn: () => reverseGeocodeCoords(latitude!, longitude!),
    enabled: hasCoords,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });

  const resolvedText = query.data?.formattedAddress?.trim();
  const cleanFallback = fallback?.trim();

  return {
    address: resolvedText || cleanFallback || coordsText || 'غير محدد',
    coordsText,
    isResolving: hasCoords && query.isLoading,
  };
}
