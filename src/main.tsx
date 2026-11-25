import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppErrorBoundary } from '@/components/ui/StateViews';
import { queryClient } from '@/lib/queryClient';
import { App } from './App';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppErrorBoundary>
          <App />
          <Toaster
            dir="rtl"
            position="top-left"
            toastOptions={{
              style: {
                fontFamily: '"Tajawal", sans-serif',
                background: '#FFFFFF',
                color: '#1F241F',
                border: '1px solid #DFE4DC',
              },
            }}
          />
        </AppErrorBoundary>
      </QueryClientProvider>
    </StrictMode>,
  );
}
