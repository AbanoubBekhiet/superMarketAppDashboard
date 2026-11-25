# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*AdminListAllCategories*](#adminlistallcategories)
  - [*AdminListAllProducts*](#adminlistallproducts)
  - [*AdminListOrders*](#adminlistorders)
  - [*AdminListCustomers*](#adminlistcustomers)
  - [*AdminGetCustomerOrders*](#admingetcustomerorders)
  - [*AdminListCoupons*](#adminlistcoupons)
  - [*AdminListBanners*](#adminlistbanners)
  - [*AdminListStaffNotifications*](#adminliststaffnotifications)
  - [*AdminOnlyListSubAdmins*](#adminonlylistsubadmins)
  - [*AdminOnlyListAuditLogs*](#adminonlylistauditlogs)
  - [*ListActiveCategories*](#listactivecategories)
  - [*ListActiveProducts*](#listactiveproducts)
  - [*GetProductById*](#getproductbyid)
  - [*ListActiveBanners*](#listactivebanners)
  - [*ListAppSettings*](#listappsettings)
  - [*ValidateCouponCode*](#validatecouponcode)
  - [*GetMyProfile*](#getmyprofile)
  - [*ListMyAddresses*](#listmyaddresses)
  - [*ListMyVehicles*](#listmyvehicles)
  - [*ListMyFavorites*](#listmyfavorites)
  - [*GetMyCart*](#getmycart)
  - [*ListMyOrders*](#listmyorders)
  - [*GetMyOrderById*](#getmyorderbyid)
  - [*ListMyNotifications*](#listmynotifications)
- [**Mutations**](#mutations)
  - [*UpdateMyProfile*](#updatemyprofile)
  - [*CreateMyAddress*](#createmyaddress)
  - [*ClearOtherDefaultAddresses*](#clearotherdefaultaddresses)
  - [*SetDefaultMyAddress*](#setdefaultmyaddress)
  - [*SoftDeleteMyAddress*](#softdeletemyaddress)
  - [*CreateMyVehicle*](#createmyvehicle)
  - [*UpdateMyVehicle*](#updatemyvehicle)
  - [*SoftDeleteMyVehicle*](#softdeletemyvehicle)
  - [*SetDefaultMyVehicle*](#setdefaultmyvehicle)
  - [*AddMyFavorite*](#addmyfavorite)
  - [*RemoveMyFavorite*](#removemyfavorite)
  - [*CreateMyCart*](#createmycart)
  - [*UpdateMyCartPreferences*](#updatemycartpreferences)
  - [*InsertMyCartItem*](#insertmycartitem)
  - [*UpdateMyCartItemQty*](#updatemycartitemqty)
  - [*RemoveMyCartItem*](#removemycartitem)
  - [*ClearMyCart*](#clearmycart)
  - [*MarkMyNotificationRead*](#markmynotificationread)
  - [*MarkAllMyNotificationsRead*](#markallmynotificationsread)
  - [*RegisterMyDeviceToken*](#registermydevicetoken)
  - [*RefreshMyDeviceToken*](#refreshmydevicetoken)
  - [*DeactivateMyDeviceToken*](#deactivatemydevicetoken)

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `tazaj`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `tazaj`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `tazaj` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## AdminListAllCategories
You can execute the `AdminListAllCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListAllCategories(): QueryPromise<AdminListAllCategoriesData, undefined>;

interface AdminListAllCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListAllCategoriesData, undefined>;
}
export const adminListAllCategoriesRef: AdminListAllCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListAllCategories(dc: DataConnect): QueryPromise<AdminListAllCategoriesData, undefined>;

interface AdminListAllCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<AdminListAllCategoriesData, undefined>;
}
export const adminListAllCategoriesRef: AdminListAllCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListAllCategoriesRef:
```typescript
const name = adminListAllCategoriesRef.operationName;
console.log(name);
```

### Variables
The `AdminListAllCategories` query has no variables.
### Return Type
Recall that executing the `AdminListAllCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListAllCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListAllCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListAllCategories } from '@dataconnect/generated';


// Call the `adminListAllCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListAllCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListAllCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
adminListAllCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `AdminListAllCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListAllCategoriesRef } from '@dataconnect/generated';


// Call the `adminListAllCategoriesRef()` function to get a reference to the query.
const ref = adminListAllCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListAllCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

## AdminListAllProducts
You can execute the `AdminListAllProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListAllProducts(vars?: AdminListAllProductsVariables): QueryPromise<AdminListAllProductsData, AdminListAllProductsVariables>;

interface AdminListAllProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: AdminListAllProductsVariables): QueryRef<AdminListAllProductsData, AdminListAllProductsVariables>;
}
export const adminListAllProductsRef: AdminListAllProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListAllProducts(dc: DataConnect, vars?: AdminListAllProductsVariables): QueryPromise<AdminListAllProductsData, AdminListAllProductsVariables>;

interface AdminListAllProductsRef {
  ...
  (dc: DataConnect, vars?: AdminListAllProductsVariables): QueryRef<AdminListAllProductsData, AdminListAllProductsVariables>;
}
export const adminListAllProductsRef: AdminListAllProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListAllProductsRef:
```typescript
const name = adminListAllProductsRef.operationName;
console.log(name);
```

### Variables
The `AdminListAllProducts` query has an optional argument of type `AdminListAllProductsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminListAllProductsVariables {
  categoryId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `AdminListAllProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListAllProductsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListAllProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListAllProducts, AdminListAllProductsVariables } from '@dataconnect/generated';

// The `AdminListAllProducts` query has an optional argument of type `AdminListAllProductsVariables`:
const adminListAllProductsVars: AdminListAllProductsVariables = {
  categoryId: ..., // optional
};

// Call the `adminListAllProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListAllProducts(adminListAllProductsVars);
// Variables can be defined inline as well.
const { data } = await adminListAllProducts({ categoryId: ..., });
// Since all variables are optional for this query, you can omit the `AdminListAllProductsVariables` argument.
const { data } = await adminListAllProducts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListAllProducts(dataConnect, adminListAllProductsVars);

console.log(data.products);

// Or, you can use the `Promise` API.
adminListAllProducts(adminListAllProductsVars).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `AdminListAllProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListAllProductsRef, AdminListAllProductsVariables } from '@dataconnect/generated';

// The `AdminListAllProducts` query has an optional argument of type `AdminListAllProductsVariables`:
const adminListAllProductsVars: AdminListAllProductsVariables = {
  categoryId: ..., // optional
};

// Call the `adminListAllProductsRef()` function to get a reference to the query.
const ref = adminListAllProductsRef(adminListAllProductsVars);
// Variables can be defined inline as well.
const ref = adminListAllProductsRef({ categoryId: ..., });
// Since all variables are optional for this query, you can omit the `AdminListAllProductsVariables` argument.
const ref = adminListAllProductsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListAllProductsRef(dataConnect, adminListAllProductsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## AdminListOrders
You can execute the `AdminListOrders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListOrders(vars?: AdminListOrdersVariables): QueryPromise<AdminListOrdersData, AdminListOrdersVariables>;

interface AdminListOrdersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: AdminListOrdersVariables): QueryRef<AdminListOrdersData, AdminListOrdersVariables>;
}
export const adminListOrdersRef: AdminListOrdersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListOrders(dc: DataConnect, vars?: AdminListOrdersVariables): QueryPromise<AdminListOrdersData, AdminListOrdersVariables>;

interface AdminListOrdersRef {
  ...
  (dc: DataConnect, vars?: AdminListOrdersVariables): QueryRef<AdminListOrdersData, AdminListOrdersVariables>;
}
export const adminListOrdersRef: AdminListOrdersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListOrdersRef:
```typescript
const name = adminListOrdersRef.operationName;
console.log(name);
```

### Variables
The `AdminListOrders` query has an optional argument of type `AdminListOrdersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminListOrdersVariables {
  status?: string | null;
  paymentStatus?: string | null;
}
```
### Return Type
Recall that executing the `AdminListOrders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListOrdersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListOrders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListOrders, AdminListOrdersVariables } from '@dataconnect/generated';

// The `AdminListOrders` query has an optional argument of type `AdminListOrdersVariables`:
const adminListOrdersVars: AdminListOrdersVariables = {
  status: ..., // optional
  paymentStatus: ..., // optional
};

// Call the `adminListOrders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListOrders(adminListOrdersVars);
// Variables can be defined inline as well.
const { data } = await adminListOrders({ status: ..., paymentStatus: ..., });
// Since all variables are optional for this query, you can omit the `AdminListOrdersVariables` argument.
const { data } = await adminListOrders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListOrders(dataConnect, adminListOrdersVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
adminListOrders(adminListOrdersVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `AdminListOrders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListOrdersRef, AdminListOrdersVariables } from '@dataconnect/generated';

// The `AdminListOrders` query has an optional argument of type `AdminListOrdersVariables`:
const adminListOrdersVars: AdminListOrdersVariables = {
  status: ..., // optional
  paymentStatus: ..., // optional
};

// Call the `adminListOrdersRef()` function to get a reference to the query.
const ref = adminListOrdersRef(adminListOrdersVars);
// Variables can be defined inline as well.
const ref = adminListOrdersRef({ status: ..., paymentStatus: ..., });
// Since all variables are optional for this query, you can omit the `AdminListOrdersVariables` argument.
const ref = adminListOrdersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListOrdersRef(dataConnect, adminListOrdersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## AdminListCustomers
You can execute the `AdminListCustomers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListCustomers(): QueryPromise<AdminListCustomersData, undefined>;

interface AdminListCustomersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListCustomersData, undefined>;
}
export const adminListCustomersRef: AdminListCustomersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListCustomers(dc: DataConnect): QueryPromise<AdminListCustomersData, undefined>;

interface AdminListCustomersRef {
  ...
  (dc: DataConnect): QueryRef<AdminListCustomersData, undefined>;
}
export const adminListCustomersRef: AdminListCustomersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListCustomersRef:
```typescript
const name = adminListCustomersRef.operationName;
console.log(name);
```

### Variables
The `AdminListCustomers` query has no variables.
### Return Type
Recall that executing the `AdminListCustomers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListCustomersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListCustomers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListCustomers } from '@dataconnect/generated';


// Call the `adminListCustomers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListCustomers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListCustomers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
adminListCustomers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `AdminListCustomers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListCustomersRef } from '@dataconnect/generated';


// Call the `adminListCustomersRef()` function to get a reference to the query.
const ref = adminListCustomersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListCustomersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## AdminGetCustomerOrders
You can execute the `AdminGetCustomerOrders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminGetCustomerOrders(vars: AdminGetCustomerOrdersVariables): QueryPromise<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;

interface AdminGetCustomerOrdersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AdminGetCustomerOrdersVariables): QueryRef<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;
}
export const adminGetCustomerOrdersRef: AdminGetCustomerOrdersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminGetCustomerOrders(dc: DataConnect, vars: AdminGetCustomerOrdersVariables): QueryPromise<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;

interface AdminGetCustomerOrdersRef {
  ...
  (dc: DataConnect, vars: AdminGetCustomerOrdersVariables): QueryRef<AdminGetCustomerOrdersData, AdminGetCustomerOrdersVariables>;
}
export const adminGetCustomerOrdersRef: AdminGetCustomerOrdersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminGetCustomerOrdersRef:
```typescript
const name = adminGetCustomerOrdersRef.operationName;
console.log(name);
```

### Variables
The `AdminGetCustomerOrders` query requires an argument of type `AdminGetCustomerOrdersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AdminGetCustomerOrdersVariables {
  customerId: UUIDString;
}
```
### Return Type
Recall that executing the `AdminGetCustomerOrders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminGetCustomerOrdersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminGetCustomerOrders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminGetCustomerOrders, AdminGetCustomerOrdersVariables } from '@dataconnect/generated';

// The `AdminGetCustomerOrders` query requires an argument of type `AdminGetCustomerOrdersVariables`:
const adminGetCustomerOrdersVars: AdminGetCustomerOrdersVariables = {
  customerId: ..., 
};

// Call the `adminGetCustomerOrders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminGetCustomerOrders(adminGetCustomerOrdersVars);
// Variables can be defined inline as well.
const { data } = await adminGetCustomerOrders({ customerId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminGetCustomerOrders(dataConnect, adminGetCustomerOrdersVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
adminGetCustomerOrders(adminGetCustomerOrdersVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `AdminGetCustomerOrders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminGetCustomerOrdersRef, AdminGetCustomerOrdersVariables } from '@dataconnect/generated';

// The `AdminGetCustomerOrders` query requires an argument of type `AdminGetCustomerOrdersVariables`:
const adminGetCustomerOrdersVars: AdminGetCustomerOrdersVariables = {
  customerId: ..., 
};

// Call the `adminGetCustomerOrdersRef()` function to get a reference to the query.
const ref = adminGetCustomerOrdersRef(adminGetCustomerOrdersVars);
// Variables can be defined inline as well.
const ref = adminGetCustomerOrdersRef({ customerId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminGetCustomerOrdersRef(dataConnect, adminGetCustomerOrdersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## AdminListCoupons
You can execute the `AdminListCoupons` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListCoupons(): QueryPromise<AdminListCouponsData, undefined>;

interface AdminListCouponsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListCouponsData, undefined>;
}
export const adminListCouponsRef: AdminListCouponsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListCoupons(dc: DataConnect): QueryPromise<AdminListCouponsData, undefined>;

interface AdminListCouponsRef {
  ...
  (dc: DataConnect): QueryRef<AdminListCouponsData, undefined>;
}
export const adminListCouponsRef: AdminListCouponsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListCouponsRef:
```typescript
const name = adminListCouponsRef.operationName;
console.log(name);
```

### Variables
The `AdminListCoupons` query has no variables.
### Return Type
Recall that executing the `AdminListCoupons` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListCouponsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListCoupons`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListCoupons } from '@dataconnect/generated';


// Call the `adminListCoupons()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListCoupons();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListCoupons(dataConnect);

console.log(data.coupons);

// Or, you can use the `Promise` API.
adminListCoupons().then((response) => {
  const data = response.data;
  console.log(data.coupons);
});
```

### Using `AdminListCoupons`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListCouponsRef } from '@dataconnect/generated';


// Call the `adminListCouponsRef()` function to get a reference to the query.
const ref = adminListCouponsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListCouponsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.coupons);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.coupons);
});
```

## AdminListBanners
You can execute the `AdminListBanners` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListBanners(): QueryPromise<AdminListBannersData, undefined>;

interface AdminListBannersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListBannersData, undefined>;
}
export const adminListBannersRef: AdminListBannersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListBanners(dc: DataConnect): QueryPromise<AdminListBannersData, undefined>;

interface AdminListBannersRef {
  ...
  (dc: DataConnect): QueryRef<AdminListBannersData, undefined>;
}
export const adminListBannersRef: AdminListBannersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListBannersRef:
```typescript
const name = adminListBannersRef.operationName;
console.log(name);
```

### Variables
The `AdminListBanners` query has no variables.
### Return Type
Recall that executing the `AdminListBanners` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListBannersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListBanners`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListBanners } from '@dataconnect/generated';


// Call the `adminListBanners()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListBanners();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListBanners(dataConnect);

console.log(data.banners);

// Or, you can use the `Promise` API.
adminListBanners().then((response) => {
  const data = response.data;
  console.log(data.banners);
});
```

### Using `AdminListBanners`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListBannersRef } from '@dataconnect/generated';


// Call the `adminListBannersRef()` function to get a reference to the query.
const ref = adminListBannersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListBannersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.banners);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.banners);
});
```

## AdminListStaffNotifications
You can execute the `AdminListStaffNotifications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminListStaffNotifications(): QueryPromise<AdminListStaffNotificationsData, undefined>;

interface AdminListStaffNotificationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminListStaffNotificationsData, undefined>;
}
export const adminListStaffNotificationsRef: AdminListStaffNotificationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminListStaffNotifications(dc: DataConnect): QueryPromise<AdminListStaffNotificationsData, undefined>;

interface AdminListStaffNotificationsRef {
  ...
  (dc: DataConnect): QueryRef<AdminListStaffNotificationsData, undefined>;
}
export const adminListStaffNotificationsRef: AdminListStaffNotificationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminListStaffNotificationsRef:
```typescript
const name = adminListStaffNotificationsRef.operationName;
console.log(name);
```

### Variables
The `AdminListStaffNotifications` query has no variables.
### Return Type
Recall that executing the `AdminListStaffNotifications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminListStaffNotificationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminListStaffNotifications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminListStaffNotifications } from '@dataconnect/generated';


// Call the `adminListStaffNotifications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminListStaffNotifications();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminListStaffNotifications(dataConnect);

console.log(data.notifications);

// Or, you can use the `Promise` API.
adminListStaffNotifications().then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `AdminListStaffNotifications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminListStaffNotificationsRef } from '@dataconnect/generated';


// Call the `adminListStaffNotificationsRef()` function to get a reference to the query.
const ref = adminListStaffNotificationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminListStaffNotificationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## AdminOnlyListSubAdmins
You can execute the `AdminOnlyListSubAdmins` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminOnlyListSubAdmins(): QueryPromise<AdminOnlyListSubAdminsData, undefined>;

interface AdminOnlyListSubAdminsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminOnlyListSubAdminsData, undefined>;
}
export const adminOnlyListSubAdminsRef: AdminOnlyListSubAdminsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminOnlyListSubAdmins(dc: DataConnect): QueryPromise<AdminOnlyListSubAdminsData, undefined>;

interface AdminOnlyListSubAdminsRef {
  ...
  (dc: DataConnect): QueryRef<AdminOnlyListSubAdminsData, undefined>;
}
export const adminOnlyListSubAdminsRef: AdminOnlyListSubAdminsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminOnlyListSubAdminsRef:
```typescript
const name = adminOnlyListSubAdminsRef.operationName;
console.log(name);
```

### Variables
The `AdminOnlyListSubAdmins` query has no variables.
### Return Type
Recall that executing the `AdminOnlyListSubAdmins` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminOnlyListSubAdminsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminOnlyListSubAdmins`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminOnlyListSubAdmins } from '@dataconnect/generated';


// Call the `adminOnlyListSubAdmins()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminOnlyListSubAdmins();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminOnlyListSubAdmins(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
adminOnlyListSubAdmins().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `AdminOnlyListSubAdmins`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminOnlyListSubAdminsRef } from '@dataconnect/generated';


// Call the `adminOnlyListSubAdminsRef()` function to get a reference to the query.
const ref = adminOnlyListSubAdminsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminOnlyListSubAdminsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## AdminOnlyListAuditLogs
You can execute the `AdminOnlyListAuditLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
adminOnlyListAuditLogs(): QueryPromise<AdminOnlyListAuditLogsData, undefined>;

interface AdminOnlyListAuditLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AdminOnlyListAuditLogsData, undefined>;
}
export const adminOnlyListAuditLogsRef: AdminOnlyListAuditLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
adminOnlyListAuditLogs(dc: DataConnect): QueryPromise<AdminOnlyListAuditLogsData, undefined>;

interface AdminOnlyListAuditLogsRef {
  ...
  (dc: DataConnect): QueryRef<AdminOnlyListAuditLogsData, undefined>;
}
export const adminOnlyListAuditLogsRef: AdminOnlyListAuditLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the adminOnlyListAuditLogsRef:
```typescript
const name = adminOnlyListAuditLogsRef.operationName;
console.log(name);
```

### Variables
The `AdminOnlyListAuditLogs` query has no variables.
### Return Type
Recall that executing the `AdminOnlyListAuditLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AdminOnlyListAuditLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `AdminOnlyListAuditLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, adminOnlyListAuditLogs } from '@dataconnect/generated';


// Call the `adminOnlyListAuditLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await adminOnlyListAuditLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await adminOnlyListAuditLogs(dataConnect);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
adminOnlyListAuditLogs().then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `AdminOnlyListAuditLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, adminOnlyListAuditLogsRef } from '@dataconnect/generated';


// Call the `adminOnlyListAuditLogsRef()` function to get a reference to the query.
const ref = adminOnlyListAuditLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = adminOnlyListAuditLogsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

## ListActiveCategories
You can execute the `ListActiveCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listActiveCategories(): QueryPromise<ListActiveCategoriesData, undefined>;

interface ListActiveCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveCategoriesData, undefined>;
}
export const listActiveCategoriesRef: ListActiveCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActiveCategories(dc: DataConnect): QueryPromise<ListActiveCategoriesData, undefined>;

interface ListActiveCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListActiveCategoriesData, undefined>;
}
export const listActiveCategoriesRef: ListActiveCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActiveCategoriesRef:
```typescript
const name = listActiveCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListActiveCategories` query has no variables.
### Return Type
Recall that executing the `ListActiveCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActiveCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListActiveCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActiveCategories } from '@dataconnect/generated';


// Call the `listActiveCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActiveCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActiveCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listActiveCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListActiveCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActiveCategoriesRef } from '@dataconnect/generated';


// Call the `listActiveCategoriesRef()` function to get a reference to the query.
const ref = listActiveCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActiveCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

## ListActiveProducts
You can execute the `ListActiveProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listActiveProducts(vars?: ListActiveProductsVariables): QueryPromise<ListActiveProductsData, ListActiveProductsVariables>;

interface ListActiveProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListActiveProductsVariables): QueryRef<ListActiveProductsData, ListActiveProductsVariables>;
}
export const listActiveProductsRef: ListActiveProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActiveProducts(dc: DataConnect, vars?: ListActiveProductsVariables): QueryPromise<ListActiveProductsData, ListActiveProductsVariables>;

interface ListActiveProductsRef {
  ...
  (dc: DataConnect, vars?: ListActiveProductsVariables): QueryRef<ListActiveProductsData, ListActiveProductsVariables>;
}
export const listActiveProductsRef: ListActiveProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActiveProductsRef:
```typescript
const name = listActiveProductsRef.operationName;
console.log(name);
```

### Variables
The `ListActiveProducts` query has an optional argument of type `ListActiveProductsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListActiveProductsVariables {
  categoryId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `ListActiveProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActiveProductsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListActiveProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActiveProducts, ListActiveProductsVariables } from '@dataconnect/generated';

// The `ListActiveProducts` query has an optional argument of type `ListActiveProductsVariables`:
const listActiveProductsVars: ListActiveProductsVariables = {
  categoryId: ..., // optional
};

// Call the `listActiveProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActiveProducts(listActiveProductsVars);
// Variables can be defined inline as well.
const { data } = await listActiveProducts({ categoryId: ..., });
// Since all variables are optional for this query, you can omit the `ListActiveProductsVariables` argument.
const { data } = await listActiveProducts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActiveProducts(dataConnect, listActiveProductsVars);

console.log(data.products);

// Or, you can use the `Promise` API.
listActiveProducts(listActiveProductsVars).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `ListActiveProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActiveProductsRef, ListActiveProductsVariables } from '@dataconnect/generated';

// The `ListActiveProducts` query has an optional argument of type `ListActiveProductsVariables`:
const listActiveProductsVars: ListActiveProductsVariables = {
  categoryId: ..., // optional
};

// Call the `listActiveProductsRef()` function to get a reference to the query.
const ref = listActiveProductsRef(listActiveProductsVars);
// Variables can be defined inline as well.
const ref = listActiveProductsRef({ categoryId: ..., });
// Since all variables are optional for this query, you can omit the `ListActiveProductsVariables` argument.
const ref = listActiveProductsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActiveProductsRef(dataConnect, listActiveProductsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## GetProductById
You can execute the `GetProductById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProductById(vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;

interface GetProductByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
}
export const getProductByIdRef: GetProductByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProductById(dc: DataConnect, vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;

interface GetProductByIdRef {
  ...
  (dc: DataConnect, vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
}
export const getProductByIdRef: GetProductByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductByIdRef:
```typescript
const name = getProductByIdRef.operationName;
console.log(name);
```

### Variables
The `GetProductById` query requires an argument of type `GetProductByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProductById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProductById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProductById, GetProductByIdVariables } from '@dataconnect/generated';

// The `GetProductById` query requires an argument of type `GetProductByIdVariables`:
const getProductByIdVars: GetProductByIdVariables = {
  id: ..., 
};

// Call the `getProductById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProductById(getProductByIdVars);
// Variables can be defined inline as well.
const { data } = await getProductById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProductById(dataConnect, getProductByIdVars);

console.log(data.product);

// Or, you can use the `Promise` API.
getProductById(getProductByIdVars).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

### Using `GetProductById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductByIdRef, GetProductByIdVariables } from '@dataconnect/generated';

// The `GetProductById` query requires an argument of type `GetProductByIdVariables`:
const getProductByIdVars: GetProductByIdVariables = {
  id: ..., 
};

// Call the `getProductByIdRef()` function to get a reference to the query.
const ref = getProductByIdRef(getProductByIdVars);
// Variables can be defined inline as well.
const ref = getProductByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductByIdRef(dataConnect, getProductByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.product);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

## ListActiveBanners
You can execute the `ListActiveBanners` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listActiveBanners(): QueryPromise<ListActiveBannersData, undefined>;

interface ListActiveBannersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveBannersData, undefined>;
}
export const listActiveBannersRef: ListActiveBannersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActiveBanners(dc: DataConnect): QueryPromise<ListActiveBannersData, undefined>;

interface ListActiveBannersRef {
  ...
  (dc: DataConnect): QueryRef<ListActiveBannersData, undefined>;
}
export const listActiveBannersRef: ListActiveBannersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActiveBannersRef:
```typescript
const name = listActiveBannersRef.operationName;
console.log(name);
```

### Variables
The `ListActiveBanners` query has no variables.
### Return Type
Recall that executing the `ListActiveBanners` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActiveBannersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListActiveBanners`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActiveBanners } from '@dataconnect/generated';


// Call the `listActiveBanners()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActiveBanners();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActiveBanners(dataConnect);

console.log(data.banners);

// Or, you can use the `Promise` API.
listActiveBanners().then((response) => {
  const data = response.data;
  console.log(data.banners);
});
```

### Using `ListActiveBanners`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActiveBannersRef } from '@dataconnect/generated';


// Call the `listActiveBannersRef()` function to get a reference to the query.
const ref = listActiveBannersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActiveBannersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.banners);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.banners);
});
```

## ListAppSettings
You can execute the `ListAppSettings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAppSettings(): QueryPromise<ListAppSettingsData, undefined>;

interface ListAppSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAppSettingsData, undefined>;
}
export const listAppSettingsRef: ListAppSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAppSettings(dc: DataConnect): QueryPromise<ListAppSettingsData, undefined>;

interface ListAppSettingsRef {
  ...
  (dc: DataConnect): QueryRef<ListAppSettingsData, undefined>;
}
export const listAppSettingsRef: ListAppSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAppSettingsRef:
```typescript
const name = listAppSettingsRef.operationName;
console.log(name);
```

### Variables
The `ListAppSettings` query has no variables.
### Return Type
Recall that executing the `ListAppSettings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAppSettingsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAppSettingsData {
  appSettings: ({
    key: string;
    value: string;
    description?: string | null;
  } & AppSetting_Key)[];
}
```
### Using `ListAppSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAppSettings } from '@dataconnect/generated';


// Call the `listAppSettings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAppSettings();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAppSettings(dataConnect);

console.log(data.appSettings);

// Or, you can use the `Promise` API.
listAppSettings().then((response) => {
  const data = response.data;
  console.log(data.appSettings);
});
```

### Using `ListAppSettings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAppSettingsRef } from '@dataconnect/generated';


// Call the `listAppSettingsRef()` function to get a reference to the query.
const ref = listAppSettingsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAppSettingsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.appSettings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.appSettings);
});
```

## ValidateCouponCode
You can execute the `ValidateCouponCode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
validateCouponCode(vars: ValidateCouponCodeVariables): QueryPromise<ValidateCouponCodeData, ValidateCouponCodeVariables>;

interface ValidateCouponCodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ValidateCouponCodeVariables): QueryRef<ValidateCouponCodeData, ValidateCouponCodeVariables>;
}
export const validateCouponCodeRef: ValidateCouponCodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
validateCouponCode(dc: DataConnect, vars: ValidateCouponCodeVariables): QueryPromise<ValidateCouponCodeData, ValidateCouponCodeVariables>;

interface ValidateCouponCodeRef {
  ...
  (dc: DataConnect, vars: ValidateCouponCodeVariables): QueryRef<ValidateCouponCodeData, ValidateCouponCodeVariables>;
}
export const validateCouponCodeRef: ValidateCouponCodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the validateCouponCodeRef:
```typescript
const name = validateCouponCodeRef.operationName;
console.log(name);
```

### Variables
The `ValidateCouponCode` query requires an argument of type `ValidateCouponCodeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ValidateCouponCodeVariables {
  code: string;
}
```
### Return Type
Recall that executing the `ValidateCouponCode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ValidateCouponCodeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ValidateCouponCode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, validateCouponCode, ValidateCouponCodeVariables } from '@dataconnect/generated';

// The `ValidateCouponCode` query requires an argument of type `ValidateCouponCodeVariables`:
const validateCouponCodeVars: ValidateCouponCodeVariables = {
  code: ..., 
};

// Call the `validateCouponCode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await validateCouponCode(validateCouponCodeVars);
// Variables can be defined inline as well.
const { data } = await validateCouponCode({ code: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await validateCouponCode(dataConnect, validateCouponCodeVars);

console.log(data.coupons);

// Or, you can use the `Promise` API.
validateCouponCode(validateCouponCodeVars).then((response) => {
  const data = response.data;
  console.log(data.coupons);
});
```

### Using `ValidateCouponCode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, validateCouponCodeRef, ValidateCouponCodeVariables } from '@dataconnect/generated';

// The `ValidateCouponCode` query requires an argument of type `ValidateCouponCodeVariables`:
const validateCouponCodeVars: ValidateCouponCodeVariables = {
  code: ..., 
};

// Call the `validateCouponCodeRef()` function to get a reference to the query.
const ref = validateCouponCodeRef(validateCouponCodeVars);
// Variables can be defined inline as well.
const ref = validateCouponCodeRef({ code: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = validateCouponCodeRef(dataConnect, validateCouponCodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.coupons);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.coupons);
});
```

## GetMyProfile
You can execute the `GetMyProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyProfile(): QueryPromise<GetMyProfileData, undefined>;

interface GetMyProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProfileData, undefined>;
}
export const getMyProfileRef: GetMyProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyProfile(dc: DataConnect): QueryPromise<GetMyProfileData, undefined>;

interface GetMyProfileRef {
  ...
  (dc: DataConnect): QueryRef<GetMyProfileData, undefined>;
}
export const getMyProfileRef: GetMyProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyProfileRef:
```typescript
const name = getMyProfileRef.operationName;
console.log(name);
```

### Variables
The `GetMyProfile` query has no variables.
### Return Type
Recall that executing the `GetMyProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyProfile } from '@dataconnect/generated';


// Call the `getMyProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyProfile(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getMyProfile().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetMyProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyProfileRef } from '@dataconnect/generated';


// Call the `getMyProfileRef()` function to get a reference to the query.
const ref = getMyProfileRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyProfileRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListMyAddresses
You can execute the `ListMyAddresses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyAddresses(): QueryPromise<ListMyAddressesData, undefined>;

interface ListMyAddressesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAddressesData, undefined>;
}
export const listMyAddressesRef: ListMyAddressesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyAddresses(dc: DataConnect): QueryPromise<ListMyAddressesData, undefined>;

interface ListMyAddressesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyAddressesData, undefined>;
}
export const listMyAddressesRef: ListMyAddressesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyAddressesRef:
```typescript
const name = listMyAddressesRef.operationName;
console.log(name);
```

### Variables
The `ListMyAddresses` query has no variables.
### Return Type
Recall that executing the `ListMyAddresses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyAddressesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyAddresses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyAddresses } from '@dataconnect/generated';


// Call the `listMyAddresses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyAddresses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyAddresses(dataConnect);

console.log(data.userAddresses);

// Or, you can use the `Promise` API.
listMyAddresses().then((response) => {
  const data = response.data;
  console.log(data.userAddresses);
});
```

### Using `ListMyAddresses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyAddressesRef } from '@dataconnect/generated';


// Call the `listMyAddressesRef()` function to get a reference to the query.
const ref = listMyAddressesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyAddressesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userAddresses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userAddresses);
});
```

## ListMyVehicles
You can execute the `ListMyVehicles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyVehicles(): QueryPromise<ListMyVehiclesData, undefined>;

interface ListMyVehiclesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyVehiclesData, undefined>;
}
export const listMyVehiclesRef: ListMyVehiclesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyVehicles(dc: DataConnect): QueryPromise<ListMyVehiclesData, undefined>;

interface ListMyVehiclesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyVehiclesData, undefined>;
}
export const listMyVehiclesRef: ListMyVehiclesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyVehiclesRef:
```typescript
const name = listMyVehiclesRef.operationName;
console.log(name);
```

### Variables
The `ListMyVehicles` query has no variables.
### Return Type
Recall that executing the `ListMyVehicles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyVehiclesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyVehicles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyVehicles } from '@dataconnect/generated';


// Call the `listMyVehicles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyVehicles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyVehicles(dataConnect);

console.log(data.userVehicles);

// Or, you can use the `Promise` API.
listMyVehicles().then((response) => {
  const data = response.data;
  console.log(data.userVehicles);
});
```

### Using `ListMyVehicles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyVehiclesRef } from '@dataconnect/generated';


// Call the `listMyVehiclesRef()` function to get a reference to the query.
const ref = listMyVehiclesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyVehiclesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userVehicles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userVehicles);
});
```

## ListMyFavorites
You can execute the `ListMyFavorites` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyFavorites(): QueryPromise<ListMyFavoritesData, undefined>;

interface ListMyFavoritesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyFavoritesData, undefined>;
}
export const listMyFavoritesRef: ListMyFavoritesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyFavorites(dc: DataConnect): QueryPromise<ListMyFavoritesData, undefined>;

interface ListMyFavoritesRef {
  ...
  (dc: DataConnect): QueryRef<ListMyFavoritesData, undefined>;
}
export const listMyFavoritesRef: ListMyFavoritesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyFavoritesRef:
```typescript
const name = listMyFavoritesRef.operationName;
console.log(name);
```

### Variables
The `ListMyFavorites` query has no variables.
### Return Type
Recall that executing the `ListMyFavorites` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyFavoritesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyFavorites`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyFavorites } from '@dataconnect/generated';


// Call the `listMyFavorites()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyFavorites();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyFavorites(dataConnect);

console.log(data.userFavorites);

// Or, you can use the `Promise` API.
listMyFavorites().then((response) => {
  const data = response.data;
  console.log(data.userFavorites);
});
```

### Using `ListMyFavorites`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyFavoritesRef } from '@dataconnect/generated';


// Call the `listMyFavoritesRef()` function to get a reference to the query.
const ref = listMyFavoritesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyFavoritesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userFavorites);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userFavorites);
});
```

## GetMyCart
You can execute the `GetMyCart` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyCart(): QueryPromise<GetMyCartData, undefined>;

interface GetMyCartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyCartData, undefined>;
}
export const getMyCartRef: GetMyCartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyCart(dc: DataConnect): QueryPromise<GetMyCartData, undefined>;

interface GetMyCartRef {
  ...
  (dc: DataConnect): QueryRef<GetMyCartData, undefined>;
}
export const getMyCartRef: GetMyCartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyCartRef:
```typescript
const name = getMyCartRef.operationName;
console.log(name);
```

### Variables
The `GetMyCart` query has no variables.
### Return Type
Recall that executing the `GetMyCart` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyCartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyCart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyCart } from '@dataconnect/generated';


// Call the `getMyCart()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyCart();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyCart(dataConnect);

console.log(data.carts);

// Or, you can use the `Promise` API.
getMyCart().then((response) => {
  const data = response.data;
  console.log(data.carts);
});
```

### Using `GetMyCart`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyCartRef } from '@dataconnect/generated';


// Call the `getMyCartRef()` function to get a reference to the query.
const ref = getMyCartRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyCartRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.carts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.carts);
});
```

## ListMyOrders
You can execute the `ListMyOrders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyOrders(vars?: ListMyOrdersVariables): QueryPromise<ListMyOrdersData, ListMyOrdersVariables>;

interface ListMyOrdersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMyOrdersVariables): QueryRef<ListMyOrdersData, ListMyOrdersVariables>;
}
export const listMyOrdersRef: ListMyOrdersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyOrders(dc: DataConnect, vars?: ListMyOrdersVariables): QueryPromise<ListMyOrdersData, ListMyOrdersVariables>;

interface ListMyOrdersRef {
  ...
  (dc: DataConnect, vars?: ListMyOrdersVariables): QueryRef<ListMyOrdersData, ListMyOrdersVariables>;
}
export const listMyOrdersRef: ListMyOrdersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyOrdersRef:
```typescript
const name = listMyOrdersRef.operationName;
console.log(name);
```

### Variables
The `ListMyOrders` query has an optional argument of type `ListMyOrdersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMyOrdersVariables {
  status?: string | null;
}
```
### Return Type
Recall that executing the `ListMyOrders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyOrdersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyOrders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyOrders, ListMyOrdersVariables } from '@dataconnect/generated';

// The `ListMyOrders` query has an optional argument of type `ListMyOrdersVariables`:
const listMyOrdersVars: ListMyOrdersVariables = {
  status: ..., // optional
};

// Call the `listMyOrders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyOrders(listMyOrdersVars);
// Variables can be defined inline as well.
const { data } = await listMyOrders({ status: ..., });
// Since all variables are optional for this query, you can omit the `ListMyOrdersVariables` argument.
const { data } = await listMyOrders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyOrders(dataConnect, listMyOrdersVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
listMyOrders(listMyOrdersVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `ListMyOrders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyOrdersRef, ListMyOrdersVariables } from '@dataconnect/generated';

// The `ListMyOrders` query has an optional argument of type `ListMyOrdersVariables`:
const listMyOrdersVars: ListMyOrdersVariables = {
  status: ..., // optional
};

// Call the `listMyOrdersRef()` function to get a reference to the query.
const ref = listMyOrdersRef(listMyOrdersVars);
// Variables can be defined inline as well.
const ref = listMyOrdersRef({ status: ..., });
// Since all variables are optional for this query, you can omit the `ListMyOrdersVariables` argument.
const ref = listMyOrdersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyOrdersRef(dataConnect, listMyOrdersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## GetMyOrderById
You can execute the `GetMyOrderById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyOrderById(vars: GetMyOrderByIdVariables): QueryPromise<GetMyOrderByIdData, GetMyOrderByIdVariables>;

interface GetMyOrderByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyOrderByIdVariables): QueryRef<GetMyOrderByIdData, GetMyOrderByIdVariables>;
}
export const getMyOrderByIdRef: GetMyOrderByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyOrderById(dc: DataConnect, vars: GetMyOrderByIdVariables): QueryPromise<GetMyOrderByIdData, GetMyOrderByIdVariables>;

interface GetMyOrderByIdRef {
  ...
  (dc: DataConnect, vars: GetMyOrderByIdVariables): QueryRef<GetMyOrderByIdData, GetMyOrderByIdVariables>;
}
export const getMyOrderByIdRef: GetMyOrderByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyOrderByIdRef:
```typescript
const name = getMyOrderByIdRef.operationName;
console.log(name);
```

### Variables
The `GetMyOrderById` query requires an argument of type `GetMyOrderByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyOrderByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyOrderById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyOrderByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyOrderById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyOrderById, GetMyOrderByIdVariables } from '@dataconnect/generated';

// The `GetMyOrderById` query requires an argument of type `GetMyOrderByIdVariables`:
const getMyOrderByIdVars: GetMyOrderByIdVariables = {
  id: ..., 
};

// Call the `getMyOrderById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyOrderById(getMyOrderByIdVars);
// Variables can be defined inline as well.
const { data } = await getMyOrderById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyOrderById(dataConnect, getMyOrderByIdVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
getMyOrderById(getMyOrderByIdVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `GetMyOrderById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyOrderByIdRef, GetMyOrderByIdVariables } from '@dataconnect/generated';

// The `GetMyOrderById` query requires an argument of type `GetMyOrderByIdVariables`:
const getMyOrderByIdVars: GetMyOrderByIdVariables = {
  id: ..., 
};

// Call the `getMyOrderByIdRef()` function to get a reference to the query.
const ref = getMyOrderByIdRef(getMyOrderByIdVars);
// Variables can be defined inline as well.
const ref = getMyOrderByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyOrderByIdRef(dataConnect, getMyOrderByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## ListMyNotifications
You can execute the `ListMyNotifications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyNotifications(): QueryPromise<ListMyNotificationsData, undefined>;

interface ListMyNotificationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyNotificationsData, undefined>;
}
export const listMyNotificationsRef: ListMyNotificationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyNotifications(dc: DataConnect): QueryPromise<ListMyNotificationsData, undefined>;

interface ListMyNotificationsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyNotificationsData, undefined>;
}
export const listMyNotificationsRef: ListMyNotificationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyNotificationsRef:
```typescript
const name = listMyNotificationsRef.operationName;
console.log(name);
```

### Variables
The `ListMyNotifications` query has no variables.
### Return Type
Recall that executing the `ListMyNotifications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyNotificationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMyNotifications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyNotifications } from '@dataconnect/generated';


// Call the `listMyNotifications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyNotifications();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyNotifications(dataConnect);

console.log(data.notifications);

// Or, you can use the `Promise` API.
listMyNotifications().then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `ListMyNotifications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyNotificationsRef } from '@dataconnect/generated';


// Call the `listMyNotificationsRef()` function to get a reference to the query.
const ref = listMyNotificationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyNotificationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `tazaj` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpdateMyProfile
You can execute the `UpdateMyProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyProfile(vars: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;

interface UpdateMyProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
}
export const updateMyProfileRef: UpdateMyProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyProfile(dc: DataConnect, vars: UpdateMyProfileVariables): MutationPromise<UpdateMyProfileData, UpdateMyProfileVariables>;

interface UpdateMyProfileRef {
  ...
  (dc: DataConnect, vars: UpdateMyProfileVariables): MutationRef<UpdateMyProfileData, UpdateMyProfileVariables>;
}
export const updateMyProfileRef: UpdateMyProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyProfileRef:
```typescript
const name = updateMyProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyProfile` mutation requires an argument of type `UpdateMyProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyProfileVariables {
  fullName: string;
  phone?: string | null;
  area?: string | null;
  avatarUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyProfileData {
  user_update?: User_Key | null;
}
```
### Using `UpdateMyProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyProfile, UpdateMyProfileVariables } from '@dataconnect/generated';

// The `UpdateMyProfile` mutation requires an argument of type `UpdateMyProfileVariables`:
const updateMyProfileVars: UpdateMyProfileVariables = {
  fullName: ..., 
  phone: ..., // optional
  area: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `updateMyProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyProfile(updateMyProfileVars);
// Variables can be defined inline as well.
const { data } = await updateMyProfile({ fullName: ..., phone: ..., area: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyProfile(dataConnect, updateMyProfileVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateMyProfile(updateMyProfileVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateMyProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyProfileRef, UpdateMyProfileVariables } from '@dataconnect/generated';

// The `UpdateMyProfile` mutation requires an argument of type `UpdateMyProfileVariables`:
const updateMyProfileVars: UpdateMyProfileVariables = {
  fullName: ..., 
  phone: ..., // optional
  area: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `updateMyProfileRef()` function to get a reference to the mutation.
const ref = updateMyProfileRef(updateMyProfileVars);
// Variables can be defined inline as well.
const ref = updateMyProfileRef({ fullName: ..., phone: ..., area: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyProfileRef(dataConnect, updateMyProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## CreateMyAddress
You can execute the `CreateMyAddress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMyAddress(vars: CreateMyAddressVariables): MutationPromise<CreateMyAddressData, CreateMyAddressVariables>;

interface CreateMyAddressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyAddressVariables): MutationRef<CreateMyAddressData, CreateMyAddressVariables>;
}
export const createMyAddressRef: CreateMyAddressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyAddress(dc: DataConnect, vars: CreateMyAddressVariables): MutationPromise<CreateMyAddressData, CreateMyAddressVariables>;

interface CreateMyAddressRef {
  ...
  (dc: DataConnect, vars: CreateMyAddressVariables): MutationRef<CreateMyAddressData, CreateMyAddressVariables>;
}
export const createMyAddressRef: CreateMyAddressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyAddressRef:
```typescript
const name = createMyAddressRef.operationName;
console.log(name);
```

### Variables
The `CreateMyAddress` mutation requires an argument of type `CreateMyAddressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateMyAddress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyAddressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyAddressData {
  userAddress_insert: UserAddress_Key;
}
```
### Using `CreateMyAddress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyAddress, CreateMyAddressVariables } from '@dataconnect/generated';

// The `CreateMyAddress` mutation requires an argument of type `CreateMyAddressVariables`:
const createMyAddressVars: CreateMyAddressVariables = {
  userId: ..., 
  label: ..., 
  governorate: ..., 
  city: ..., 
  area: ..., 
  street: ..., 
  building: ..., // optional
  floor: ..., // optional
  apartment: ..., // optional
  landmark: ..., // optional
  latitude: ..., // optional
  longitude: ..., // optional
  isDefault: ..., 
  deliveryNotes: ..., // optional
};

// Call the `createMyAddress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyAddress(createMyAddressVars);
// Variables can be defined inline as well.
const { data } = await createMyAddress({ userId: ..., label: ..., governorate: ..., city: ..., area: ..., street: ..., building: ..., floor: ..., apartment: ..., landmark: ..., latitude: ..., longitude: ..., isDefault: ..., deliveryNotes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyAddress(dataConnect, createMyAddressVars);

console.log(data.userAddress_insert);

// Or, you can use the `Promise` API.
createMyAddress(createMyAddressVars).then((response) => {
  const data = response.data;
  console.log(data.userAddress_insert);
});
```

### Using `CreateMyAddress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyAddressRef, CreateMyAddressVariables } from '@dataconnect/generated';

// The `CreateMyAddress` mutation requires an argument of type `CreateMyAddressVariables`:
const createMyAddressVars: CreateMyAddressVariables = {
  userId: ..., 
  label: ..., 
  governorate: ..., 
  city: ..., 
  area: ..., 
  street: ..., 
  building: ..., // optional
  floor: ..., // optional
  apartment: ..., // optional
  landmark: ..., // optional
  latitude: ..., // optional
  longitude: ..., // optional
  isDefault: ..., 
  deliveryNotes: ..., // optional
};

// Call the `createMyAddressRef()` function to get a reference to the mutation.
const ref = createMyAddressRef(createMyAddressVars);
// Variables can be defined inline as well.
const ref = createMyAddressRef({ userId: ..., label: ..., governorate: ..., city: ..., area: ..., street: ..., building: ..., floor: ..., apartment: ..., landmark: ..., latitude: ..., longitude: ..., isDefault: ..., deliveryNotes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyAddressRef(dataConnect, createMyAddressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userAddress_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userAddress_insert);
});
```

## ClearOtherDefaultAddresses
You can execute the `ClearOtherDefaultAddresses` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
clearOtherDefaultAddresses(vars: ClearOtherDefaultAddressesVariables): MutationPromise<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;

interface ClearOtherDefaultAddressesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ClearOtherDefaultAddressesVariables): MutationRef<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;
}
export const clearOtherDefaultAddressesRef: ClearOtherDefaultAddressesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearOtherDefaultAddresses(dc: DataConnect, vars: ClearOtherDefaultAddressesVariables): MutationPromise<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;

interface ClearOtherDefaultAddressesRef {
  ...
  (dc: DataConnect, vars: ClearOtherDefaultAddressesVariables): MutationRef<ClearOtherDefaultAddressesData, ClearOtherDefaultAddressesVariables>;
}
export const clearOtherDefaultAddressesRef: ClearOtherDefaultAddressesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearOtherDefaultAddressesRef:
```typescript
const name = clearOtherDefaultAddressesRef.operationName;
console.log(name);
```

### Variables
The `ClearOtherDefaultAddresses` mutation requires an argument of type `ClearOtherDefaultAddressesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ClearOtherDefaultAddressesVariables {
  keepId: UUIDString;
}
```
### Return Type
Recall that executing the `ClearOtherDefaultAddresses` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearOtherDefaultAddressesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearOtherDefaultAddressesData {
  userAddress_updateMany: number;
}
```
### Using `ClearOtherDefaultAddresses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearOtherDefaultAddresses, ClearOtherDefaultAddressesVariables } from '@dataconnect/generated';

// The `ClearOtherDefaultAddresses` mutation requires an argument of type `ClearOtherDefaultAddressesVariables`:
const clearOtherDefaultAddressesVars: ClearOtherDefaultAddressesVariables = {
  keepId: ..., 
};

// Call the `clearOtherDefaultAddresses()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearOtherDefaultAddresses(clearOtherDefaultAddressesVars);
// Variables can be defined inline as well.
const { data } = await clearOtherDefaultAddresses({ keepId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearOtherDefaultAddresses(dataConnect, clearOtherDefaultAddressesVars);

console.log(data.userAddress_updateMany);

// Or, you can use the `Promise` API.
clearOtherDefaultAddresses(clearOtherDefaultAddressesVars).then((response) => {
  const data = response.data;
  console.log(data.userAddress_updateMany);
});
```

### Using `ClearOtherDefaultAddresses`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearOtherDefaultAddressesRef, ClearOtherDefaultAddressesVariables } from '@dataconnect/generated';

// The `ClearOtherDefaultAddresses` mutation requires an argument of type `ClearOtherDefaultAddressesVariables`:
const clearOtherDefaultAddressesVars: ClearOtherDefaultAddressesVariables = {
  keepId: ..., 
};

// Call the `clearOtherDefaultAddressesRef()` function to get a reference to the mutation.
const ref = clearOtherDefaultAddressesRef(clearOtherDefaultAddressesVars);
// Variables can be defined inline as well.
const ref = clearOtherDefaultAddressesRef({ keepId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearOtherDefaultAddressesRef(dataConnect, clearOtherDefaultAddressesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userAddress_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userAddress_updateMany);
});
```

## SetDefaultMyAddress
You can execute the `SetDefaultMyAddress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setDefaultMyAddress(vars: SetDefaultMyAddressVariables): MutationPromise<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;

interface SetDefaultMyAddressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetDefaultMyAddressVariables): MutationRef<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;
}
export const setDefaultMyAddressRef: SetDefaultMyAddressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setDefaultMyAddress(dc: DataConnect, vars: SetDefaultMyAddressVariables): MutationPromise<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;

interface SetDefaultMyAddressRef {
  ...
  (dc: DataConnect, vars: SetDefaultMyAddressVariables): MutationRef<SetDefaultMyAddressData, SetDefaultMyAddressVariables>;
}
export const setDefaultMyAddressRef: SetDefaultMyAddressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setDefaultMyAddressRef:
```typescript
const name = setDefaultMyAddressRef.operationName;
console.log(name);
```

### Variables
The `SetDefaultMyAddress` mutation requires an argument of type `SetDefaultMyAddressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetDefaultMyAddressVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SetDefaultMyAddress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetDefaultMyAddressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetDefaultMyAddressData {
  userAddress_updateMany: number;
  userAddress_update?: UserAddress_Key | null;
}
```
### Using `SetDefaultMyAddress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setDefaultMyAddress, SetDefaultMyAddressVariables } from '@dataconnect/generated';

// The `SetDefaultMyAddress` mutation requires an argument of type `SetDefaultMyAddressVariables`:
const setDefaultMyAddressVars: SetDefaultMyAddressVariables = {
  id: ..., 
};

// Call the `setDefaultMyAddress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setDefaultMyAddress(setDefaultMyAddressVars);
// Variables can be defined inline as well.
const { data } = await setDefaultMyAddress({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setDefaultMyAddress(dataConnect, setDefaultMyAddressVars);

console.log(data.userAddress_updateMany);
console.log(data.userAddress_update);

// Or, you can use the `Promise` API.
setDefaultMyAddress(setDefaultMyAddressVars).then((response) => {
  const data = response.data;
  console.log(data.userAddress_updateMany);
  console.log(data.userAddress_update);
});
```

### Using `SetDefaultMyAddress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setDefaultMyAddressRef, SetDefaultMyAddressVariables } from '@dataconnect/generated';

// The `SetDefaultMyAddress` mutation requires an argument of type `SetDefaultMyAddressVariables`:
const setDefaultMyAddressVars: SetDefaultMyAddressVariables = {
  id: ..., 
};

// Call the `setDefaultMyAddressRef()` function to get a reference to the mutation.
const ref = setDefaultMyAddressRef(setDefaultMyAddressVars);
// Variables can be defined inline as well.
const ref = setDefaultMyAddressRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setDefaultMyAddressRef(dataConnect, setDefaultMyAddressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userAddress_updateMany);
console.log(data.userAddress_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userAddress_updateMany);
  console.log(data.userAddress_update);
});
```

## SoftDeleteMyAddress
You can execute the `SoftDeleteMyAddress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
softDeleteMyAddress(vars: SoftDeleteMyAddressVariables): MutationPromise<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;

interface SoftDeleteMyAddressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SoftDeleteMyAddressVariables): MutationRef<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;
}
export const softDeleteMyAddressRef: SoftDeleteMyAddressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
softDeleteMyAddress(dc: DataConnect, vars: SoftDeleteMyAddressVariables): MutationPromise<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;

interface SoftDeleteMyAddressRef {
  ...
  (dc: DataConnect, vars: SoftDeleteMyAddressVariables): MutationRef<SoftDeleteMyAddressData, SoftDeleteMyAddressVariables>;
}
export const softDeleteMyAddressRef: SoftDeleteMyAddressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the softDeleteMyAddressRef:
```typescript
const name = softDeleteMyAddressRef.operationName;
console.log(name);
```

### Variables
The `SoftDeleteMyAddress` mutation requires an argument of type `SoftDeleteMyAddressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SoftDeleteMyAddressVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SoftDeleteMyAddress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SoftDeleteMyAddressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SoftDeleteMyAddressData {
  userAddress_update?: UserAddress_Key | null;
}
```
### Using `SoftDeleteMyAddress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, softDeleteMyAddress, SoftDeleteMyAddressVariables } from '@dataconnect/generated';

// The `SoftDeleteMyAddress` mutation requires an argument of type `SoftDeleteMyAddressVariables`:
const softDeleteMyAddressVars: SoftDeleteMyAddressVariables = {
  id: ..., 
};

// Call the `softDeleteMyAddress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await softDeleteMyAddress(softDeleteMyAddressVars);
// Variables can be defined inline as well.
const { data } = await softDeleteMyAddress({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await softDeleteMyAddress(dataConnect, softDeleteMyAddressVars);

console.log(data.userAddress_update);

// Or, you can use the `Promise` API.
softDeleteMyAddress(softDeleteMyAddressVars).then((response) => {
  const data = response.data;
  console.log(data.userAddress_update);
});
```

### Using `SoftDeleteMyAddress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, softDeleteMyAddressRef, SoftDeleteMyAddressVariables } from '@dataconnect/generated';

// The `SoftDeleteMyAddress` mutation requires an argument of type `SoftDeleteMyAddressVariables`:
const softDeleteMyAddressVars: SoftDeleteMyAddressVariables = {
  id: ..., 
};

// Call the `softDeleteMyAddressRef()` function to get a reference to the mutation.
const ref = softDeleteMyAddressRef(softDeleteMyAddressVars);
// Variables can be defined inline as well.
const ref = softDeleteMyAddressRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = softDeleteMyAddressRef(dataConnect, softDeleteMyAddressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userAddress_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userAddress_update);
});
```

## CreateMyVehicle
You can execute the `CreateMyVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMyVehicle(vars: CreateMyVehicleVariables): MutationPromise<CreateMyVehicleData, CreateMyVehicleVariables>;

interface CreateMyVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyVehicleVariables): MutationRef<CreateMyVehicleData, CreateMyVehicleVariables>;
}
export const createMyVehicleRef: CreateMyVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyVehicle(dc: DataConnect, vars: CreateMyVehicleVariables): MutationPromise<CreateMyVehicleData, CreateMyVehicleVariables>;

interface CreateMyVehicleRef {
  ...
  (dc: DataConnect, vars: CreateMyVehicleVariables): MutationRef<CreateMyVehicleData, CreateMyVehicleVariables>;
}
export const createMyVehicleRef: CreateMyVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyVehicleRef:
```typescript
const name = createMyVehicleRef.operationName;
console.log(name);
```

### Variables
The `CreateMyVehicle` mutation requires an argument of type `CreateMyVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMyVehicleVariables {
  userId: UUIDString;
  make: string;
  model: string;
  year?: number | null;
  color: string;
  plateNumber: string;
  isDefault: boolean;
}
```
### Return Type
Recall that executing the `CreateMyVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyVehicleData {
  userVehicle_insert: UserVehicle_Key;
}
```
### Using `CreateMyVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyVehicle, CreateMyVehicleVariables } from '@dataconnect/generated';

// The `CreateMyVehicle` mutation requires an argument of type `CreateMyVehicleVariables`:
const createMyVehicleVars: CreateMyVehicleVariables = {
  userId: ..., 
  make: ..., 
  model: ..., 
  year: ..., // optional
  color: ..., 
  plateNumber: ..., 
  isDefault: ..., 
};

// Call the `createMyVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyVehicle(createMyVehicleVars);
// Variables can be defined inline as well.
const { data } = await createMyVehicle({ userId: ..., make: ..., model: ..., year: ..., color: ..., plateNumber: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyVehicle(dataConnect, createMyVehicleVars);

console.log(data.userVehicle_insert);

// Or, you can use the `Promise` API.
createMyVehicle(createMyVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_insert);
});
```

### Using `CreateMyVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyVehicleRef, CreateMyVehicleVariables } from '@dataconnect/generated';

// The `CreateMyVehicle` mutation requires an argument of type `CreateMyVehicleVariables`:
const createMyVehicleVars: CreateMyVehicleVariables = {
  userId: ..., 
  make: ..., 
  model: ..., 
  year: ..., // optional
  color: ..., 
  plateNumber: ..., 
  isDefault: ..., 
};

// Call the `createMyVehicleRef()` function to get a reference to the mutation.
const ref = createMyVehicleRef(createMyVehicleVars);
// Variables can be defined inline as well.
const ref = createMyVehicleRef({ userId: ..., make: ..., model: ..., year: ..., color: ..., plateNumber: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyVehicleRef(dataConnect, createMyVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userVehicle_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_insert);
});
```

## UpdateMyVehicle
You can execute the `UpdateMyVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyVehicle(vars: UpdateMyVehicleVariables): MutationPromise<UpdateMyVehicleData, UpdateMyVehicleVariables>;

interface UpdateMyVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyVehicleVariables): MutationRef<UpdateMyVehicleData, UpdateMyVehicleVariables>;
}
export const updateMyVehicleRef: UpdateMyVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyVehicle(dc: DataConnect, vars: UpdateMyVehicleVariables): MutationPromise<UpdateMyVehicleData, UpdateMyVehicleVariables>;

interface UpdateMyVehicleRef {
  ...
  (dc: DataConnect, vars: UpdateMyVehicleVariables): MutationRef<UpdateMyVehicleData, UpdateMyVehicleVariables>;
}
export const updateMyVehicleRef: UpdateMyVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyVehicleRef:
```typescript
const name = updateMyVehicleRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyVehicle` mutation requires an argument of type `UpdateMyVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyVehicleVariables {
  id: UUIDString;
  make: string;
  model: string;
  year?: number | null;
  color: string;
  plateNumber: string;
  isDefault: boolean;
}
```
### Return Type
Recall that executing the `UpdateMyVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyVehicleData {
  userVehicle_update?: UserVehicle_Key | null;
}
```
### Using `UpdateMyVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyVehicle, UpdateMyVehicleVariables } from '@dataconnect/generated';

// The `UpdateMyVehicle` mutation requires an argument of type `UpdateMyVehicleVariables`:
const updateMyVehicleVars: UpdateMyVehicleVariables = {
  id: ..., 
  make: ..., 
  model: ..., 
  year: ..., // optional
  color: ..., 
  plateNumber: ..., 
  isDefault: ..., 
};

// Call the `updateMyVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyVehicle(updateMyVehicleVars);
// Variables can be defined inline as well.
const { data } = await updateMyVehicle({ id: ..., make: ..., model: ..., year: ..., color: ..., plateNumber: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyVehicle(dataConnect, updateMyVehicleVars);

console.log(data.userVehicle_update);

// Or, you can use the `Promise` API.
updateMyVehicle(updateMyVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_update);
});
```

### Using `UpdateMyVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyVehicleRef, UpdateMyVehicleVariables } from '@dataconnect/generated';

// The `UpdateMyVehicle` mutation requires an argument of type `UpdateMyVehicleVariables`:
const updateMyVehicleVars: UpdateMyVehicleVariables = {
  id: ..., 
  make: ..., 
  model: ..., 
  year: ..., // optional
  color: ..., 
  plateNumber: ..., 
  isDefault: ..., 
};

// Call the `updateMyVehicleRef()` function to get a reference to the mutation.
const ref = updateMyVehicleRef(updateMyVehicleVars);
// Variables can be defined inline as well.
const ref = updateMyVehicleRef({ id: ..., make: ..., model: ..., year: ..., color: ..., plateNumber: ..., isDefault: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyVehicleRef(dataConnect, updateMyVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userVehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_update);
});
```

## SoftDeleteMyVehicle
You can execute the `SoftDeleteMyVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
softDeleteMyVehicle(vars: SoftDeleteMyVehicleVariables): MutationPromise<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;

interface SoftDeleteMyVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SoftDeleteMyVehicleVariables): MutationRef<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;
}
export const softDeleteMyVehicleRef: SoftDeleteMyVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
softDeleteMyVehicle(dc: DataConnect, vars: SoftDeleteMyVehicleVariables): MutationPromise<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;

interface SoftDeleteMyVehicleRef {
  ...
  (dc: DataConnect, vars: SoftDeleteMyVehicleVariables): MutationRef<SoftDeleteMyVehicleData, SoftDeleteMyVehicleVariables>;
}
export const softDeleteMyVehicleRef: SoftDeleteMyVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the softDeleteMyVehicleRef:
```typescript
const name = softDeleteMyVehicleRef.operationName;
console.log(name);
```

### Variables
The `SoftDeleteMyVehicle` mutation requires an argument of type `SoftDeleteMyVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SoftDeleteMyVehicleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SoftDeleteMyVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SoftDeleteMyVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SoftDeleteMyVehicleData {
  userVehicle_update?: UserVehicle_Key | null;
}
```
### Using `SoftDeleteMyVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, softDeleteMyVehicle, SoftDeleteMyVehicleVariables } from '@dataconnect/generated';

// The `SoftDeleteMyVehicle` mutation requires an argument of type `SoftDeleteMyVehicleVariables`:
const softDeleteMyVehicleVars: SoftDeleteMyVehicleVariables = {
  id: ..., 
};

// Call the `softDeleteMyVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await softDeleteMyVehicle(softDeleteMyVehicleVars);
// Variables can be defined inline as well.
const { data } = await softDeleteMyVehicle({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await softDeleteMyVehicle(dataConnect, softDeleteMyVehicleVars);

console.log(data.userVehicle_update);

// Or, you can use the `Promise` API.
softDeleteMyVehicle(softDeleteMyVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_update);
});
```

### Using `SoftDeleteMyVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, softDeleteMyVehicleRef, SoftDeleteMyVehicleVariables } from '@dataconnect/generated';

// The `SoftDeleteMyVehicle` mutation requires an argument of type `SoftDeleteMyVehicleVariables`:
const softDeleteMyVehicleVars: SoftDeleteMyVehicleVariables = {
  id: ..., 
};

// Call the `softDeleteMyVehicleRef()` function to get a reference to the mutation.
const ref = softDeleteMyVehicleRef(softDeleteMyVehicleVars);
// Variables can be defined inline as well.
const ref = softDeleteMyVehicleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = softDeleteMyVehicleRef(dataConnect, softDeleteMyVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userVehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_update);
});
```

## SetDefaultMyVehicle
You can execute the `SetDefaultMyVehicle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
setDefaultMyVehicle(vars: SetDefaultMyVehicleVariables): MutationPromise<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;

