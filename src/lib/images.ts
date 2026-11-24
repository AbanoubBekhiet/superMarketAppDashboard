const IMAGE_MAP: Record<string, string> = {
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

export function getImageUrl(key: string): string {
  return IMAGE_MAP[key] ?? IMAGE_MAP['prod-tomatoes'];
}
