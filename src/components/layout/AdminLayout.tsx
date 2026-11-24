import { useState, type ReactNode } from 'react';
import {
  Bell,
  FolderTree,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Package,
  ReceiptText,
  Search,
  Users,
  X,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/Badge';
import { STRINGS } from '@/constants/strings';
import {
  useMarkAllNotificationsRead,
  useNotifications,
} from '@/features/notifications/hooks/useNotifications';
import { formatNumber } from '@/lib/format';
import { useWebAuthStore } from '@/store/authStore';

interface AdminLayoutProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  children: ReactNode;
}

const NAV_ITEMS = [
  { to: '/', label: STRINGS.sidebar.overview, icon: LayoutDashboard },
  { to: '/orders', label: STRINGS.sidebar.orders, icon: ReceiptText },
  { to: '/products', label: STRINGS.sidebar.products, icon: Package },
  { to: '/categories', label: STRINGS.sidebar.categories, icon: FolderTree },
  { to: '/customers', label: STRINGS.sidebar.customers, icon: Users },
] as const;

export function AdminLayout({
  title,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = STRINGS.overview.searchPlaceholder,
  children,
}: AdminLayoutProps) {
  const user = useWebAuthStore((s) => s.user);
  const logout = useWebAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { data: notifications = [] } = useNotifications();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    logout();
    toast.success(STRINGS.auth.logoutSuccess);
    navigate('/login', { replace: true });
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-xl">
        {/* Brand Mark */}
        <div className="flex items-center justify-between px-sm pt-xs">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-md bg-primary text-on-primary flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-title-lg text-on-surface">
                {STRINGS.brand.name}
              </span>
              <span className="font-body text-body-sm text-on-surface-subtle">
                {STRINGS.brand.subtitle}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label={STRINGS.common.cancel}
            className="lg:hidden w-9 h-9 rounded-md border border-outline-subtle flex items-center justify-center text-on-surface"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav aria-label={STRINGS.brand.subtitle} className="flex flex-col gap-xs">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-md rounded-md font-label text-label-lg transition-colors duration-state-change ${
                  isActive
                    ? 'bg-mint-surface border border-outline text-primary-deep'
                    : 'text-on-surface-muted hover:bg-surface hover:text-primary border border-transparent'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Admin Footer */}
      <div className="pt-base border-t border-outline-subtle flex items-center justify-between gap-sm px-sm">
        <div className="flex items-center gap-md min-w-0">
          <div className="w-9 h-9 rounded-full bg-mint-surface text-primary-deep flex items-center justify-center font-headline text-title-sm shrink-0">
            {user?.name?.charAt(0) ?? 'س'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-title text-title-sm text-on-surface truncate">
              {user?.name ?? 'سارة الشافعي'}
            </span>
            <span className="font-body text-body-sm text-on-surface-subtle">
              {STRINGS.brand.roleLabel}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          aria-label={STRINGS.common.logout}
          title={STRINGS.common.logout}
          className="w-9 h-9 rounded-md bg-surface border border-outline-subtle text-error hover:bg-error-container flex items-center justify-center transition-colors duration-state-change shrink-0"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-surface-card border-e border-outline-subtle min-h-screen flex-col p-base sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-on-surface/40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="w-72 max-w-[85vw] bg-surface-card border-e border-outline-subtle h-full p-base"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      ) : null}

      {/* Main Workspace */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-surface-card border-b border-outline-subtle px-base lg:px-xl py-base flex items-center justify-between gap-md flex-wrap">
          <div className="flex items-center gap-md">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={STRINGS.brand.subtitle}
              className="lg:hidden w-10 h-10 rounded-md bg-surface border border-outline-subtle text-on-surface flex items-center justify-center"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-headline text-headline-md lg:text-headline-lg text-on-surface">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-md">
            {onSearchChange ? (
              <div className="relative flex items-center w-56 sm:w-72">
                <Search
                  aria-hidden="true"
                  className="w-5 h-5 text-on-surface-subtle absolute start-3 pointer-events-none"
                />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label={searchPlaceholder}
                  placeholder={searchPlaceholder}
                  className="w-full bg-surface border border-outline-subtle rounded-md ps-10 pe-base py-sm font-body text-body-md text-on-surface placeholder:text-on-surface-subtle focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            ) : null}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label={STRINGS.common.notifications}
                onClick={() => setNotifOpen((prev) => !prev)}
                className="relative w-10 h-10 rounded-full bg-surface border border-outline-subtle text-on-surface flex items-center justify-center hover:bg-mint-surface transition-colors duration-state-change"
              >
                <Bell className="w-5 h-5" aria-hidden="true" />
                {unreadCount > 0 ? (
                  <Badge
                    variant="numeric"
                    className="absolute -top-1 -end-1"
                  >
                    {formatNumber(unreadCount)}
                  </Badge>
                ) : null}
              </button>

              {notifOpen ? (
                <div className="absolute end-0 mt-sm w-80 bg-surface-card border border-outline-subtle rounded-lg shadow-card z-40 overflow-hidden">
                  <div className="px-base py-md border-b border-outline-subtle flex items-center justify-between bg-surface">
                    <span className="font-title text-title-sm text-on-surface">
                      {STRINGS.common.notifications}
                    </span>
                    <button
                      type="button"
                      onClick={() => markAllRead()}
                      className="font-label text-label-sm text-primary hover:underline"
                    >
                      {STRINGS.common.markAllRead}
                    </button>
                  </div>
                  <div className="divide-y divide-outline-subtle max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-base font-body text-body-sm text-on-surface-subtle text-center">
                        {STRINGS.common.noNotifications}
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-md flex flex-col gap-xs ${
                            n.isRead ? 'bg-surface-card' : 'bg-mint-surface/35'
                          }`}
                        >
                          <span className="font-title text-title-sm text-on-surface">
                            {n.title}
                          </span>
                          <span className="font-body text-body-sm text-on-surface-muted">
                            {n.body}
                          </span>
                          <span className="font-body text-body-sm text-on-surface-subtle">
                            {n.relativeTime}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-base lg:p-xl flex-1 flex flex-col gap-lg">{children}</main>
      </div>
    </div>
  );
}
