export type UserRole = 'user' | 'admin';

export type UserAccountStatus = 'active' | 'suspended';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  status: UserAccountStatus;
  avatarKey?: string;
  area: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderCode?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  area: string;
  city: string;
  building?: string;
  floor?: string;
  isDefault: boolean;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  imageKey: string;
  productCount: number;
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
  name: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  subcategoryId?: string;
  description: string;
  imageKey: string;
  unitLabel: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  stock: number;
  stockUnit: string;
  isBestSeller?: boolean;
  isDailyOffer?: boolean;
  badgeText?: string;
  weights: ProductWeightOption[];
}

export interface CartItem {
  productId: string;
  weightOptionId: string;
  name: string;
  imageKey: string;
  unitLabel: string;
  unitPrice: number;
  quantity: number;
}

export type DeliveryTimeSlot = 'instant' | 'scheduled';

export type PaymentMethod = 'cod' | 'card' | 'wallet';

export type PaymentStatus = 'paid' | 'cod';

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

export interface Order {
  id: string;
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
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  relativeTime: string;
  isRead: boolean;
  type: 'order' | 'promo' | 'stock';
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
  topSellingProducts: Array<{
    product: Product;
    todayOrders: number;
  }>;
}
