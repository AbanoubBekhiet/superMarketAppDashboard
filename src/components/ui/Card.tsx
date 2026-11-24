import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-surface-card border border-outline-subtle rounded-lg shadow-card ${
        padded ? 'p-lg' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
