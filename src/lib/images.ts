import { env } from '@/lib/env';

const IMAGE_MAP: Record<string, string> = {
  logo: '/images/tazaj/logo.jpeg',
  'prod-tomatoes': '/images/tazaj/prod-tomatoes.png',
  'prod-avocado': '/images/tazaj/prod-avocado.png',
  'prod-milk': '/images/tazaj/prod-milk.png',
  'prod-olive-oil': '/images/tazaj/prod-olive-oil.png',
  'prod-honey': '/images/tazaj/prod-honey.png',
  'prod-bread': '/images/tazaj/prod-bread.png',
  'prod-cheese': '/images/tazaj/prod-cheese.png',
  'prod-juice': '/images/tazaj/prod-juice.png',
  'prod-detergent': '/images/tazaj/prod-detergent.png',
  'prod-chicken': '/images/tazaj/prod-chicken.png',
  'prod-cucumber': '/images/tazaj/prod-cucumber.png',
  'prod-apple': '/images/tazaj/prod-apple.png',
  'cat-vegetables': '/images/tazaj/cat-vegetables.png',
  'cat-dairy': '/images/tazaj/cat-dairy.png',
  'cat-bakery': '/images/tazaj/cat-bakery.png',
  'cat-beverages': '/images/tazaj/cat-beverages.png',
  'cat-cleaning': '/images/tazaj/cat-cleaning.png',
  'cat-meat': '/images/tazaj/cat-meat.png',
  'promo-basket': '/images/tazaj/promo-basket.png',
  'avatar-ahmed': '/images/tazaj/avatar-ahmed.png',
};

/**
 * Resolves either a Cloud Storage download URL, a seeded `local://key` asset, or a legacy key.
 */
export function getImageUrl(keyOrUrl?: string | null): string {
  if (!keyOrUrl) return IMAGE_MAP.logo;
  if (
    keyOrUrl.startsWith('http://') ||
    keyOrUrl.startsWith('https://') ||
    keyOrUrl.startsWith('/') ||
    keyOrUrl.startsWith('blob:') ||
    keyOrUrl.startsWith('data:')
  ) {
    return keyOrUrl;
  }
  const normalized = keyOrUrl.startsWith('local://')
    ? keyOrUrl.replace('local://', '')
    : keyOrUrl;
  if (normalized in IMAGE_MAP) {
    return IMAGE_MAP[normalized];
  }
  const r2Base = env.r2UploadUrl.trim().replace(/\/+$/, '');
  if (r2Base && (normalized.includes('/') || /\.(png|jpe?g|webp|gif|avif)$/i.test(normalized))) {
    return `${r2Base}/${normalized.replace(/^\/+/, '')}`;
  }
  return IMAGE_MAP.logo;
}
