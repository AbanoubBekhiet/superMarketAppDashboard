export type UserRole = 'customer' | 'admin' | 'sub_admin';

export type UserAccountStatus = 'active' | 'suspended';

export interface AdminProfileInfo {
  id: string;
  department: string;
  permissionsNotes?: string | null;
  createdByName?: string | null;
}

export interface User {
  id: string;
  firebaseUid: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  status: UserAccountStatus;
  isActive: boolean;
  avatarKey?: string;
  area: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderCode?: string;
  createdAt: string;
  adminProfile?: AdminProfileInfo | null;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface Address {
  id: string;
  label: string;
  governorate: string;
  street: string;
  area: string;
  city: string;
  building?: string | null;
  floor?: string | null;
  apartment?: string | null;
  landmark?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
  deliveryNotes?: string | null;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year?: number | null;
  color: string;
  plateNumber: string;
  isDefault: boolean;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  isActive?: boolean;
}

export interface Category {
  id: string;
  parentId?: string | null;
  name: string;
  slug?: string;
  imageKey: string;
  productCount: number;
  sortOrder?: number;
  isActive: boolean;
  subcategories: Subcategory[];
}

export interface ProductWeightOption {
  id: string;
  label: string;
  price: number;
  oldPrice?: number;
}

export interface Product {
  id: string;
  sku: string;
  barcode?: string | null;
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  description: string;
  imageKey: string;
  unitLabel: string;
  price: number;
  regularPrice?: number;
  salePrice?: number | null;
  purchasePrice?: number | null;
  oldPrice?: number;
  discountPercent?: number;
  stock: number;
  lowStockThreshold?: number;
  stockUnit: string;
  isActive?: boolean;
  isBestSeller?: boolean;
  isDailyOffer?: boolean;
  badgeText?: string;
  weights: ProductWeightOption[];
}

export interface CartItem {
  id?: string;
  productId: string;
  weightOptionId?: string | null;
  name: string;
  imageKey: string;
  unitLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  usedCount: number;
  expiresAt?: string | null;
  isActive: boolean;
}

export interface Banner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  imageKey: string;
  categoryId?: string | null;
  productId?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface AppSettingItem {
  key: string;
  value: string;
  description?: string | null;
}

export type DeliveryTimeSlot = 'instant' | 'scheduled';

export type PaymentMethod = 'cod' | 'card' | 'wallet';

export type PaymentStatus = 'paid' | 'cod' | 'refunded';

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  unitLabel: string;
  unitPrice: number;
  quantity: number;
  imageKey: string;
}

export interface OrderStatusHistoryEntry {
  id: string;
  fromStatus?: string | null;
  toStatus: OrderStatus;
  note?: string | null;
  changedByName?: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber?: number;
  code: string;
  customerId: string;
  customerName: string;
  customerArea: string;
  customerAddress: string;
  itemsCount: number;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode?: string;
  deliverySlot: DeliveryTimeSlot;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  courierName?: string;
  courierPhone?: string;
  etaMinutes?: number;
  placedAt: string;
  deliveredAt?: string | null;
  createdAt: string;
  statusHistory?: OrderStatusHistoryEntry[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  relativeTime: string;
  createdAt: string;
  isRead: boolean;
  type: 'order_update' | 'promotion' | 'system' | 'admin_alert';
  dataPayload?: string | null;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  relativeTime: string;
  tone: 'success' | 'warning' | 'neutral';
  icon: 'bag' | 'warning' | 'check' | 'user';
}

export interface WeeklyRevenuePoint {
  day: string;
  amount: number;
  shortLabel: string;
  highlight?: boolean;
}

export interface CategorySalesDistribution {
  categoryId: string;
  name: string;
  percentage: number;
}

export interface DashboardOverview {
  totalRevenue: number;
  revenueGrowthPercent: number;
  activeOrdersCount: number;
  processingOrdersCount: number;
  avgDeliveryMinutes: number;
  totalProductsCount: number;
  lowStockCount: number;
  totalCategoriesCount: number;
  totalCustomersCount: number;
  weeklyRevenueTotal: number;
  weeklyRevenueGrowthPercent: number;
  weeklyRevenue: WeeklyRevenuePoint[];
  categoryDistribution: CategorySalesDistribution[];
  recentActivities: ActivityItem[];
  topSellingProducts: {
    productId: string;
    name: string;
    categoryName: string;
    price: number;
    imageKey: string;
    todayOrders: number;
  }[];
}
