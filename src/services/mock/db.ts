import type {
  Category,
  DashboardOverview,
  NotificationItem,
  Order,
  OrderStatus,
  Product,
  User,
  UserAccountStatus,
} from '@/types/domain';
import {
  INITIAL_CATEGORIES,
  INITIAL_DASHBOARD_OVERVIEW,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_USERS,
} from './data';

class MockDatabase {
  users: User[] = structuredClone(INITIAL_USERS);
  categories: Category[] = structuredClone(INITIAL_CATEGORIES);
  products: Product[] = structuredClone(INITIAL_PRODUCTS);
  orders: Order[] = structuredClone(INITIAL_ORDERS);
  notifications: NotificationItem[] = structuredClone(INITIAL_NOTIFICATIONS);

  getOverview(): DashboardOverview {
    const activeOrders = this.orders.filter(
      (o) => o.status === 'pending' || o.status === 'processing' || o.status === 'on_the_way',
    );
    const processingOrders = this.orders.filter((o) => o.status === 'processing');
    const lowStock = this.products.filter((p) => p.stock <= 10);

    return {
      ...INITIAL_DASHBOARD_OVERVIEW,
      activeOrdersCount: Math.max(38, activeOrders.length + 35),
      processingOrdersCount: Math.max(12, processingOrders.length + 11),
      totalProductsCount: 1240 + (this.products.length - INITIAL_PRODUCTS.length),
      lowStockCount: Math.max(lowStock.length, 7),
      totalCategoriesCount: this.categories.length,
      totalCustomersCount: 2418 + (this.users.filter((u) => u.role === 'user').length - 4),
      topSellingProducts: [
        { product: this.products[0] ?? INITIAL_PRODUCTS[0], todayOrders: 84 },
        { product: this.products[2] ?? INITIAL_PRODUCTS[2], todayOrders: 62 },
        { product: this.products[3] ?? INITIAL_PRODUCTS[3], todayOrders: 41 },
      ],
    };
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Order | null {
    const idx = this.orders.findIndex((o) => o.id === orderId);
    if (idx === -1) return null;
    this.orders[idx] = { ...this.orders[idx], status };
    return this.orders[idx];
  }

  createProduct(input: {
    name: string;
    sku: string;
    categoryId: string;
    price: number;
    stock: number;
    stockUnit?: string;
  }): Product {
    const category = this.categories.find((c) => c.id === input.categoryId) ?? this.categories[0];
    const id = `prd-${Date.now()}`;
    const unit = input.stockUnit || 'عبوة';
    const created: Product = {
      id,
      sku: input.sku,
      name: input.name,
      brand: 'طازج المختار',
      categoryId: category.id,
      categoryName: category.name,
      description: `${input.name} طازج ومختار بعناية يومياً من متجر طازج.`,
      imageKey: category.imageKey.replace('cat-', 'prod-') === 'cat-vegetables' ? 'prod-tomatoes' : 'prod-honey',
      unitLabel: `1 ${unit}`,
      price: input.price,
      stock: input.stock,
      stockUnit: unit,
      weights: [{ id: `w-${id}`, label: `1 ${unit}`, price: input.price }],
    };
    this.products = [created, ...this.products];
    return created;
  }

  updateProduct(
    productId: string,
    input: Partial<Pick<Product, 'name' | 'sku' | 'categoryId' | 'price' | 'stock' | 'stockUnit'>>,
  ): Product | null {
    const idx = this.products.findIndex((p) => p.id === productId);
    if (idx === -1) return null;
    const current = this.products[idx];
    const category = input.categoryId
      ? (this.categories.find((c) => c.id === input.categoryId) ?? current)
      : null;

    const updated: Product = {
      ...current,
      ...input,
      categoryName:
        category && 'name' in category ? category.name : current.categoryName,
    };
    this.products[idx] = updated;
    return updated;
  }

  deleteProduct(productId: string): boolean {
    const len = this.products.length;
    this.products = this.products.filter((p) => p.id !== productId);
    return this.products.length < len;
  }

  createCategory(input: { name: string; isActive: boolean }): Category {
    const created: Category = {
      id: `cat-${Date.now()}`,
      name: input.name,
      imageKey: 'cat-vegetables',
      productCount: 0,
      isActive: input.isActive,
      subcategories: [],
    };
    this.categories = [created, ...this.categories];
    return created;
  }

  updateCategory(
    categoryId: string,
    input: Partial<Pick<Category, 'name' | 'isActive'>>,
  ): Category | null {
    const idx = this.categories.findIndex((c) => c.id === categoryId);
    if (idx === -1) return null;
    this.categories[idx] = { ...this.categories[idx], ...input };
    return this.categories[idx];
  }

  deleteCategory(categoryId: string): boolean {
    const len = this.categories.length;
    this.categories = this.categories.filter((c) => c.id !== categoryId);
    return this.categories.length < len;
  }

  updateCustomerStatus(userId: string, status: UserAccountStatus): User | null {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], status };
    return this.users[idx];
  }

  markAllNotificationsRead(): NotificationItem[] {
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
    return this.notifications;
  }
}

export const mockDb = new MockDatabase();
