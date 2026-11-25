import { sanitizePublicEmail } from '@/lib/phoneAuth';
import type {
  AdminListAllCategoriesData,
  AdminListAllProductsData,
  AdminListCustomersData,
  AdminListOrdersData,
  AdminListStaffNotificationsData,
} from '@/dataconnect-generated';
import type {
  Category,
  DeliveryTimeSlot,
  NotificationItem,
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
  User,
} from '@/types/domain';

export function formatRelativeArabic(iso: string): string {
  const diffMin = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.round(diffHours / 24);
  return `منذ ${diffDays} يوم`;
}

export function mapCategories(rows: AdminListAllCategoriesData['categories']): Category[] {
  const parents = rows.filter((r) => !r.parentId);
  const children = rows.filter((r) => Boolean(r.parentId));

  return parents.map((parent) => ({
    id: parent.id,
    parentId: null,
    name: parent.name,
    slug: parent.slug,
    imageKey: parent.imageUrl ?? 'cat-vegetables',
    productCount: parent.products_on_category.length,
    sortOrder: parent.sortOrder,
    isActive: parent.isActive,
    subcategories: children
      .filter((c) => c.parentId === parent.id)
      .map((sub) => ({
        id: sub.id,
        categoryId: parent.id,
        name: sub.name,
        isActive: sub.isActive,
      })),
  }));
}

export function mapProduct(row: AdminListAllProductsData['products'][number]): Product {
  const effectivePrice = row.salePrice ?? row.price;
  const oldPrice = row.salePrice ? row.price : undefined;
  const discountPercent =
    oldPrice && oldPrice > effectivePrice
      ? Math.round(((oldPrice - effectivePrice) / oldPrice) * 100)
      : undefined;

  return {
    id: row.id,
    sku: row.sku,
    barcode: row.barcode ?? null,
    name: row.name,
    brand: row.brand,
    categoryId: row.categoryId,
    categoryName: row.category.name,
    description: row.description,
    imageKey: row.productImages_on_product[0]?.imageUrl ?? 'prod-tomatoes',
    unitLabel: row.unit,
    price: effectivePrice,
    oldPrice,
    discountPercent,
    stock: row.stockQuantity,
    lowStockThreshold: row.lowStockThreshold,
    stockUnit: row.unit,
    isActive: row.isActive,
    isBestSeller: row.isFeatured,
    isDailyOffer: row.isDailyOffer,
    badgeText: row.badgeText ?? undefined,
    weights: row.productWeights_on_product.map((w) => ({
      id: w.id,
      label: w.label,
      price: w.salePrice ?? w.price,
      oldPrice: w.salePrice ? w.price : undefined,
    })),
  };
}

export function mapOrder(row: AdminListOrdersData['orders'][number]): Order {
  return {
    id: row.id,
    orderNumber: row.orderNumber,
    code: row.code,
    customerId: row.userId,
    customerName: row.customerNameSnapshot,
    customerArea: row.customerAreaSnapshot,
    customerAddress: row.addressSnapshot,
    itemsCount: row.orderItems_on_order.reduce((sum, i) => sum + i.quantity, 0),
    items: row.orderItems_on_order.map((item) => ({
      productId: item.productId ?? item.id,
      name: item.productName,
      unitLabel: item.unitLabel,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      imageKey: item.imageUrl ?? 'prod-tomatoes',
    })),
    subtotal: row.subtotal,
    deliveryFee: row.deliveryFee,
    discount: row.discount,
    total: row.total,
    deliverySlot: row.deliverySlot as DeliveryTimeSlot,
    paymentMethod: row.paymentMethod as PaymentMethod,
    paymentStatus: row.paymentStatus as PaymentStatus,
    status: row.status as OrderStatus,
    courierName: row.courierName ?? undefined,
    courierPhone: row.courierPhone ?? undefined,
    etaMinutes: row.etaMinutes ?? undefined,
    placedAt: row.placedAt,
    deliveredAt: row.deliveredAt ?? null,
    createdAt: row.placedAt,
    statusHistory: row.orderStatusHistories_on_order.map((h) => ({
      id: h.id,
      fromStatus: h.fromStatus ?? null,
      toStatus: h.toStatus as OrderStatus,
      note: h.note ?? null,
      changedByName: h.changedBy?.fullName ?? null,
      createdAt: h.createdAt,
    })),
  };
}

export function mapCustomer(row: AdminListCustomersData['users'][number]): User {
  const orders = row.orders_on_user ?? [];
  const totalSpent = Number(
    orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0)
      .toFixed(2),
  );
  return {
    id: row.id,
    firebaseUid: row.firebaseUid,
    name: row.fullName,
    phone: row.phone ?? 'غير مسجل',
    email: sanitizePublicEmail(row.email),
    role: row.role as User['role'],
    status: row.isActive ? 'active' : 'suspended',
    isActive: row.isActive,
    avatarKey: row.avatarUrl ?? 'avatar-ahmed',
    area: row.area || 'الإسكندرية',
    ordersCount: orders.length,
    totalSpent,
    lastOrderCode: orders[0]?.code,
    createdAt: row.createdAt,
  };
}

export function mapNotifications(
  rows: AdminListStaffNotificationsData['notifications'],
): NotificationItem[] {
  return rows.map((n) => ({
    id: n.id,
    title: n.title,
    body: n.body,
    relativeTime: formatRelativeArabic(n.createdAt),
    createdAt: n.createdAt,
    isRead: n.isRead,
    type: n.type as NotificationItem['type'],
    dataPayload: n.dataPayload ?? null,
  }));
}
