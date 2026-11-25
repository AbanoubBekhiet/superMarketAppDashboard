import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface AddMyFavoriteData {
  userFavorite_upsert: UserFavorite_Key;
}

export interface AddMyFavoriteVariables {
  userId: UUIDString;
  productId: UUIDString;
}

export interface AdminGetCustomerOrdersData {
  orders: ({
    id: UUIDString;
    orderNumber: number;
    code: string;
    total: number;
    status: string;
    paymentStatus: string;
    placedAt: TimestampString;
    orderItems_on_order: ({
      id: UUIDString;
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface AdminGetCustomerOrdersVariables {
  customerId: UUIDString;
}

export interface AdminListAllCategoriesData {
  categories: ({
    id: UUIDString;
    parentId?: UUIDString | null;
    name: string;
    slug: string;
    imageUrl?: string | null;
    sortOrder: number;
    isActive: boolean;
    products_on_category: ({
      id: UUIDString;
    } & Product_Key)[];
  } & Category_Key)[];
}

export interface AdminListAllProductsData {
  products: ({
    id: UUIDString;
    categoryId: UUIDString;
    category: {
      id: UUIDString;
      name: string;
      parentId?: UUIDString | null;
    } & Category_Key;
      name: string;
      description: string;
      brand: string;
      price: number;
      salePrice?: number | null;
      purchasePrice?: number | null;
      sku: string;
      barcode?: string | null;
      unit: string;
      stockQuantity: number;
      lowStockThreshold: number;
      badgeText?: string | null;
      isActive: boolean;
      isFeatured: boolean;
      isDailyOffer: boolean;
      productImages_on_product: ({
        id: UUIDString;
        imageUrl: string;
        sortOrder: number;
        isPrimary: boolean;
      } & ProductImage_Key)[];
        productWeights_on_product: ({
          id: UUIDString;
          label: string;
          price: number;
          salePrice?: number | null;
          sortOrder: number;
          isDefault: boolean;
        } & ProductWeight_Key)[];
  } & Product_Key)[];
}

export interface AdminListAllProductsVariables {
  categoryId?: UUIDString | null;
}

export interface AdminListBannersData {
  banners: ({
    id: UUIDString;
    tag: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    imageUrl?: string | null;
    categoryId?: UUIDString | null;
    productId?: UUIDString | null;
    sortOrder: number;
    isActive: boolean;
  } & Banner_Key)[];
}

export interface AdminListCouponsData {
  coupons: ({
    id: UUIDString;
    code: string;
    type: string;
    value: number;
    minOrder: number;
    maxDiscount?: number | null;
    usageLimit?: number | null;
    usedCount: number;
    expiresAt?: TimestampString | null;
    isActive: boolean;
    createdAt: TimestampString;
  } & Coupon_Key)[];
}

export interface AdminListCustomersData {
  users: ({
    id: UUIDString;
    firebaseUid: string;
    fullName: string;
    phone?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
    role: string;
    isActive: boolean;
    area: string;
    lastLoginAt?: TimestampString | null;
    createdAt: TimestampString;
    orders_on_user: ({
      id: UUIDString;
      code: string;
      total: number;
      status: string;
      placedAt: TimestampString;
    } & Order_Key)[];
  } & User_Key)[];
}

export interface AdminListOrdersData {
  orders: ({
    id: UUIDString;
    orderNumber: number;
    code: string;
    userId: UUIDString;
    assignedToId?: UUIDString | null;
    addressSnapshot: string;
    customerNameSnapshot: string;
    customerAreaSnapshot: string;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    deliverySlot: string;
    notes?: string | null;
    courierName?: string | null;
    courierPhone?: string | null;
    etaMinutes?: number | null;
    placedAt: TimestampString;
    deliveredAt?: TimestampString | null;
    orderItems_on_order: ({
      id: UUIDString;
      productId?: UUIDString | null;
      productName: string;
      unitLabel: string;
      imageUrl?: string | null;
      unitPrice: number;
      quantity: number;
      lineTotal: number;
    } & OrderItem_Key)[];
      orderStatusHistories_on_order: ({
        id: UUIDString;
        fromStatus?: string | null;
        toStatus: string;
        note?: string | null;
        createdAt: TimestampString;
        changedBy?: {
          id: UUIDString;
          fullName: string;
          role: string;
        } & User_Key;
      } & OrderStatusHistory_Key)[];
  } & Order_Key)[];
}

export interface AdminListOrdersVariables {
  status?: string | null;
  paymentStatus?: string | null;
}

export interface AdminListStaffNotificationsData {
  notifications: ({
    id: UUIDString;
    title: string;
    body: string;
    type: string;
    dataPayload?: string | null;
    isRead: boolean;
    readAt?: TimestampString | null;
    createdAt: TimestampString;
  } & Notification_Key)[];
}

export interface AdminOnlyListAuditLogsData {
  auditLogs: ({
    id: UUIDString;
    actorId: UUIDString;
    actorRole: string;
    action: string;
    entity: string;
    entityId: string;
    beforeJson?: string | null;
    afterJson?: string | null;
    createdAt: TimestampString;
    actor: {
      id: UUIDString;
      fullName: string;
      email?: string | null;
    } & User_Key;
  } & AuditLog_Key)[];
}

export interface AdminOnlyListSubAdminsData {
  users: ({
    id: UUIDString;
    firebaseUid: string;
    fullName: string;
    phone?: string | null;
    email?: string | null;
    role: string;
    isActive: boolean;
    area: string;
    lastLoginAt?: TimestampString | null;
    createdAt: TimestampString;
    adminProfile_on_user?: {
      id: UUIDString;
      department: string;
      permissionsNotes?: string | null;
      createdBy?: {
        id: UUIDString;
        fullName: string;
      } & User_Key;
    } & AdminProfile_Key;
  } & User_Key)[];
}

export interface AdminProfile_Key {
  id: UUIDString;
  __typename?: 'AdminProfile_Key';
}

export interface AppSetting_Key {
  key: string;
  __typename?: 'AppSetting_Key';
}

export interface AuditLog_Key {
  id: UUIDString;
  __typename?: 'AuditLog_Key';
}

export interface Banner_Key {
  id: UUIDString;
  __typename?: 'Banner_Key';
}

export interface CartItem_Key {
  id: UUIDString;
  __typename?: 'CartItem_Key';
}

export interface Cart_Key {
  id: UUIDString;
  __typename?: 'Cart_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface ClearMyCartData {
  cartItem_deleteMany: number;
  cart_update?: Cart_Key | null;
}

export interface ClearOtherDefaultAddressesData {
  userAddress_updateMany: number;
}

export interface ClearOtherDefaultAddressesVariables {
  keepId: UUIDString;
}

export interface Coupon_Key {
  id: UUIDString;
  __typename?: 'Coupon_Key';
}

export interface CreateMyAddressData {
  userAddress_insert: UserAddress_Key;
}

export interface CreateMyAddressVariables {
  userId: UUIDString;
  label: string;
  governorate: string;
  city: string;
  area: string;
  street: string;
  building?: string | null;
  floor?: string | null;
  apartment?: string | null;
  landmark?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
  deliveryNotes?: string | null;
}

export interface CreateMyCartData {
  cart_insert: Cart_Key;
}

export interface CreateMyCartVariables {
  userId: UUIDString;
}

export interface CreateMyVehicleData {
  userVehicle_insert: UserVehicle_Key;
}

export interface CreateMyVehicleVariables {
  userId: UUIDString;
  make: string;
  model: string;
  year?: number | null;
  color: string;
  plateNumber: string;
  isDefault: boolean;
}

export interface DeactivateMyDeviceTokenData {
  userDevice_update?: UserDevice_Key | null;
}

export interface DeactivateMyDeviceTokenVariables {
  fcmToken: string;
}

export interface GetMyCartData {
  carts: ({
    id: UUIDString;
    deliverySlot: string;
    paymentMethod: string;
    notes?: string | null;
    coupon?: {
      id: UUIDString;
      code: string;
      type: string;
      value: number;
      minOrder: number;
      maxDiscount?: number | null;
      isActive: boolean;
    } & Coupon_Key;
      cartItems_on_cart: ({
        id: UUIDString;
        quantity: number;
        product: {
          id: UUIDString;
          name: string;
          price: number;
          salePrice?: number | null;
          unit: string;
          stockQuantity: number;
          isActive: boolean;
          productImages_on_product: ({
            imageUrl: string;
          })[];
        } & Product_Key;
          weightOption?: {
            id: UUIDString;
            label: string;
            price: number;
            salePrice?: number | null;
          } & ProductWeight_Key;
      } & CartItem_Key)[];
  } & Cart_Key)[];
}

export interface GetMyOrderByIdData {
  orders: ({
    id: UUIDString;
    orderNumber: number;
    code: string;
    addressSnapshot: string;
    customerNameSnapshot: string;
    customerAreaSnapshot: string;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    deliverySlot: string;
    notes?: string | null;
    courierName?: string | null;
    courierPhone?: string | null;
    etaMinutes?: number | null;
    placedAt: TimestampString;
    deliveredAt?: TimestampString | null;
    orderItems_on_order: ({
      id: UUIDString;
      productId?: UUIDString | null;
      productName: string;
      unitLabel: string;
      imageUrl?: string | null;
      unitPrice: number;
      quantity: number;
      lineTotal: number;
    } & OrderItem_Key)[];
      orderStatusHistories_on_order: ({
        id: UUIDString;
        fromStatus?: string | null;
        toStatus: string;
        note?: string | null;
        createdAt: TimestampString;
      } & OrderStatusHistory_Key)[];
  } & Order_Key)[];
}

export interface GetMyOrderByIdVariables {
  id: UUIDString;
}

export interface GetMyProfileData {
  users: ({
    id: UUIDString;
    firebaseUid: string;
    fullName: string;
    phone?: string | null;
    email?: string | null;
    avatarUrl?: string | null;
    role: string;
    isActive: boolean;
    area: string;
    lastLoginAt?: TimestampString | null;
    createdAt: TimestampString;
    adminProfile_on_user?: {
      id: UUIDString;
      department: string;
      permissionsNotes?: string | null;
    } & AdminProfile_Key;
  } & User_Key)[];
}

export interface GetProductByIdData {
  product?: {
    id: UUIDString;
    categoryId: UUIDString;
    category: {
      id: UUIDString;
      name: string;
      parentId?: UUIDString | null;
    } & Category_Key;
      name: string;
      description: string;
      brand: string;
      price: number;
      salePrice?: number | null;
      sku: string;
      barcode?: string | null;
      unit: string;
      stockQuantity: number;
      lowStockThreshold: number;
      badgeText?: string | null;
      isActive: boolean;
      isFeatured: boolean;
      isDailyOffer: boolean;
      deletedAt?: TimestampString | null;
      productImages_on_product: ({
        id: UUIDString;
        imageUrl: string;
        sortOrder: number;
        isPrimary: boolean;
      } & ProductImage_Key)[];
        productWeights_on_product: ({
          id: UUIDString;
          label: string;
          price: number;
          salePrice?: number | null;
          sortOrder: number;
          isDefault: boolean;
        } & ProductWeight_Key)[];
  } & Product_Key;
}

export interface GetProductByIdVariables {
  id: UUIDString;
}

export interface InsertMyCartItemData {
  cartItem_insert: CartItem_Key;
}

export interface InsertMyCartItemVariables {
  cartId: UUIDString;
  productId: UUIDString;
  weightOptionId?: UUIDString | null;
  quantity: number;
}

export interface ListActiveBannersData {
  banners: ({
    id: UUIDString;
    tag: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    imageUrl?: string | null;
    categoryId?: UUIDString | null;
    productId?: UUIDString | null;
    sortOrder: number;
    isActive: boolean;
  } & Banner_Key)[];
}

export interface ListActiveCategoriesData {
  categories: ({
    id: UUIDString;
    parentId?: UUIDString | null;
    name: string;
    slug: string;
    imageUrl?: string | null;
    sortOrder: number;
    isActive: boolean;
  } & Category_Key)[];
}

export interface ListActiveProductsData {
  products: ({
    id: UUIDString;
    categoryId: UUIDString;
    category: {
      id: UUIDString;
      name: string;
      parentId?: UUIDString | null;
    } & Category_Key;
      name: string;
      description: string;
      brand: string;
      price: number;
      salePrice?: number | null;
      sku: string;
      barcode?: string | null;
      unit: string;
      stockQuantity: number;
      lowStockThreshold: number;
      badgeText?: string | null;
      isActive: boolean;
      isFeatured: boolean;
      isDailyOffer: boolean;
      productImages_on_product: ({
        id: UUIDString;
        imageUrl: string;
        sortOrder: number;
        isPrimary: boolean;
      } & ProductImage_Key)[];
        productWeights_on_product: ({
          id: UUIDString;
          label: string;
          price: number;
          salePrice?: number | null;
          sortOrder: number;
          isDefault: boolean;
        } & ProductWeight_Key)[];
  } & Product_Key)[];
}

export interface ListActiveProductsVariables {
  categoryId?: UUIDString | null;
}

export interface ListAppSettingsData {
  appSettings: ({
    key: string;
    value: string;
    description?: string | null;
  } & AppSetting_Key)[];
}

export interface ListMyAddressesData {
  userAddresses: ({
    id: UUIDString;
    userId: UUIDString;
    label: string;
    governorate: string;
    city: string;
    area: string;
    street: string;
    building?: string | null;
    floor?: string | null;
    apartment?: string | null;
    landmark?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    isDefault: boolean;
    deliveryNotes?: string | null;
  } & UserAddress_Key)[];
}

export interface ListMyFavoritesData {
  userFavorites: ({
    productId: UUIDString;
    product: {
      id: UUIDString;
      name: string;
      price: number;
      salePrice?: number | null;
      unit: string;
      stockQuantity: number;
      productImages_on_product: ({
        imageUrl: string;
      })[];
    } & Product_Key;
  })[];
}

export interface ListMyNotificationsData {
  notifications: ({
    id: UUIDString;
    title: string;
    body: string;
    type: string;
    dataPayload?: string | null;
    isRead: boolean;
    readAt?: TimestampString | null;
    createdAt: TimestampString;
    userId?: UUIDString | null;
  } & Notification_Key)[];
}

export interface ListMyOrdersData {
  orders: ({
    id: UUIDString;
    orderNumber: number;
    code: string;
    addressSnapshot: string;
    customerNameSnapshot: string;
    customerAreaSnapshot: string;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    deliverySlot: string;
    notes?: string | null;
    courierName?: string | null;
    courierPhone?: string | null;
    etaMinutes?: number | null;
    placedAt: TimestampString;
    deliveredAt?: TimestampString | null;
    orderItems_on_order: ({
      id: UUIDString;
      productId?: UUIDString | null;
      productName: string;
      unitLabel: string;
      imageUrl?: string | null;
      unitPrice: number;
      quantity: number;
      lineTotal: number;
    } & OrderItem_Key)[];
      orderStatusHistories_on_order: ({
        id: UUIDString;
        fromStatus?: string | null;
        toStatus: string;
        note?: string | null;
        createdAt: TimestampString;
      } & OrderStatusHistory_Key)[];
  } & Order_Key)[];
}

export interface ListMyOrdersVariables {
  status?: string | null;
}

export interface ListMyVehiclesData {
  userVehicles: ({
    id: UUIDString;
    make: string;
    model: string;
    year?: number | null;
    color: string;
    plateNumber: string;
    isDefault: boolean;
  } & UserVehicle_Key)[];
}

export interface MarkAllMyNotificationsReadData {
  notification_updateMany: number;
}

export interface MarkMyNotificationReadData {
  notification_update?: Notification_Key | null;
}

export interface MarkMyNotificationReadVariables {
  id: UUIDString;
}

export interface Notification_Key {
  id: UUIDString;
  __typename?: 'Notification_Key';
}

export interface OrderItem_Key {
  id: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface OrderStatusHistory_Key {
  id: UUIDString;
  __typename?: 'OrderStatusHistory_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface ProductImage_Key {
  id: UUIDString;
  __typename?: 'ProductImage_Key';
}

export interface ProductWeight_Key {
  id: UUIDString;
  __typename?: 'ProductWeight_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface RefreshMyDeviceTokenData {
  userDevice_update?: UserDevice_Key | null;
}

export interface RefreshMyDeviceTokenVariables {
  fcmToken: string;
  deviceName?: string | null;
}

export interface RegisterMyDeviceTokenData {
  userDevice_insert: UserDevice_Key;
}

export interface RegisterMyDeviceTokenVariables {
  userId: UUIDString;
  fcmToken: string;
  platform: string;
  deviceName?: string | null;
}

export interface RemoveMyCartItemData {
  cartItem_delete?: CartItem_Key | null;
}

export interface RemoveMyCartItemVariables {
  itemId: UUIDString;
}

export interface RemoveMyFavoriteData {
  userFavorite_deleteMany: number;
}

export interface RemoveMyFavoriteVariables {
  productId: UUIDString;
}

export interface SetDefaultMyAddressData {
  userAddress_updateMany: number;
  userAddress_update?: UserAddress_Key | null;
}

export interface SetDefaultMyAddressVariables {
  id: UUIDString;
}

export interface SetDefaultMyVehicleData {
  userVehicle_updateMany: number;
  userVehicle_update?: UserVehicle_Key | null;
}

export interface SetDefaultMyVehicleVariables {
  id: UUIDString;
}

export interface SoftDeleteMyAddressData {
  userAddress_update?: UserAddress_Key | null;
}

export interface SoftDeleteMyAddressVariables {
  id: UUIDString;
}

export interface SoftDeleteMyVehicleData {
  userVehicle_update?: UserVehicle_Key | null;
}

export interface SoftDeleteMyVehicleVariables {
  id: UUIDString;
}

export interface UpdateMyCartItemQtyData {
  cartItem_update?: CartItem_Key | null;
}

export interface UpdateMyCartItemQtyVariables {
  itemId: UUIDString;
  quantity: number;
}

export interface UpdateMyCartPreferencesData {
  cart_update?: Cart_Key | null;
}

export interface UpdateMyCartPreferencesVariables {
  couponId?: UUIDString | null;
  deliverySlot?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
}

export interface UpdateMyProfileData {
  user_update?: User_Key | null;
}

export interface UpdateMyProfileVariables {
  fullName: string;
  phone?: string | null;
  area?: string | null;
  avatarUrl?: string | null;
}

export interface UpdateMyVehicleData {
  userVehicle_update?: UserVehicle_Key | null;
}

export interface UpdateMyVehicleVariables {
  id: UUIDString;
  make: string;
  model: string;
  year?: number | null;
  color: string;
  plateNumber: string;
  isDefault: boolean;
}

export interface UserAddress_Key {
  id: UUIDString;
  __typename?: 'UserAddress_Key';
}

export interface UserDevice_Key {
  id: UUIDString;
  __typename?: 'UserDevice_Key';
}

export interface UserFavorite_Key {
  userId: UUIDString;
  productId: UUIDString;
  __typename?: 'UserFavorite_Key';
}

export interface UserVehicle_Key {
  id: UUIDString;
  __typename?: 'UserVehicle_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface ValidateCouponCodeData {
  coupons: ({
    id: UUIDString;
    code: string;
    type: string;
    value: number;
    minOrder: number;
    maxDiscount?: number | null;
    usageLimit?: number | null;
    usedCount: number;
    expiresAt?: TimestampString | null;
    isActive: boolean;
  } & Coupon_Key)[];
}

export interface ValidateCouponCodeVariables {
  code: string;
}

interface AdminListAllCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListAllCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListAllCategoriesData, undefined>;
  operationName: string;
}
export const adminListAllCategoriesRef: AdminListAllCategoriesRef;

export function adminListAllCategories(): QueryPromise<AdminListAllCategoriesData, undefined>;
export function adminListAllCategories(dc: DataConnect): QueryPromise<AdminListAllCategoriesData, undefined>;

interface AdminListAllProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: AdminListAllProductsVariables): QueryRef<AdminListAllProductsData, AdminListAllProductsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: AdminListAllProductsVariables): QueryRef<AdminListAllProductsData, AdminListAllProductsVariables>;
  operationName: string;
}
export const adminListAllProductsRef: AdminListAllProductsRef;

export function adminListAllProducts(vars?: AdminListAllProductsVariables): QueryPromise<AdminListAllProductsData, AdminListAllProductsVariables>;
export function adminListAllProducts(dc: DataConnect, vars?: AdminListAllProductsVariables): QueryPromise<AdminListAllProductsData, AdminListAllProductsVariables>;

interface AdminListOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: AdminListOrdersVariables): QueryRef<AdminListOrdersData, AdminListOrdersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: AdminListOrdersVariables): QueryRef<AdminListOrdersData, AdminListOrdersVariables>;
  operationName: string;
}
export const adminListOrdersRef: AdminListOrdersRef;