interface SetDefaultMyVehicleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetDefaultMyVehicleVariables): MutationRef<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;
}
export const setDefaultMyVehicleRef: SetDefaultMyVehicleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setDefaultMyVehicle(dc: DataConnect, vars: SetDefaultMyVehicleVariables): MutationPromise<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;

interface SetDefaultMyVehicleRef {
  ...
  (dc: DataConnect, vars: SetDefaultMyVehicleVariables): MutationRef<SetDefaultMyVehicleData, SetDefaultMyVehicleVariables>;
}
export const setDefaultMyVehicleRef: SetDefaultMyVehicleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setDefaultMyVehicleRef:
```typescript
const name = setDefaultMyVehicleRef.operationName;
console.log(name);
```

### Variables
The `SetDefaultMyVehicle` mutation requires an argument of type `SetDefaultMyVehicleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetDefaultMyVehicleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `SetDefaultMyVehicle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetDefaultMyVehicleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetDefaultMyVehicleData {
  userVehicle_updateMany: number;
  userVehicle_update?: UserVehicle_Key | null;
}
```
### Using `SetDefaultMyVehicle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setDefaultMyVehicle, SetDefaultMyVehicleVariables } from '@dataconnect/generated';

// The `SetDefaultMyVehicle` mutation requires an argument of type `SetDefaultMyVehicleVariables`:
const setDefaultMyVehicleVars: SetDefaultMyVehicleVariables = {
  id: ..., 
};

