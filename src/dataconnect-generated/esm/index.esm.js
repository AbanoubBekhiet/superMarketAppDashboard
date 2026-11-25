import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'tazaj',
  service: 'tazaj-market',
  location: 'europe-west3'
};

export const adminListAllCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListAllCategories');
}
adminListAllCategoriesRef.operationName = 'AdminListAllCategories';

export function adminListAllCategories(dc) {
  return executeQuery(adminListAllCategoriesRef(dc));
}

export const adminListAllProductsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListAllProducts', inputVars);
}
adminListAllProductsRef.operationName = 'AdminListAllProducts';

export function adminListAllProducts(dcOrVars, vars) {
  return executeQuery(adminListAllProductsRef(dcOrVars, vars));
}

export const adminListOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListOrders', inputVars);
}
adminListOrdersRef.operationName = 'AdminListOrders';

export function adminListOrders(dcOrVars, vars) {
  return executeQuery(adminListOrdersRef(dcOrVars, vars));
}

export const adminListCustomersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListCustomers');
}
adminListCustomersRef.operationName = 'AdminListCustomers';

export function adminListCustomers(dc) {
  return executeQuery(adminListCustomersRef(dc));
}

export const adminGetCustomerOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminGetCustomerOrders', inputVars);
}
adminGetCustomerOrdersRef.operationName = 'AdminGetCustomerOrders';

export function adminGetCustomerOrders(dcOrVars, vars) {
  return executeQuery(adminGetCustomerOrdersRef(dcOrVars, vars));
}

export const adminListCouponsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListCoupons');
}
adminListCouponsRef.operationName = 'AdminListCoupons';

export function adminListCoupons(dc) {
  return executeQuery(adminListCouponsRef(dc));
}

export const adminListBannersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListBanners');
}
adminListBannersRef.operationName = 'AdminListBanners';

export function adminListBanners(dc) {
  return executeQuery(adminListBannersRef(dc));
}

export const adminListStaffNotificationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListStaffNotifications');
}
adminListStaffNotificationsRef.operationName = 'AdminListStaffNotifications';

export function adminListStaffNotifications(dc) {
  return executeQuery(adminListStaffNotificationsRef(dc));
}

export const adminOnlyListSubAdminsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminOnlyListSubAdmins');
}
adminOnlyListSubAdminsRef.operationName = 'AdminOnlyListSubAdmins';

export function adminOnlyListSubAdmins(dc) {
  return executeQuery(adminOnlyListSubAdminsRef(dc));
}

export const adminOnlyListAuditLogsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminOnlyListAuditLogs');
}
adminOnlyListAuditLogsRef.operationName = 'AdminOnlyListAuditLogs';

export function adminOnlyListAuditLogs(dc) {
  return executeQuery(adminOnlyListAuditLogsRef(dc));
}

export const listActiveCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveCategories');
}
listActiveCategoriesRef.operationName = 'ListActiveCategories';

export function listActiveCategories(dc) {
  return executeQuery(listActiveCategoriesRef(dc));
}

export const listActiveProductsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveProducts', inputVars);
}
listActiveProductsRef.operationName = 'ListActiveProducts';

export function listActiveProducts(dcOrVars, vars) {
  return executeQuery(listActiveProductsRef(dcOrVars, vars));
}

export const getProductByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductById', inputVars);
}
getProductByIdRef.operationName = 'GetProductById';

export function getProductById(dcOrVars, vars) {
  return executeQuery(getProductByIdRef(dcOrVars, vars));
}

export const listActiveBannersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveBanners');
}
listActiveBannersRef.operationName = 'ListActiveBanners';

export function listActiveBanners(dc) {
  return executeQuery(listActiveBannersRef(dc));
}

export const listAppSettingsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAppSettings');
}
listAppSettingsRef.operationName = 'ListAppSettings';

export function listAppSettings(dc) {
  return executeQuery(listAppSettingsRef(dc));
}

export const validateCouponCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ValidateCouponCode', inputVars);
}
validateCouponCodeRef.operationName = 'ValidateCouponCode';