export function adminListOrders(vars?: AdminListOrdersVariables): QueryPromise<AdminListOrdersData, AdminListOrdersVariables>;
export function adminListOrders(dc: DataConnect, vars?: AdminListOrdersVariables): QueryPromise<AdminListOrdersData, AdminListOrdersVariables>;

interface AdminListCustomersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListCustomersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListCustomersData, undefined>;
  operationName: string;
}
export const adminListCustomersRef: AdminListCustomersRef;

export function adminListCustomers(): QueryPromise<AdminListCustomersData, undefined>;
export function adminListCustomers(dc: DataConnect): QueryPromise<AdminListCustomersData, undefined>;

interface AdminGetCustomerOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetCustomerOrdersVariables): QueryRef<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AdminGetCustomerOrdersVariables): QueryRef<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;
  operationName: string;
}
export const adminGetCustomerOrdersRef: AdminGetCustomerOrdersRef;

export function adminGetCustomerOrders(vars: AdminGetCustomerOrdersVariables): QueryPromise<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;
export function adminGetCustomerOrders(dc: DataConnect, vars: AdminGetCustomerOrdersVariables): QueryPromise<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;

interface AdminListCouponsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListCouponsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListCouponsData, undefined>;
  operationName: string;
}
export const adminListCouponsRef: AdminListCouponsRef;

