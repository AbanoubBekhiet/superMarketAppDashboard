import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'mint' | 'mint-outline' | 'outline' | 'danger' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary hover:bg-primary-hover text-on-primary border border-transparent',
  mint: 'bg-mint-surface hover:bg-soft-accent border border-outline text-on-mint-surface',
  'mint-outline':
    'bg-mint-surface hover:bg-soft-accent border-2 border-primary text-on-mint-surface',
  outline:
    'bg-surface hover:border-primary border border-outline-subtle text-on-surface',
  danger:
    'bg-surface hover:bg-error-container border border-outline-subtle text-error',
  icon: 'bg-surface hover:bg-mint-surface border border-outline-subtle text-on-surface rounded-full',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-md py-xs text-label-md rounded-md',
  md: 'px-base py-sm text-label-md rounded-md',
  lg: 'px-lg py-md text-label-lg rounded-md',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const baseClasses =
    'inline-flex items-center justify-center gap-xs font-label transition-colors duration-state-change focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClass = variant === 'icon' ? 'w-10 h-10 p-0' : SIZE_CLASSES[size];

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
