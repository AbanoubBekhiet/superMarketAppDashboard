import { ShieldAlert } from 'lucide-react';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card } from '@/components/ui/Card';
import { STRINGS } from '@/constants/strings';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { CategoriesPage } from '@/features/categories/pages/CategoriesPage';
import { ActiveCartsPage } from '@/features/carts/pages/ActiveCartsPage';
import { CustomersPage } from '@/features/customers/pages/CustomersPage';
import { CouponsPage } from '@/features/marketing/pages/CouponsPage';
import { NotificationsBroadcastPage } from '@/features/marketing/pages/NotificationsBroadcastPage';
import { OffersPage } from '@/features/marketing/pages/OffersPage';
import { StoreSettingsPage } from '@/features/marketing/pages/StoreSettingsPage';
import { OrdersPage } from '@/features/orders/pages/OrdersPage';
import { OverviewPage } from '@/features/overview/pages/OverviewPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';
import { SubAdminsPage } from '@/features/subAdmins/pages/SubAdminsPage';
import { useWebAuthStore } from '@/store/authStore';

function ProtectedStaffRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const user = useWebAuthStore((s) => s.user);
  const isHydrated = useWebAuthStore((s) => s.isHydrated);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-xl">
        <span className="font-title text-title-md text-on-surface-muted">
          {STRINGS.common.loading}
        </span>
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && user.role !== 'sub_admin') || !user.isActive) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return (
      <AdminLayout title={STRINGS.common.adminOnlyTitle}>
        <Card className="max-w-lg mx-auto mt-xl flex flex-col items-center text-center gap-md p-xl">
          <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="font-headline text-headline-md text-on-surface">
            {STRINGS.common.adminOnlyTitle}
          </h2>
          <p className="font-body text-body-md text-on-surface-muted">
            {STRINGS.common.adminOnlyMessage}
          </p>
        </Card>
      </AdminLayout>
    );
  }

  return <>{children}</>;
}

export function App() {
  const hydrate = useWebAuthStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedStaffRoute>
              <OverviewPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedStaffRoute>
              <OrdersPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedStaffRoute>
              <ProductsPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedStaffRoute>
              <CategoriesPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedStaffRoute>
              <CustomersPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/active-carts"
          element={
            <ProtectedStaffRoute>
              <ActiveCartsPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <ProtectedStaffRoute>
              <OffersPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/coupons"
          element={
            <ProtectedStaffRoute>
              <CouponsPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedStaffRoute>
              <NotificationsBroadcastPage />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="/store-settings"
          element={
            <ProtectedStaffRoute>
              <StoreSettingsPage />
            </ProtectedStaffRoute>
          }
        />
        <Route path="/marketing" element={<Navigate to="/offers" replace />} />
        <Route
          path="/sub-admins"
          element={
            <ProtectedStaffRoute adminOnly>
              <SubAdminsPage />
            </ProtectedStaffRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
