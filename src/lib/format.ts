const NUMBER_FORMATTER = new Intl.NumberFormat('ar-EG', {
  numberingSystem: 'latn',
  maximumFractionDigits: 2,
});

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('ar-EG', {
  numberingSystem: 'latn',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
});

const SHORT_DATE_FORMATTER = new Intl.DateTimeFormat('ar-EG', {
  numberingSystem: 'latn',
  day: 'numeric',
  month: 'long',
});

export function formatNumber(value: number): string {
  return NUMBER_FORMATTER.format(value);
}

export function formatCurrency(value: number): string {
  return `${NUMBER_FORMATTER.format(value)} ج.م`;
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return DATE_TIME_FORMATTER.format(date);
}

export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return SHORT_DATE_FORMATTER.format(date);
}
