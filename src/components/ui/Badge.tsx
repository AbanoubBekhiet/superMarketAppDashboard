import type { ReactNode } from 'react';

export type BadgeVariant = 'mint' | 'warning' | 'error' | 'neutral' | 'numeric';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const BADGE_CLASSES: Record<BadgeVariant, string> = {
  mint: 'bg-mint-surface text-on-mint-surface rounded-sm px-sm py-xs font-label text-label-sm',
  warning:
    'bg-warning-container text-on-warning-container rounded-sm px-sm py-xs font-label text-label-sm',
  error:
    'bg-error-container text-on-error-container rounded-sm px-sm py-xs font-label text-label-sm',
  neutral:
    'bg-surface-subtle text-on-surface rounded-sm px-sm py-xs font-label text-label-sm',
  numeric:
    'bg-mint-surface border border-primary text-on-mint-surface rounded-full min-w-5 h-5 px-xs font-label text-label-sm inline-flex items-center justify-center',
};

export function Badge({ variant = 'mint', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center tabular-nums ${BADGE_CLASSES[variant]} ${className}`}>
      {children}
    </span>
  );
}