export function adminListCoupons(): QueryPromise<AdminListCouponsData, undefined>;
export function adminListCoupons(dc: DataConnect): QueryPromise<AdminListCouponsData, undefined>;

interface AdminListBannersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListBannersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListBannersData, undefined>;
  operationName: string;
}
export const adminListBannersRef: AdminListBannersRef;

export function adminListBanners(): QueryPromise<AdminListBannersData, undefined>;
export function adminListBanners(dc: DataConnect): QueryPromise<AdminListBannersData, undefined>;

interface AdminListStaffNotificationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListStaffNotificationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminListStaffNotificationsData, undefined>;
  operationName: string;
}
export const adminListStaffNotificationsRef: AdminListStaffNotificationsRef;

export function adminListStaffNotifications(): QueryPromise<AdminListStaffNotificationsData, undefined>;
export function adminListStaffNotifications(dc: DataConnect): QueryPromise<AdminListStaffNotificationsData, undefined>;

interface AdminOnlyListSubAdminsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminOnlyListSubAdminsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminOnlyListSubAdminsData, undefined>;
  operationName: string;
}
export const adminOnlyListSubAdminsRef: AdminOnlyListSubAdminsRef;

export function adminOnlyListSubAdmins(): QueryPromise<AdminOnlyListSubAdminsData, undefined>;
export function adminOnlyListSubAdmins(dc: DataConnect): QueryPromise<AdminOnlyListSubAdminsData, undefined>;