// Call the `setDefaultMyVehicle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setDefaultMyVehicle(setDefaultMyVehicleVars);
// Variables can be defined inline as well.
const { data } = await setDefaultMyVehicle({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setDefaultMyVehicle(dataConnect, setDefaultMyVehicleVars);

console.log(data.userVehicle_updateMany);
console.log(data.userVehicle_update);

// Or, you can use the `Promise` API.
setDefaultMyVehicle(setDefaultMyVehicleVars).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_updateMany);
  console.log(data.userVehicle_update);
});
```

### Using `SetDefaultMyVehicle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setDefaultMyVehicleRef, SetDefaultMyVehicleVariables } from '@dataconnect/generated';

// The `SetDefaultMyVehicle` mutation requires an argument of type `SetDefaultMyVehicleVariables`:
const setDefaultMyVehicleVars: SetDefaultMyVehicleVariables = {
  id: ..., 
};

// Call the `setDefaultMyVehicleRef()` function to get a reference to the mutation.
const ref = setDefaultMyVehicleRef(setDefaultMyVehicleVars);
// Variables can be defined inline as well.
const ref = setDefaultMyVehicleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setDefaultMyVehicleRef(dataConnect, setDefaultMyVehicleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userVehicle_updateMany);
console.log(data.userVehicle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userVehicle_updateMany);
  console.log(data.userVehicle_update);
});
```

## AddMyFavorite
You can execute the `AddMyFavorite` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addMyFavorite(vars: AddMyFavoriteVariables): MutationPromise<AddMyFavoriteData, AddMyFavoriteVariables>;

interface AddMyFavoriteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMyFavoriteVariables): MutationRef<AddMyFavoriteData, AddMyFavoriteVariables>;
}
export const addMyFavoriteRef: AddMyFavoriteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addMyFavorite(dc: DataConnect, vars: AddMyFavoriteVariables): MutationPromise<AddMyFavoriteData, AddMyFavoriteVariables>;

interface AddMyFavoriteRef {
  ...
  (dc: DataConnect, vars: AddMyFavoriteVariables): MutationRef<AddMyFavoriteData, AddMyFavoriteVariables>;
}
export const addMyFavoriteRef: AddMyFavoriteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addMyFavoriteRef:
```typescript
const name = addMyFavoriteRef.operationName;
console.log(name);
```

### Variables
The `AddMyFavorite` mutation requires an argument of type `AddMyFavoriteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddMyFavoriteVariables {
  userId: UUIDString;
  productId: UUIDString;
}
```
### Return Type
Recall that executing the `AddMyFavorite` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddMyFavoriteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddMyFavoriteData {
  userFavorite_upsert: UserFavorite_Key;
}
```
### Using `AddMyFavorite`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addMyFavorite, AddMyFavoriteVariables } from '@dataconnect/generated';