export function validateCouponCode(dcOrVars, vars) {
  return executeQuery(validateCouponCodeRef(dcOrVars, vars));
}

export const getMyProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProfile');
}
getMyProfileRef.operationName = 'GetMyProfile';

export function getMyProfile(dc) {
  return executeQuery(getMyProfileRef(dc));
}

export const updateMyProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyProfile', inputVars);
}
updateMyProfileRef.operationName = 'UpdateMyProfile';

export function updateMyProfile(dcOrVars, vars) {
  return executeMutation(updateMyProfileRef(dcOrVars, vars));
}

export const listMyAddressesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyAddresses');
}
listMyAddressesRef.operationName = 'ListMyAddresses';

export function listMyAddresses(dc) {
  return executeQuery(listMyAddressesRef(dc));
}

export const createMyAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyAddress', inputVars);
}
createMyAddressRef.operationName = 'CreateMyAddress';

export function createMyAddress(dcOrVars, vars) {
  return executeMutation(createMyAddressRef(dcOrVars, vars));
}

export const clearOtherDefaultAddressesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearOtherDefaultAddresses', inputVars);
}
clearOtherDefaultAddressesRef.operationName = 'ClearOtherDefaultAddresses';

export function clearOtherDefaultAddresses(dcOrVars, vars) {
  return executeMutation(clearOtherDefaultAddressesRef(dcOrVars, vars));
}

export const setDefaultMyAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetDefaultMyAddress', inputVars);
}
setDefaultMyAddressRef.operationName = 'SetDefaultMyAddress';

export function setDefaultMyAddress(dcOrVars, vars) {
  return executeMutation(setDefaultMyAddressRef(dcOrVars, vars));
}

export const softDeleteMyAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SoftDeleteMyAddress', inputVars);
}
softDeleteMyAddressRef.operationName = 'SoftDeleteMyAddress';

export function softDeleteMyAddress(dcOrVars, vars) {
  return executeMutation(softDeleteMyAddressRef(dcOrVars, vars));
}

export const listMyVehiclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyVehicles');
}
listMyVehiclesRef.operationName = 'ListMyVehicles';

export function listMyVehicles(dc) {
  return executeQuery(listMyVehiclesRef(dc));
}

export const createMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyVehicle', inputVars);
}
createMyVehicleRef.operationName = 'CreateMyVehicle';

export function createMyVehicle(dcOrVars, vars) {
  return executeMutation(createMyVehicleRef(dcOrVars, vars));
}

export const updateMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyVehicle', inputVars);
}
updateMyVehicleRef.operationName = 'UpdateMyVehicle';

export function updateMyVehicle(dcOrVars, vars) {
  return executeMutation(updateMyVehicleRef(dcOrVars, vars));
}

export const softDeleteMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SoftDeleteMyVehicle', inputVars);
}
softDeleteMyVehicleRef.operationName = 'SoftDeleteMyVehicle';

export function softDeleteMyVehicle(dcOrVars, vars) {
  return executeMutation(softDeleteMyVehicleRef(dcOrVars, vars));
}

export const setDefaultMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetDefaultMyVehicle', inputVars);
}
setDefaultMyVehicleRef.operationName = 'SetDefaultMyVehicle';

export function setDefaultMyVehicle(dcOrVars, vars) {
  return executeMutation(setDefaultMyVehicleRef(dcOrVars, vars));
}

export const listMyFavoritesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyFavorites');
}
listMyFavoritesRef.operationName = 'ListMyFavorites';

export function listMyFavorites(dc) {
  return executeQuery(listMyFavoritesRef(dc));
}

export const addMyFavoriteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMyFavorite', inputVars);
}
addMyFavoriteRef.operationName = 'AddMyFavorite';

export function addMyFavorite(dcOrVars, vars) {
  return executeMutation(addMyFavoriteRef(dcOrVars, vars));
}

export const removeMyFavoriteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveMyFavorite', inputVars);
}
removeMyFavoriteRef.operationName = 'RemoveMyFavorite';

export function removeMyFavorite(dcOrVars, vars) {
  return executeMutation(removeMyFavoriteRef(dcOrVars, vars));
}