interface AdminOnlyListAuditLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminOnlyListAuditLogsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AdminOnlyListAuditLogsData, undefined>;
  operationName: string;
}
export const adminOnlyListAuditLogsRef: AdminOnlyListAuditLogsRef;

export function adminOnlyListAuditLogs(): QueryPromise<AdminOnlyListAuditLogsData, undefined>;
export function adminOnlyListAuditLogs(dc: DataConnect): QueryPromise<AdminOnlyListAuditLogsData, undefined>;

interface ListActiveCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActiveCategoriesData, undefined>;
  operationName: string;
}
export const listActiveCategoriesRef: ListActiveCategoriesRef;

export function listActiveCategories(): QueryPromise<ListActiveCategoriesData, undefined>;
export function listActiveCategories(dc: DataConnect): QueryPromise<ListActiveCategoriesData, undefined>;

interface ListActiveProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListActiveProductsVariables): QueryRef<ListActiveProductsData, ListActiveProductsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListActiveProductsVariables): QueryRef<ListActiveProductsData, ListActiveProductsVariables>;
  operationName: string;
}
export const listActiveProductsRef: ListActiveProductsRef;

export function listActiveProducts(vars?: ListActiveProductsVariables): QueryPromise<ListActiveProductsData, ListActiveProductsVariables>;
export function listActiveProducts(dc: DataConnect, vars?: ListActiveProductsVariables): QueryPromise<ListActiveProductsData, ListActiveProductsVariables>;

