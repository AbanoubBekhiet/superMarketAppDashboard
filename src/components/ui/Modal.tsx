import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { STRINGS } from '@/constants/strings';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidthClass?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidthClass = 'max-w-xl',
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 p-base"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidthClass} bg-surface-card border border-outline-subtle rounded-lg shadow-card overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-lg py-md border-b border-outline-subtle bg-surface">
          <h2 className="font-headline text-title-lg text-on-surface">{title}</h2>
          <button
            type="button"
            aria-label={STRINGS.common.cancel}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-card border border-outline-subtle text-on-surface-muted hover:bg-mint-surface flex items-center justify-center transition-colors duration-state-change"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </header>
        <div className="p-lg max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
