import { useResolvedGeoAddress } from '@/lib/geocoding';

interface ResolvedAddressTextProps {
  latitude?: number | null;
  longitude?: number | null;
  fallback?: string | null;
  className?: string;
}

export function ResolvedAddressText({
  latitude,
  longitude,
  fallback,
  className = 'font-body text-body-sm text-on-surface',
}: ResolvedAddressTextProps) {
  const { address } = useResolvedGeoAddress({ latitude, longitude, fallback });
  return <span className={className}>{address}</span>;
}