interface GetProductByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
  operationName: string;
}
export const getProductByIdRef: GetProductByIdRef;

export function getProductById(vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;
export function getProductById(dc: DataConnect, vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;

interface ListActiveBannersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveBannersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActiveBannersData, undefined>;
  operationName: string;
}
export const listActiveBannersRef: ListActiveBannersRef;

export function listActiveBanners(): QueryPromise<ListActiveBannersData, undefined>;
export function listActiveBanners(dc: DataConnect): QueryPromise<ListActiveBannersData, undefined>;

interface ListAppSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAppSettingsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAppSettingsData, undefined>;
  operationName: string;
}
export const listAppSettingsRef: ListAppSettingsRef;

export function listAppSettings(): QueryPromise<ListAppSettingsData, undefined>;
export function listAppSettings(dc: DataConnect): QueryPromise<ListAppSettingsData, undefined>;

interface ValidateCouponCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ValidateCouponCodeVariables): QueryRef<ValidateCouponCodeData, ValidateCouponCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ValidateCouponCodeVariables): QueryRef<ValidateCouponCodeData, ValidateCouponCodeVariables>;
  operationName: string;
}
export const validateCouponCodeRef: ValidateCouponCodeRef;

export function validateCouponCode(vars: ValidateCouponCodeVariables): QueryPromise<ValidateCouponCodeData, ValidateCouponCodeVariables>;
export function validateCouponCode(dc: DataConnect, vars: ValidateCouponCodeVariables): QueryPromise<ValidateCouponCodeData, ValidateCouponCodeVariables>;