// The `AddMyFavorite` mutation requires an argument of type `AddMyFavoriteVariables`:
const addMyFavoriteVars: AddMyFavoriteVariables = {
  userId: ..., 
  productId: ..., 
};

// Call the `addMyFavorite()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addMyFavorite(addMyFavoriteVars);
// Variables can be defined inline as well.
const { data } = await addMyFavorite({ userId: ..., productId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addMyFavorite(dataConnect, addMyFavoriteVars);

console.log(data.userFavorite_upsert);

// Or, you can use the `Promise` API.
addMyFavorite(addMyFavoriteVars).then((response) => {
  const data = response.data;
  console.log(data.userFavorite_upsert);
});
```

### Using `AddMyFavorite`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addMyFavoriteRef, AddMyFavoriteVariables } from '@dataconnect/generated';

// The `AddMyFavorite` mutation requires an argument of type `AddMyFavoriteVariables`:
const addMyFavoriteVars: AddMyFavoriteVariables = {
  userId: ..., 
  productId: ..., 
};

// Call the `addMyFavoriteRef()` function to get a reference to the mutation.
const ref = addMyFavoriteRef(addMyFavoriteVars);
// Variables can be defined inline as well.
const ref = addMyFavoriteRef({ userId: ..., productId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addMyFavoriteRef(dataConnect, addMyFavoriteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userFavorite_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userFavorite_upsert);
});
```

## RemoveMyFavorite
You can execute the `RemoveMyFavorite` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeMyFavorite(vars: RemoveMyFavoriteVariables): MutationPromise<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;

interface RemoveMyFavoriteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveMyFavoriteVariables): MutationRef<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;
}
export const removeMyFavoriteRef: RemoveMyFavoriteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeMyFavorite(dc: DataConnect, vars: RemoveMyFavoriteVariables): MutationPromise<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;