export const getMyCartRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyCart');
}
getMyCartRef.operationName = 'GetMyCart';

export function getMyCart(dc) {
  return executeQuery(getMyCartRef(dc));
}

export const createMyCartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyCart', inputVars);
}
createMyCartRef.operationName = 'CreateMyCart';

export function createMyCart(dcOrVars, vars) {
  return executeMutation(createMyCartRef(dcOrVars, vars));
}

export const updateMyCartPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyCartPreferences', inputVars);
}
updateMyCartPreferencesRef.operationName = 'UpdateMyCartPreferences';

export function updateMyCartPreferences(dcOrVars, vars) {
  return executeMutation(updateMyCartPreferencesRef(dcOrVars, vars));
}

export const insertMyCartItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertMyCartItem', inputVars);
}
insertMyCartItemRef.operationName = 'InsertMyCartItem';

export function insertMyCartItem(dcOrVars, vars) {
  return executeMutation(insertMyCartItemRef(dcOrVars, vars));
}

export const updateMyCartItemQtyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyCartItemQty', inputVars);
}
updateMyCartItemQtyRef.operationName = 'UpdateMyCartItemQty';

export function updateMyCartItemQty(dcOrVars, vars) {
  return executeMutation(updateMyCartItemQtyRef(dcOrVars, vars));
}

export const removeMyCartItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveMyCartItem', inputVars);
}
removeMyCartItemRef.operationName = 'RemoveMyCartItem';

export function removeMyCartItem(dcOrVars, vars) {
  return executeMutation(removeMyCartItemRef(dcOrVars, vars));
}

export const clearMyCartRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearMyCart');
}
clearMyCartRef.operationName = 'ClearMyCart';

export function clearMyCart(dc) {
  return executeMutation(clearMyCartRef(dc));
}

export const listMyOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyOrders', inputVars);
}
listMyOrdersRef.operationName = 'ListMyOrders';

export function listMyOrders(dcOrVars, vars) {
  return executeQuery(listMyOrdersRef(dcOrVars, vars));
}

export const getMyOrderByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyOrderById', inputVars);
}
getMyOrderByIdRef.operationName = 'GetMyOrderById';

export function getMyOrderById(dcOrVars, vars) {
  return executeQuery(getMyOrderByIdRef(dcOrVars, vars));
}

export const listMyNotificationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyNotifications');
}
listMyNotificationsRef.operationName = 'ListMyNotifications';

export function listMyNotifications(dc) {
  return executeQuery(listMyNotificationsRef(dc));
}

export const markMyNotificationReadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkMyNotificationRead', inputVars);
}
markMyNotificationReadRef.operationName = 'MarkMyNotificationRead';

export function markMyNotificationRead(dcOrVars, vars) {
  return executeMutation(markMyNotificationReadRef(dcOrVars, vars));
}

export const markAllMyNotificationsReadRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkAllMyNotificationsRead');
}
markAllMyNotificationsReadRef.operationName = 'MarkAllMyNotificationsRead';

export function markAllMyNotificationsRead(dc) {
  return executeMutation(markAllMyNotificationsReadRef(dc));
}

export const registerMyDeviceTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterMyDeviceToken', inputVars);
}
registerMyDeviceTokenRef.operationName = 'RegisterMyDeviceToken';

export function registerMyDeviceToken(dcOrVars, vars) {
  return executeMutation(registerMyDeviceTokenRef(dcOrVars, vars));
}

export const refreshMyDeviceTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RefreshMyDeviceToken', inputVars);
}
refreshMyDeviceTokenRef.operationName = 'RefreshMyDeviceToken';

export function refreshMyDeviceToken(dcOrVars, vars) {
  return executeMutation(refreshMyDeviceTokenRef(dcOrVars, vars));
}

export const deactivateMyDeviceTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateMyDeviceToken', inputVars);
}
deactivateMyDeviceTokenRef.operationName = 'DeactivateMyDeviceToken';

export function deactivateMyDeviceToken(dcOrVars, vars) {
  return executeMutation(deactivateMyDeviceTokenRef(dcOrVars, vars));
}