interface GetMyProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyProfileData, undefined>;
  operationName: string;
}
export const getMyProfileRef: GetMyProfileRef;

export function getMyProfile(): QueryPromise<GetMyProfileData, undefined>;
export function getMyProfile(dc: DataConnect): QueryPromise<GetMyProfileData, undefined>;

interface UpdateMyProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
  operationName: string;
}
export const updateMyProfileRef: UpdateMyProfileRef;

export function updateMyProfile(vars: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;
export function updateMyProfile(dc: DataConnect, vars: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;

interface ListMyAddressesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAddressesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyAddressesData, undefined>;
  operationName: string;
}
export const listMyAddressesRef: ListMyAddressesRef;

export function listMyAddresses(): QueryPromise<ListMyAddressesData, undefined>;
export function listMyAddresses(dc: DataConnect): QueryPromise<ListMyAddressesData, undefined>;

interface CreateMyAddressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyAddressVariables): MutationRef<CreateMyAddressData, CreateMyAddressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyAddressVariables): MutationRef<CreateMyAddressData, CreateMyAddressVariables>;
  operationName: string;
}
export const createMyAddressRef: CreateMyAddressRef;

export function createMyAddress(vars: CreateMyAddressVariables): MutationPromise<CreateMyAddressData, CreateMyAddressVariables>;
export function createMyAddress(dc: DataConnect, vars: CreateMyAddressVariables): MutationPromise<CreateMyAddressData, CreateMyAddressVariables>;

interface ClearOtherDefaultAddressesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearOtherDefaultAddressesVariables): MutationRef<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ClearOtherDefaultAddressesVariables): MutationRef<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;
  operationName: string;
}
export const clearOtherDefaultAddressesRef: ClearOtherDefaultAddressesRef;

export function clearOtherDefaultAddresses(vars: ClearOtherDefaultAddressesVariables): MutationPromise<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;
export function clearOtherDefaultAddresses(dc: DataConnect, vars: ClearOtherDefaultAddressesVariables): MutationPromise<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;

interface SetDefaultMyAddressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetDefaultMyAddressVariables): MutationRef<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetDefaultMyAddressVariables): MutationRef<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;
  operationName: string;
}
export const setDefaultMyAddressRef: SetDefaultMyAddressRef;

export function setDefaultMyAddress(vars: SetDefaultMyAddressVariables): MutationPromise<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;
export function setDefaultMyAddress(dc: DataConnect, vars: SetDefaultMyAddressVariables): MutationPromise<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;

interface SoftDeleteMyAddressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SoftDeleteMyAddressVariables): MutationRef<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SoftDeleteMyAddressVariables): MutationRef<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;
  operationName: string;
}
export const softDeleteMyAddressRef: SoftDeleteMyAddressRef;

export function softDeleteMyAddress(vars: SoftDeleteMyAddressVariables): MutationPromise<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;
export function softDeleteMyAddress(dc: DataConnect, vars: SoftDeleteMyAddressVariables): MutationPromise<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;

interface ListMyVehiclesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyVehiclesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyVehiclesData, undefined>;
  operationName: string;
}
export const listMyVehiclesRef: ListMyVehiclesRef;

export function listMyVehicles(): QueryPromise<ListMyVehiclesData, undefined>;
export function listMyVehicles(dc: DataConnect): QueryPromise<ListMyVehiclesData, undefined>;

interface CreateMyVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyVehicleVariables): MutationRef<CreateMyVehicleData, CreateMyVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyVehicleVariables): MutationRef<CreateMyVehicleData, CreateMyVehicleVariables>;
  operationName: string;
}
export const createMyVehicleRef: CreateMyVehicleRef;

export function createMyVehicle(vars: CreateMyVehicleVariables): MutationPromise<CreateMyVehicleData, CreateMyVehicleVariables>;
export function createMyVehicle(dc: DataConnect, vars: CreateMyVehicleVariables): MutationPromise<CreateMyVehicleData, CreateMyVehicleVariables>;

interface UpdateMyVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyVehicleVariables): MutationRef<UpdateMyVehicleData, UpdateMyVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyVehicleVariables): MutationRef<UpdateMyVehicleData, UpdateMyVehicleVariables>;
  operationName: string;
}
export const updateMyVehicleRef: UpdateMyVehicleRef;

