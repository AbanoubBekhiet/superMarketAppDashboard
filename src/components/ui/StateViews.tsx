import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';
import { STRINGS } from '@/constants/strings';
import { Button } from './Button';

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="p-lg flex flex-col gap-md">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-md bg-surface-subtle animate-pulse border border-outline-subtle/50"
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-36 rounded-lg bg-surface-card border border-outline-subtle p-lg animate-pulse flex flex-col justify-between"
        >
          <div className="h-4 w-28 rounded bg-surface-subtle" />
          <div className="h-8 w-36 rounded bg-surface-subtle" />
          <div className="h-3 w-24 rounded bg-surface-subtle" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title = STRINGS.common.emptyTitle,
  subtitle = STRINGS.common.emptySubtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="py-2xl px-lg flex flex-col items-center justify-center text-center gap-sm">
      <span className="w-12 h-12 rounded-full bg-mint-surface text-primary flex items-center justify-center">
        <Inbox className="w-6 h-6" aria-hidden="true" />
      </span>
      <h3 className="font-headline text-title-md text-on-surface">{title}</h3>
      <p className="font-body text-body-md text-on-surface-subtle max-w-sm">{subtitle}</p>
    </div>
  );
}

export function ErrorState({
  title = STRINGS.common.errorTitle,
  message = STRINGS.common.errorMessage,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-surface-card border border-outline-subtle rounded-lg p-xl flex flex-col items-center text-center gap-md">
      <span className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-xs">
        <h3 className="font-headline text-title-md text-on-surface">{title}</h3>
        <p className="font-body text-body-md text-on-surface-muted">{message}</p>
      </div>
      {onRetry ? (
        <Button variant="mint" onClick={onRetry}>
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>{STRINGS.common.retry}</span>
        </Button>
      ) : null}
    </div>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Web ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-xl">
          <div className="max-w-md w-full">
            <ErrorState onRetry={() => this.setState({ hasError: false })} />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