interface RemoveMyFavoriteRef {
  ...
  (dc: DataConnect, vars: RemoveMyFavoriteVariables): MutationRef<RemoveMyFavoriteData, RemoveMyFavoriteVariables>;
}
export const removeMyFavoriteRef: RemoveMyFavoriteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeMyFavoriteRef:
```typescript
const name = removeMyFavoriteRef.operationName;
console.log(name);
```

### Variables
The `RemoveMyFavorite` mutation requires an argument of type `RemoveMyFavoriteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveMyFavoriteVariables {
  productId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveMyFavorite` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveMyFavoriteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveMyFavoriteData {
  userFavorite_deleteMany: number;
}
```
### Using `RemoveMyFavorite`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeMyFavorite, RemoveMyFavoriteVariables } from '@dataconnect/generated';

// The `RemoveMyFavorite` mutation requires an argument of type `RemoveMyFavoriteVariables`:
const removeMyFavoriteVars: RemoveMyFavoriteVariables = {
  productId: ..., 
};

// Call the `removeMyFavorite()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeMyFavorite(removeMyFavoriteVars);
// Variables can be defined inline as well.
const { data } = await removeMyFavorite({ productId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeMyFavorite(dataConnect, removeMyFavoriteVars);

console.log(data.userFavorite_deleteMany);

// Or, you can use the `Promise` API.
removeMyFavorite(removeMyFavoriteVars).then((response) => {
  const data = response.data;
  console.log(data.userFavorite_deleteMany);
});
```

### Using `RemoveMyFavorite`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeMyFavoriteRef, RemoveMyFavoriteVariables } from '@dataconnect/generated';

// The `RemoveMyFavorite` mutation requires an argument of type `RemoveMyFavoriteVariables`:
const removeMyFavoriteVars: RemoveMyFavoriteVariables = {
  productId: ..., 
};

// Call the `removeMyFavoriteRef()` function to get a reference to the mutation.
const ref = removeMyFavoriteRef(removeMyFavoriteVars);
// Variables can be defined inline as well.
const ref = removeMyFavoriteRef({ productId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeMyFavoriteRef(dataConnect, removeMyFavoriteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userFavorite_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userFavorite_deleteMany);
});
```

## CreateMyCart
You can execute the `CreateMyCart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMyCart(vars: CreateMyCartVariables): MutationPromise<CreateMyCartData, CreateMyCartVariables>;

interface CreateMyCartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMyCartVariables): MutationRef<CreateMyCartData, CreateMyCartVariables>;
}
export const createMyCartRef: CreateMyCartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMyCart(dc: DataConnect, vars: CreateMyCartVariables): MutationPromise<CreateMyCartData, CreateMyCartVariables>;

interface CreateMyCartRef {
  ...
  (dc: DataConnect, vars: CreateMyCartVariables): MutationRef<CreateMyCartData, CreateMyCartVariables>;
}
export const createMyCartRef: CreateMyCartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMyCartRef:
```typescript
const name = createMyCartRef.operationName;
console.log(name);
```

### Variables
The `CreateMyCart` mutation requires an argument of type `CreateMyCartVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMyCartVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateMyCart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMyCartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMyCartData {
  cart_insert: Cart_Key;
}
```
### Using `CreateMyCart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMyCart, CreateMyCartVariables } from '@dataconnect/generated';

// The `CreateMyCart` mutation requires an argument of type `CreateMyCartVariables`:
const createMyCartVars: CreateMyCartVariables = {
  userId: ..., 
};

// Call the `createMyCart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMyCart(createMyCartVars);
// Variables can be defined inline as well.
const { data } = await createMyCart({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMyCart(dataConnect, createMyCartVars);

console.log(data.cart_insert);

// Or, you can use the `Promise` API.
createMyCart(createMyCartVars).then((response) => {
  const data = response.data;
  console.log(data.cart_insert);
});
```

### Using `CreateMyCart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMyCartRef, CreateMyCartVariables } from '@dataconnect/generated';

// The `CreateMyCart` mutation requires an argument of type `CreateMyCartVariables`:
const createMyCartVars: CreateMyCartVariables = {
  userId: ..., 
};

// Call the `createMyCartRef()` function to get a reference to the mutation.
const ref = createMyCartRef(createMyCartVars);
// Variables can be defined inline as well.
const ref = createMyCartRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMyCartRef(dataConnect, createMyCartVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cart_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cart_insert);
});
```

## UpdateMyCartPreferences
You can execute the `UpdateMyCartPreferences` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyCartPreferences(vars?: UpdateMyCartPreferencesVariables): MutationPromise<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;

interface UpdateMyCartPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyCartPreferencesVariables): MutationRef<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;
}
export const updateMyCartPreferencesRef: UpdateMyCartPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyCartPreferences(dc: DataConnect, vars?: UpdateMyCartPreferencesVariables): MutationPromise<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;

interface UpdateMyCartPreferencesRef {
  ...
  (dc: DataConnect, vars?: UpdateMyCartPreferencesVariables): MutationRef<UpdateMyCartPreferencesData, UpdateMyCartPreferencesVariables>;
}
export const updateMyCartPreferencesRef: UpdateMyCartPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyCartPreferencesRef:
```typescript
const name = updateMyCartPreferencesRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyCartPreferences` mutation has an optional argument of type `UpdateMyCartPreferencesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyCartPreferencesVariables {
  couponId?: UUIDString | null;
  deliverySlot?: string | null;
  paymentMethod?: string | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyCartPreferences` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyCartPreferencesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyCartPreferencesData {
  cart_update?: Cart_Key | null;
}
```
### Using `UpdateMyCartPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyCartPreferences, UpdateMyCartPreferencesVariables } from '@dataconnect/generated';

// The `UpdateMyCartPreferences` mutation has an optional argument of type `UpdateMyCartPreferencesVariables`:
const updateMyCartPreferencesVars: UpdateMyCartPreferencesVariables = {
  couponId: ..., // optional
  deliverySlot: ..., // optional
  paymentMethod: ..., // optional
  notes: ..., // optional
};

// Call the `updateMyCartPreferences()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyCartPreferences(updateMyCartPreferencesVars);
// Variables can be defined inline as well.
const { data } = await updateMyCartPreferences({ couponId: ..., deliverySlot: ..., paymentMethod: ..., notes: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyCartPreferencesVariables` argument.
const { data } = await updateMyCartPreferences();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyCartPreferences(dataConnect, updateMyCartPreferencesVars);

console.log(data.cart_update);

// Or, you can use the `Promise` API.
updateMyCartPreferences(updateMyCartPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.cart_update);
});
```

### Using `UpdateMyCartPreferences`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyCartPreferencesRef, UpdateMyCartPreferencesVariables } from '@dataconnect/generated';

// The `UpdateMyCartPreferences` mutation has an optional argument of type `UpdateMyCartPreferencesVariables`:
const updateMyCartPreferencesVars: UpdateMyCartPreferencesVariables = {
  couponId: ..., // optional
  deliverySlot: ..., // optional
  paymentMethod: ..., // optional
  notes: ..., // optional
};

// Call the `updateMyCartPreferencesRef()` function to get a reference to the mutation.
const ref = updateMyCartPreferencesRef(updateMyCartPreferencesVars);
// Variables can be defined inline as well.
const ref = updateMyCartPreferencesRef({ couponId: ..., deliverySlot: ..., paymentMethod: ..., notes: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyCartPreferencesVariables` argument.
const ref = updateMyCartPreferencesRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyCartPreferencesRef(dataConnect, updateMyCartPreferencesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cart_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cart_update);
});
```

## InsertMyCartItem
You can execute the `InsertMyCartItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
insertMyCartItem(vars: InsertMyCartItemVariables): MutationPromise<InsertMyCartItemData, InsertMyCartItemVariables>;

interface InsertMyCartItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertMyCartItemVariables): MutationRef<InsertMyCartItemData, InsertMyCartItemVariables>;
}
export const insertMyCartItemRef: InsertMyCartItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertMyCartItem(dc: DataConnect, vars: InsertMyCartItemVariables): MutationPromise<InsertMyCartItemData, InsertMyCartItemVariables>;

interface InsertMyCartItemRef {
  ...
  (dc: DataConnect, vars: InsertMyCartItemVariables): MutationRef<InsertMyCartItemData, InsertMyCartItemVariables>;
}
export const insertMyCartItemRef: InsertMyCartItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertMyCartItemRef:
```typescript
const name = insertMyCartItemRef.operationName;
console.log(name);
```

### Variables
The `InsertMyCartItem` mutation requires an argument of type `InsertMyCartItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertMyCartItemVariables {
  cartId: UUIDString;
  productId: UUIDString;
  weightOptionId?: UUIDString | null;
  quantity: number;
}
```
### Return Type
Recall that executing the `InsertMyCartItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertMyCartItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertMyCartItemData {
  cartItem_insert: CartItem_Key;
}
```
### Using `InsertMyCartItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertMyCartItem, InsertMyCartItemVariables } from '@dataconnect/generated';

// The `InsertMyCartItem` mutation requires an argument of type `InsertMyCartItemVariables`:
const insertMyCartItemVars: InsertMyCartItemVariables = {
  cartId: ..., 
  productId: ..., 
  weightOptionId: ..., // optional
  quantity: ..., 
};

// Call the `insertMyCartItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertMyCartItem(insertMyCartItemVars);
// Variables can be defined inline as well.
const { data } = await insertMyCartItem({ cartId: ..., productId: ..., weightOptionId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertMyCartItem(dataConnect, insertMyCartItemVars);

console.log(data.cartItem_insert);

// Or, you can use the `Promise` API.
insertMyCartItem(insertMyCartItemVars).then((response) => {
  const data = response.data;
  console.log(data.cartItem_insert);
});
```

### Using `InsertMyCartItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertMyCartItemRef, InsertMyCartItemVariables } from '@dataconnect/generated';

// The `InsertMyCartItem` mutation requires an argument of type `InsertMyCartItemVariables`:
const insertMyCartItemVars: InsertMyCartItemVariables = {
  cartId: ..., 
  productId: ..., 
  weightOptionId: ..., // optional
  quantity: ..., 
};

// Call the `insertMyCartItemRef()` function to get a reference to the mutation.
const ref = insertMyCartItemRef(insertMyCartItemVars);
// Variables can be defined inline as well.
const ref = insertMyCartItemRef({ cartId: ..., productId: ..., weightOptionId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertMyCartItemRef(dataConnect, insertMyCartItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cartItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cartItem_insert);
});
```

## UpdateMyCartItemQty
You can execute the `UpdateMyCartItemQty` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyCartItemQty(vars: UpdateMyCartItemQtyVariables): MutationPromise<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;

interface UpdateMyCartItemQtyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMyCartItemQtyVariables): MutationRef<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;
}
export const updateMyCartItemQtyRef: UpdateMyCartItemQtyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyCartItemQty(dc: DataConnect, vars: UpdateMyCartItemQtyVariables): MutationPromise<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;

interface UpdateMyCartItemQtyRef {
  ...
  (dc: DataConnect, vars: UpdateMyCartItemQtyVariables): MutationRef<UpdateMyCartItemQtyData, UpdateMyCartItemQtyVariables>;
}
export const updateMyCartItemQtyRef: UpdateMyCartItemQtyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyCartItemQtyRef:
```typescript
const name = updateMyCartItemQtyRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyCartItemQty` mutation requires an argument of type `UpdateMyCartItemQtyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyCartItemQtyVariables {
  itemId: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `UpdateMyCartItemQty` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyCartItemQtyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyCartItemQtyData {
  cartItem_update?: CartItem_Key | null;
}
```
### Using `UpdateMyCartItemQty`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyCartItemQty, UpdateMyCartItemQtyVariables } from '@dataconnect/generated';

// The `UpdateMyCartItemQty` mutation requires an argument of type `UpdateMyCartItemQtyVariables`:
const updateMyCartItemQtyVars: UpdateMyCartItemQtyVariables = {
  itemId: ..., 
  quantity: ..., 
};

// Call the `updateMyCartItemQty()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyCartItemQty(updateMyCartItemQtyVars);
// Variables can be defined inline as well.
const { data } = await updateMyCartItemQty({ itemId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyCartItemQty(dataConnect, updateMyCartItemQtyVars);

console.log(data.cartItem_update);

// Or, you can use the `Promise` API.
updateMyCartItemQty(updateMyCartItemQtyVars).then((response) => {
  const data = response.data;
  console.log(data.cartItem_update);
});
```

### Using `UpdateMyCartItemQty`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyCartItemQtyRef, UpdateMyCartItemQtyVariables } from '@dataconnect/generated';

// The `UpdateMyCartItemQty` mutation requires an argument of type `UpdateMyCartItemQtyVariables`:
const updateMyCartItemQtyVars: UpdateMyCartItemQtyVariables = {
  itemId: ..., 
  quantity: ..., 
};

// Call the `updateMyCartItemQtyRef()` function to get a reference to the mutation.
const ref = updateMyCartItemQtyRef(updateMyCartItemQtyVars);
// Variables can be defined inline as well.
const ref = updateMyCartItemQtyRef({ itemId: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyCartItemQtyRef(dataConnect, updateMyCartItemQtyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cartItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cartItem_update);
});
```

## RemoveMyCartItem
You can execute the `RemoveMyCartItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeMyCartItem(vars: RemoveMyCartItemVariables): MutationPromise<RemoveMyCartItemData, RemoveMyCartItemVariables>;

interface RemoveMyCartItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveMyCartItemVariables): MutationRef<RemoveMyCartItemData, RemoveMyCartItemVariables>;
}
export const removeMyCartItemRef: RemoveMyCartItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeMyCartItem(dc: DataConnect, vars: RemoveMyCartItemVariables): MutationPromise<RemoveMyCartItemData, RemoveMyCartItemVariables>;

interface RemoveMyCartItemRef {
  ...
  (dc: DataConnect, vars: RemoveMyCartItemVariables): MutationRef<RemoveMyCartItemData, RemoveMyCartItemVariables>;
}
export const removeMyCartItemRef: RemoveMyCartItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeMyCartItemRef:
```typescript
const name = removeMyCartItemRef.operationName;
console.log(name);
```

### Variables
The `RemoveMyCartItem` mutation requires an argument of type `RemoveMyCartItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveMyCartItemVariables {
  itemId: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveMyCartItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveMyCartItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveMyCartItemData {
  cartItem_delete?: CartItem_Key | null;
}
```
### Using `RemoveMyCartItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeMyCartItem, RemoveMyCartItemVariables } from '@dataconnect/generated';

// The `RemoveMyCartItem` mutation requires an argument of type `RemoveMyCartItemVariables`:
const removeMyCartItemVars: RemoveMyCartItemVariables = {
  itemId: ..., 
};

// Call the `removeMyCartItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeMyCartItem(removeMyCartItemVars);
// Variables can be defined inline as well.
const { data } = await removeMyCartItem({ itemId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeMyCartItem(dataConnect, removeMyCartItemVars);

console.log(data.cartItem_delete);

// Or, you can use the `Promise` API.
removeMyCartItem(removeMyCartItemVars).then((response) => {
  const data = response.data;
  console.log(data.cartItem_delete);
});
```

### Using `RemoveMyCartItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeMyCartItemRef, RemoveMyCartItemVariables } from '@dataconnect/generated';

// The `RemoveMyCartItem` mutation requires an argument of type `RemoveMyCartItemVariables`:
const removeMyCartItemVars: RemoveMyCartItemVariables = {
  itemId: ..., 
};

// Call the `removeMyCartItemRef()` function to get a reference to the mutation.
const ref = removeMyCartItemRef(removeMyCartItemVars);
// Variables can be defined inline as well.
const ref = removeMyCartItemRef({ itemId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeMyCartItemRef(dataConnect, removeMyCartItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cartItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cartItem_delete);
});
```

## ClearMyCart
You can execute the `ClearMyCart` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
clearMyCart(): MutationPromise<ClearMyCartData, undefined>;

interface ClearMyCartRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<ClearMyCartData, undefined>;
}
export const clearMyCartRef: ClearMyCartRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
clearMyCart(dc: DataConnect): MutationPromise<ClearMyCartData, undefined>;

interface ClearMyCartRef {
  ...
  (dc: DataConnect): MutationRef<ClearMyCartData, undefined>;
}
export const clearMyCartRef: ClearMyCartRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the clearMyCartRef:
```typescript
const name = clearMyCartRef.operationName;
console.log(name);
```

### Variables
The `ClearMyCart` mutation has no variables.
### Return Type
Recall that executing the `ClearMyCart` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ClearMyCartData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ClearMyCartData {
  cartItem_deleteMany: number;
  cart_update?: Cart_Key | null;
}
```
### Using `ClearMyCart`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, clearMyCart } from '@dataconnect/generated';


// Call the `clearMyCart()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await clearMyCart();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await clearMyCart(dataConnect);

console.log(data.cartItem_deleteMany);
console.log(data.cart_update);

// Or, you can use the `Promise` API.
clearMyCart().then((response) => {
  const data = response.data;
  console.log(data.cartItem_deleteMany);
  console.log(data.cart_update);
});
```

### Using `ClearMyCart`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, clearMyCartRef } from '@dataconnect/generated';


// Call the `clearMyCartRef()` function to get a reference to the mutation.
const ref = clearMyCartRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = clearMyCartRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cartItem_deleteMany);
console.log(data.cart_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cartItem_deleteMany);
  console.log(data.cart_update);
});
```

## MarkMyNotificationRead
You can execute the `MarkMyNotificationRead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markMyNotificationRead(vars: MarkMyNotificationReadVariables): MutationPromise<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;

interface MarkMyNotificationReadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkMyNotificationReadVariables): MutationRef<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;
}
export const markMyNotificationReadRef: MarkMyNotificationReadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markMyNotificationRead(dc: DataConnect, vars: MarkMyNotificationReadVariables): MutationPromise<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;

interface MarkMyNotificationReadRef {
  ...
  (dc: DataConnect, vars: MarkMyNotificationReadVariables): MutationRef<MarkMyNotificationReadData, MarkMyNotificationReadVariables>;
}
export const markMyNotificationReadRef: MarkMyNotificationReadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markMyNotificationReadRef:
```typescript
const name = markMyNotificationReadRef.operationName;
console.log(name);
```

### Variables
The `MarkMyNotificationRead` mutation requires an argument of type `MarkMyNotificationReadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkMyNotificationReadVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `MarkMyNotificationRead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkMyNotificationReadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkMyNotificationReadData {
  notification_update?: Notification_Key | null;
}
```
### Using `MarkMyNotificationRead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markMyNotificationRead, MarkMyNotificationReadVariables } from '@dataconnect/generated';

// The `MarkMyNotificationRead` mutation requires an argument of type `MarkMyNotificationReadVariables`:
const markMyNotificationReadVars: MarkMyNotificationReadVariables = {
  id: ..., 
};

// Call the `markMyNotificationRead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markMyNotificationRead(markMyNotificationReadVars);
// Variables can be defined inline as well.
const { data } = await markMyNotificationRead({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markMyNotificationRead(dataConnect, markMyNotificationReadVars);

console.log(data.notification_update);

// Or, you can use the `Promise` API.
markMyNotificationRead(markMyNotificationReadVars).then((response) => {
  const data = response.data;
  console.log(data.notification_update);
});
```

### Using `MarkMyNotificationRead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markMyNotificationReadRef, MarkMyNotificationReadVariables } from '@dataconnect/generated';

// The `MarkMyNotificationRead` mutation requires an argument of type `MarkMyNotificationReadVariables`:
const markMyNotificationReadVars: MarkMyNotificationReadVariables = {
  id: ..., 
};

// Call the `markMyNotificationReadRef()` function to get a reference to the mutation.
const ref = markMyNotificationReadRef(markMyNotificationReadVars);
// Variables can be defined inline as well.
const ref = markMyNotificationReadRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markMyNotificationReadRef(dataConnect, markMyNotificationReadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_update);
});
```

## MarkAllMyNotificationsRead
You can execute the `MarkAllMyNotificationsRead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
markAllMyNotificationsRead(): MutationPromise<MarkAllMyNotificationsReadData, undefined>;

interface MarkAllMyNotificationsReadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<MarkAllMyNotificationsReadData, undefined>;
}
export const markAllMyNotificationsReadRef: MarkAllMyNotificationsReadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markAllMyNotificationsRead(dc: DataConnect): MutationPromise<MarkAllMyNotificationsReadData, undefined>;

interface MarkAllMyNotificationsReadRef {
  ...
  (dc: DataConnect): MutationRef<MarkAllMyNotificationsReadData, undefined>;
}
export const markAllMyNotificationsReadRef: MarkAllMyNotificationsReadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markAllMyNotificationsReadRef:
```typescript
const name = markAllMyNotificationsReadRef.operationName;
console.log(name);
```

### Variables
The `MarkAllMyNotificationsRead` mutation has no variables.
### Return Type
Recall that executing the `MarkAllMyNotificationsRead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkAllMyNotificationsReadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkAllMyNotificationsReadData {
  notification_updateMany: number;
}
```
### Using `MarkAllMyNotificationsRead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markAllMyNotificationsRead } from '@dataconnect/generated';


// Call the `markAllMyNotificationsRead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markAllMyNotificationsRead();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markAllMyNotificationsRead(dataConnect);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
markAllMyNotificationsRead().then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

### Using `MarkAllMyNotificationsRead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markAllMyNotificationsReadRef } from '@dataconnect/generated';


// Call the `markAllMyNotificationsReadRef()` function to get a reference to the mutation.
const ref = markAllMyNotificationsReadRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markAllMyNotificationsReadRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

## RegisterMyDeviceToken
You can execute the `RegisterMyDeviceToken` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registerMyDeviceToken(vars: RegisterMyDeviceTokenVariables): MutationPromise<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;

interface RegisterMyDeviceTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegisterMyDeviceTokenVariables): MutationRef<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;
}
export const registerMyDeviceTokenRef: RegisterMyDeviceTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registerMyDeviceToken(dc: DataConnect, vars: RegisterMyDeviceTokenVariables): MutationPromise<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;

interface RegisterMyDeviceTokenRef {
  ...
  (dc: DataConnect, vars: RegisterMyDeviceTokenVariables): MutationRef<RegisterMyDeviceTokenData, RegisterMyDeviceTokenVariables>;
}
export const registerMyDeviceTokenRef: RegisterMyDeviceTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registerMyDeviceTokenRef:
```typescript
const name = registerMyDeviceTokenRef.operationName;
console.log(name);
```

### Variables
The `RegisterMyDeviceToken` mutation requires an argument of type `RegisterMyDeviceTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegisterMyDeviceTokenVariables {
  userId: UUIDString;
  fcmToken: string;
  platform: string;
  deviceName?: string | null;
}
```
### Return Type
Recall that executing the `RegisterMyDeviceToken` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegisterMyDeviceTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegisterMyDeviceTokenData {
  userDevice_insert: UserDevice_Key;
}
```
### Using `RegisterMyDeviceToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registerMyDeviceToken, RegisterMyDeviceTokenVariables } from '@dataconnect/generated';

// The `RegisterMyDeviceToken` mutation requires an argument of type `RegisterMyDeviceTokenVariables`:
const registerMyDeviceTokenVars: RegisterMyDeviceTokenVariables = {
  userId: ..., 
  fcmToken: ..., 
  platform: ..., 
  deviceName: ..., // optional
};

// Call the `registerMyDeviceToken()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registerMyDeviceToken(registerMyDeviceTokenVars);
// Variables can be defined inline as well.
const { data } = await registerMyDeviceToken({ userId: ..., fcmToken: ..., platform: ..., deviceName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registerMyDeviceToken(dataConnect, registerMyDeviceTokenVars);

console.log(data.userDevice_insert);

// Or, you can use the `Promise` API.
registerMyDeviceToken(registerMyDeviceTokenVars).then((response) => {
  const data = response.data;
  console.log(data.userDevice_insert);
});
```

### Using `RegisterMyDeviceToken`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registerMyDeviceTokenRef, RegisterMyDeviceTokenVariables } from '@dataconnect/generated';

// The `RegisterMyDeviceToken` mutation requires an argument of type `RegisterMyDeviceTokenVariables`:
const registerMyDeviceTokenVars: RegisterMyDeviceTokenVariables = {
  userId: ..., 
  fcmToken: ..., 
  platform: ..., 
  deviceName: ..., // optional
};

// Call the `registerMyDeviceTokenRef()` function to get a reference to the mutation.
const ref = registerMyDeviceTokenRef(registerMyDeviceTokenVars);
// Variables can be defined inline as well.
const ref = registerMyDeviceTokenRef({ userId: ..., fcmToken: ..., platform: ..., deviceName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registerMyDeviceTokenRef(dataConnect, registerMyDeviceTokenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userDevice_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userDevice_insert);
});
```

## RefreshMyDeviceToken
You can execute the `RefreshMyDeviceToken` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
refreshMyDeviceToken(vars: RefreshMyDeviceTokenVariables): MutationPromise<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;

interface RefreshMyDeviceTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RefreshMyDeviceTokenVariables): MutationRef<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;
}
export const refreshMyDeviceTokenRef: RefreshMyDeviceTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
refreshMyDeviceToken(dc: DataConnect, vars: RefreshMyDeviceTokenVariables): MutationPromise<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;

interface RefreshMyDeviceTokenRef {
  ...
  (dc: DataConnect, vars: RefreshMyDeviceTokenVariables): MutationRef<RefreshMyDeviceTokenData, RefreshMyDeviceTokenVariables>;
}
export const refreshMyDeviceTokenRef: RefreshMyDeviceTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the refreshMyDeviceTokenRef:
```typescript
const name = refreshMyDeviceTokenRef.operationName;
console.log(name);
```

### Variables
The `RefreshMyDeviceToken` mutation requires an argument of type `RefreshMyDeviceTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RefreshMyDeviceTokenVariables {
  fcmToken: string;
  deviceName?: string | null;
}
```
### Return Type
Recall that executing the `RefreshMyDeviceToken` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RefreshMyDeviceTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RefreshMyDeviceTokenData {
  userDevice_update?: UserDevice_Key | null;
}
```
### Using `RefreshMyDeviceToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, refreshMyDeviceToken, RefreshMyDeviceTokenVariables } from '@dataconnect/generated';

// The `RefreshMyDeviceToken` mutation requires an argument of type `RefreshMyDeviceTokenVariables`:
const refreshMyDeviceTokenVars: RefreshMyDeviceTokenVariables = {
  fcmToken: ..., 
  deviceName: ..., // optional
};

// Call the `refreshMyDeviceToken()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await refreshMyDeviceToken(refreshMyDeviceTokenVars);
// Variables can be defined inline as well.
const { data } = await refreshMyDeviceToken({ fcmToken: ..., deviceName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await refreshMyDeviceToken(dataConnect, refreshMyDeviceTokenVars);

console.log(data.userDevice_update);

// Or, you can use the `Promise` API.
refreshMyDeviceToken(refreshMyDeviceTokenVars).then((response) => {
  const data = response.data;
  console.log(data.userDevice_update);
});
```

### Using `RefreshMyDeviceToken`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, refreshMyDeviceTokenRef, RefreshMyDeviceTokenVariables } from '@dataconnect/generated';

// The `RefreshMyDeviceToken` mutation requires an argument of type `RefreshMyDeviceTokenVariables`:
const refreshMyDeviceTokenVars: RefreshMyDeviceTokenVariables = {
  fcmToken: ..., 
  deviceName: ..., // optional
};

// Call the `refreshMyDeviceTokenRef()` function to get a reference to the mutation.
const ref = refreshMyDeviceTokenRef(refreshMyDeviceTokenVars);
// Variables can be defined inline as well.
const ref = refreshMyDeviceTokenRef({ fcmToken: ..., deviceName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = refreshMyDeviceTokenRef(dataConnect, refreshMyDeviceTokenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userDevice_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userDevice_update);
});
```

## DeactivateMyDeviceToken
You can execute the `DeactivateMyDeviceToken` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deactivateMyDeviceToken(vars: DeactivateMyDeviceTokenVariables): MutationPromise<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;

interface DeactivateMyDeviceTokenRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateMyDeviceTokenVariables): MutationRef<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;
}
export const deactivateMyDeviceTokenRef: DeactivateMyDeviceTokenRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateMyDeviceToken(dc: DataConnect, vars: DeactivateMyDeviceTokenVariables): MutationPromise<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;

interface DeactivateMyDeviceTokenRef {
  ...
  (dc: DataConnect, vars: DeactivateMyDeviceTokenVariables): MutationRef<DeactivateMyDeviceTokenData, DeactivateMyDeviceTokenVariables>;
}
export const deactivateMyDeviceTokenRef: DeactivateMyDeviceTokenRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateMyDeviceTokenRef:
```typescript
const name = deactivateMyDeviceTokenRef.operationName;
console.log(name);
```

### Variables
The `DeactivateMyDeviceToken` mutation requires an argument of type `DeactivateMyDeviceTokenVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateMyDeviceTokenVariables {
  fcmToken: string;
}
```
### Return Type
Recall that executing the `DeactivateMyDeviceToken` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateMyDeviceTokenData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateMyDeviceTokenData {
  userDevice_update?: UserDevice_Key | null;
}
```
### Using `DeactivateMyDeviceToken`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateMyDeviceToken, DeactivateMyDeviceTokenVariables } from '@dataconnect/generated';

// The `DeactivateMyDeviceToken` mutation requires an argument of type `DeactivateMyDeviceTokenVariables`:
const deactivateMyDeviceTokenVars: DeactivateMyDeviceTokenVariables = {
  fcmToken: ..., 
};

// Call the `deactivateMyDeviceToken()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateMyDeviceToken(deactivateMyDeviceTokenVars);
// Variables can be defined inline as well.
const { data } = await deactivateMyDeviceToken({ fcmToken: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateMyDeviceToken(dataConnect, deactivateMyDeviceTokenVars);

console.log(data.userDevice_update);

// Or, you can use the `Promise` API.
deactivateMyDeviceToken(deactivateMyDeviceTokenVars).then((response) => {
  const data = response.data;
  console.log(data.userDevice_update);
});
```

### Using `DeactivateMyDeviceToken`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateMyDeviceTokenRef, DeactivateMyDeviceTokenVariables } from '@dataconnect/generated';

// The `DeactivateMyDeviceToken` mutation requires an argument of type `DeactivateMyDeviceTokenVariables`:
const deactivateMyDeviceTokenVars: DeactivateMyDeviceTokenVariables = {
  fcmToken: ..., 
};

// Call the `deactivateMyDeviceTokenRef()` function to get a reference to the mutation.
const ref = deactivateMyDeviceTokenRef(deactivateMyDeviceTokenVars);
// Variables can be defined inline as well.
const ref = deactivateMyDeviceTokenRef({ fcmToken: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateMyDeviceTokenRef(dataConnect, deactivateMyDeviceTokenVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userDevice_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userDevice_update);
});
```