export function updateMyVehicle(vars: UpdateMyVehicleVariables): MutationPromise<UpdateMyVehicleData, UpdateMyVehicleVariables>;
export function updateMyVehicle(dc: DataConnect, vars: UpdateMyVehicleVariables): MutationPromise<UpdateMyVehicleData, UpdateMyVehicleVariables>;

interface SoftDeleteMyVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SoftDeleteMyVehicleVariables): MutationRef<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SoftDeleteMyVehicleVariables): MutationRef<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;
  operationName: string;
}
export const softDeleteMyVehicleRef: SoftDeleteMyVehicleRef;

export function softDeleteMyVehicle(vars: SoftDeleteMyVehicleVariables): MutationPromise<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;
export function softDeleteMyVehicle(dc: DataConnect, vars: SoftDeleteMyVehicleVariables): MutationPromise<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;

interface SetDefaultMyVehicleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetDefaultMyVehicleVariables): MutationRef<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetDefaultMyVehicleVariables): MutationRef<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;
  operationName: string;
}
export const setDefaultMyVehicleRef: SetDefaultMyVehicleRef;

export function setDefaultMyVehicle(vars: SetDefaultMyVehicleVariables): MutationPromise<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;
export function setDefaultMyVehicle(dc: DataConnect, vars: SetDefaultMyVehicleVariables): MutationPromise<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;

interface ListMyFavoritesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyFavoritesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyFavoritesData, undefined>;
  operationName: string;
}
export const listMyFavoritesRef: ListMyFavoritesRef;

export function listMyFavorites(): QueryPromise<ListMyFavoritesData, undefined>;
export function listMyFavorites(dc: DataConnect): QueryPromise<ListMyFavoritesData, undefined>;

interface AddMyFavoriteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMyFavoriteVariables): MutationRef<AddMyFavoriteData, AddMyFavoriteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMyFavoriteVariables): MutationRef<AddMyFavoriteData, AddMyFavoriteVariables>;
  operationName: string;
}
export const addMyFavoriteRef: AddMyFavoriteRef;

export function addMyFavorite(vars: AddMyFavoriteVariables): MutationPromise<AddMyFavoriteData, AddMyFavoriteVariables>;
export function addMyFavorite(dc: DataConnect, vars: AddMyFavoriteVariables): MutationPromise<AddMyFavoriteData, AddMyFavoriteVariables>;

interface RemoveMyFavoriteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveMyFavoriteVariables): MutationRef<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveMyFavoriteVariables): MutationRef<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;
  operationName: string;
}
export const removeMyFavoriteRef: RemoveMyFavoriteRef;

export function removeMyFavorite(vars: RemoveMyFavoriteVariables): MutationPromise<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;
export function removeMyFavorite(dc: DataConnect, vars: RemoveMyFavoriteVariables): MutationPromise<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;

interface GetMyCartRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyCartData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyCartData, undefined>;
  operationName: string;
}
export const getMyCartRef: GetMyCartRef;

export function getMyCart(): QueryPromise<GetMyCartData, undefined>;
export function getMyCart(dc: DataConnect): QueryPromise<GetMyCartData, undefined>;

interface CreateMyCartRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCartVariables): MutationRef<CreateMyCartData, CreateMyCartVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMyCartVariables): MutationRef<CreateMyCartData, CreateMyCartVariables>;
  operationName: string;
}
export const createMyCartRef: CreateMyCartRef;

export function createMyCart(vars: CreateMyCartVariables): MutationPromise<CreateMyCartData, CreateMyCartVariables>;
export function createMyCart(dc: DataConnect, vars: CreateMyCartVariables): MutationPromise<CreateMyCartData, CreateMyCartVariables>;

interface UpdateMyCartPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyCartPreferencesVariables): MutationRef<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateMyCartPreferencesVariables): MutationRef<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;
  operationName: string;
}
export const updateMyCartPreferencesRef: UpdateMyCartPreferencesRef;

export function updateMyCartPreferences(vars?: UpdateMyCartPreferencesVariables): MutationPromise<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;
export function updateMyCartPreferences(dc: DataConnect, vars?: UpdateMyCartPreferencesVariables): MutationPromise<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;

interface InsertMyCartItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertMyCartItemVariables): MutationRef<InsertMyCartItemData, InsertMyCartItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertMyCartItemVariables): MutationRef<InsertMyCartItemData, InsertMyCartItemVariables>;
  operationName: string;
}
export const insertMyCartItemRef: InsertMyCartItemRef;

export function insertMyCartItem(vars: InsertMyCartItemVariables): MutationPromise<InsertMyCartItemData, InsertMyCartItemVariables>;
export function insertMyCartItem(dc: DataConnect, vars: InsertMyCartItemVariables): MutationPromise<InsertMyCartItemData, InsertMyCartItemVariables>;

interface UpdateMyCartItemQtyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCartItemQtyVariables): MutationRef<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMyCartItemQtyVariables): MutationRef<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;
  operationName: string;
}
export const updateMyCartItemQtyRef: UpdateMyCartItemQtyRef;

export function updateMyCartItemQty(vars: UpdateMyCartItemQtyVariables): MutationPromise<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;
export function updateMyCartItemQty(dc: DataConnect, vars: UpdateMyCartItemQtyVariables): MutationPromise<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;

