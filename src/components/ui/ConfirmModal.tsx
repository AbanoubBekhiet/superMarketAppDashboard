import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { STRINGS } from '@/constants/strings';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  message: string;
  confirmLabel?: string;
  isLoading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = STRINGS.common.confirmDeleteTitle,
  message,
  confirmLabel = STRINGS.common.confirmDeleteBtn,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidthClass="max-w-md">
      <div className="flex flex-col gap-md">
        <div className="flex items-start gap-md">
          <span className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </span>
          <p className="font-body text-body-md text-on-surface leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center gap-sm pt-sm border-t border-outline-subtle">
          <Button
            type="button"
            variant="danger"
            size="md"
            isLoading={isLoading}
            onClick={() => void onConfirm()}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            disabled={isLoading}
            onClick={onClose}
          >
            {STRINGS.common.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