interface RemoveMyCartItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveMyCartItemVariables): MutationRef<RemoveMyCartItemData, RemoveMyCartItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveMyCartItemVariables): MutationRef<RemoveMyCartItemData, RemoveMyCartItemVariables>;
  operationName: string;
}
export const removeMyCartItemRef: RemoveMyCartItemRef;

export function removeMyCartItem(vars: RemoveMyCartItemVariables): MutationPromise<RemoveMyCartItemData, RemoveMyCartItemVariables>;
export function removeMyCartItem(dc: DataConnect, vars: RemoveMyCartItemVariables): MutationPromise<RemoveMyCartItemData, RemoveMyCartItemVariables>;

interface ClearMyCartRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<ClearMyCartData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<ClearMyCartData, undefined>;
  operationName: string;
}
export const clearMyCartRef: ClearMyCartRef;

export function clearMyCart(): MutationPromise<ClearMyCartData, undefined>;
export function clearMyCart(dc: DataConnect): MutationPromise<ClearMyCartData, undefined>;

interface ListMyOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMyOrdersVariables): QueryRef<ListMyOrdersData, ListMyOrdersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListMyOrdersVariables): QueryRef<ListMyOrdersData, ListMyOrdersVariables>;
  operationName: string;
}
export const listMyOrdersRef: ListMyOrdersRef;

export function listMyOrders(vars?: ListMyOrdersVariables): QueryPromise<ListMyOrdersData, ListMyOrdersVariables>;
export function listMyOrders(dc: DataConnect, vars?: ListMyOrdersVariables): QueryPromise<ListMyOrdersData, ListMyOrdersVariables>;

interface GetMyOrderByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyOrderByIdVariables): QueryRef<GetMyOrderByIdData, GetMyOrderByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyOrderByIdVariables): QueryRef<GetMyOrderByIdData, GetMyOrderByIdVariables>;
  operationName: string;
}
export const getMyOrderByIdRef: GetMyOrderByIdRef;

export function getMyOrderById(vars: GetMyOrderByIdVariables): QueryPromise<GetMyOrderByIdData, GetMyOrderByIdVariables>;
export function getMyOrderById(dc: DataConnect, vars: GetMyOrderByIdVariables): QueryPromise<GetMyOrderByIdData, GetMyOrderByIdVariables>;

interface ListMyNotificationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyNotificationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyNotificationsData, undefined>;
  operationName: string;
}
export const listMyNotificationsRef: ListMyNotificationsRef;

export function listMyNotifications(): QueryPromise<ListMyNotificationsData, undefined>;
export function listMyNotifications(dc: DataConnect): QueryPromise<ListMyNotificationsData, undefined>;

interface MarkMyNotificationReadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkMyNotificationReadVariables): MutationRef<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkMyNotificationReadVariables): MutationRef<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;
  operationName: string;
}
export const markMyNotificationReadRef: MarkMyNotificationReadRef;

export function markMyNotificationRead(vars: MarkMyNotificationReadVariables): MutationPromise<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;
export function markMyNotificationRead(dc: DataConnect, vars: MarkMyNotificationReadVariables): MutationPromise<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;

interface MarkAllMyNotificationsReadRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<MarkAllMyNotificationsReadData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<MarkAllMyNotificationsReadData, undefined>;
  operationName: string;
}
export const markAllMyNotificationsReadRef: MarkAllMyNotificationsReadRef;

export function markAllMyNotificationsRead(): MutationPromise<MarkAllMyNotificationsReadData, undefined>;
export function markAllMyNotificationsRead(dc: DataConnect): MutationPromise<MarkAllMyNotificationsReadData, undefined>;

interface RegisterMyDeviceTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterMyDeviceTokenVariables): MutationRef<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RegisterMyDeviceTokenVariables): MutationRef<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;
  operationName: string;
}
export const registerMyDeviceTokenRef: RegisterMyDeviceTokenRef;

export function registerMyDeviceToken(vars: RegisterMyDeviceTokenVariables): MutationPromise<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;
export function registerMyDeviceToken(dc: DataConnect, vars: RegisterMyDeviceTokenVariables): MutationPromise<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;

interface RefreshMyDeviceTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RefreshMyDeviceTokenVariables): MutationRef<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RefreshMyDeviceTokenVariables): MutationRef<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;
  operationName: string;
}
export const refreshMyDeviceTokenRef: RefreshMyDeviceTokenRef;

export function refreshMyDeviceToken(vars: RefreshMyDeviceTokenVariables): MutationPromise<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;
export function refreshMyDeviceToken(dc: DataConnect, vars: RefreshMyDeviceTokenVariables): MutationPromise<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;

interface DeactivateMyDeviceTokenRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateMyDeviceTokenVariables): MutationRef<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateMyDeviceTokenVariables): MutationRef<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;
  operationName: string;
}
export const deactivateMyDeviceTokenRef: DeactivateMyDeviceTokenRef;

export function deactivateMyDeviceToken(vars: DeactivateMyDeviceTokenVariables): MutationPromise<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;
export function deactivateMyDeviceToken(dc: DataConnect, vars: DeactivateMyDeviceTokenVariables): MutationPromise<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;

