const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'tazaj',
  service: 'tazaj-market',
  location: 'europe-west3'
};
exports.connectorConfig = connectorConfig;

const adminListAllCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListAllCategories');
}
adminListAllCategoriesRef.operationName = 'AdminListAllCategories';
exports.adminListAllCategoriesRef = adminListAllCategoriesRef;

exports.adminListAllCategories = function adminListAllCategories(dc) {
  return executeQuery(adminListAllCategoriesRef(dc));
};

const adminListAllProductsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListAllProducts', inputVars);
}
adminListAllProductsRef.operationName = 'AdminListAllProducts';
exports.adminListAllProductsRef = adminListAllProductsRef;

exports.adminListAllProducts = function adminListAllProducts(dcOrVars, vars) {
  return executeQuery(adminListAllProductsRef(dcOrVars, vars));
};

const adminListOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListOrders', inputVars);
}
adminListOrdersRef.operationName = 'AdminListOrders';
exports.adminListOrdersRef = adminListOrdersRef;

exports.adminListOrders = function adminListOrders(dcOrVars, vars) {
  return executeQuery(adminListOrdersRef(dcOrVars, vars));
};

const adminListCustomersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListCustomers');
}
adminListCustomersRef.operationName = 'AdminListCustomers';
exports.adminListCustomersRef = adminListCustomersRef;

exports.adminListCustomers = function adminListCustomers(dc) {
  return executeQuery(adminListCustomersRef(dc));
};

const adminGetCustomerOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminGetCustomerOrders', inputVars);
}
adminGetCustomerOrdersRef.operationName = 'AdminGetCustomerOrders';
exports.adminGetCustomerOrdersRef = adminGetCustomerOrdersRef;

exports.adminGetCustomerOrders = function adminGetCustomerOrders(dcOrVars, vars) {
  return executeQuery(adminGetCustomerOrdersRef(dcOrVars, vars));
};

const adminListCouponsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListCoupons');
}
adminListCouponsRef.operationName = 'AdminListCoupons';
exports.adminListCouponsRef = adminListCouponsRef;

exports.adminListCoupons = function adminListCoupons(dc) {
  return executeQuery(adminListCouponsRef(dc));
};

const adminListBannersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListBanners');
}
adminListBannersRef.operationName = 'AdminListBanners';
exports.adminListBannersRef = adminListBannersRef;

exports.adminListBanners = function adminListBanners(dc) {
  return executeQuery(adminListBannersRef(dc));
};

const adminListStaffNotificationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminListStaffNotifications');
}
adminListStaffNotificationsRef.operationName = 'AdminListStaffNotifications';
exports.adminListStaffNotificationsRef = adminListStaffNotificationsRef;

exports.adminListStaffNotifications = function adminListStaffNotifications(dc) {
  return executeQuery(adminListStaffNotificationsRef(dc));
};

const adminOnlyListSubAdminsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminOnlyListSubAdmins');
}
adminOnlyListSubAdminsRef.operationName = 'AdminOnlyListSubAdmins';
exports.adminOnlyListSubAdminsRef = adminOnlyListSubAdminsRef;

exports.adminOnlyListSubAdmins = function adminOnlyListSubAdmins(dc) {
  return executeQuery(adminOnlyListSubAdminsRef(dc));
};

const adminOnlyListAuditLogsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'AdminOnlyListAuditLogs');
}
adminOnlyListAuditLogsRef.operationName = 'AdminOnlyListAuditLogs';
exports.adminOnlyListAuditLogsRef = adminOnlyListAuditLogsRef;

exports.adminOnlyListAuditLogs = function adminOnlyListAuditLogs(dc) {
  return executeQuery(adminOnlyListAuditLogsRef(dc));
};

const listActiveCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveCategories');
}
listActiveCategoriesRef.operationName = 'ListActiveCategories';
exports.listActiveCategoriesRef = listActiveCategoriesRef;

exports.listActiveCategories = function listActiveCategories(dc) {
  return executeQuery(listActiveCategoriesRef(dc));
};

const listActiveProductsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveProducts', inputVars);
}
listActiveProductsRef.operationName = 'ListActiveProducts';
exports.listActiveProductsRef = listActiveProductsRef;

exports.listActiveProducts = function listActiveProducts(dcOrVars, vars) {
  return executeQuery(listActiveProductsRef(dcOrVars, vars));
};

const getProductByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductById', inputVars);
}
getProductByIdRef.operationName = 'GetProductById';
exports.getProductByIdRef = getProductByIdRef;

exports.getProductById = function getProductById(dcOrVars, vars) {
  return executeQuery(getProductByIdRef(dcOrVars, vars));
};

const listActiveBannersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveBanners');
}
listActiveBannersRef.operationName = 'ListActiveBanners';
exports.listActiveBannersRef = listActiveBannersRef;

exports.listActiveBanners = function listActiveBanners(dc) {
  return executeQuery(listActiveBannersRef(dc));
};

const listAppSettingsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAppSettings');
}
listAppSettingsRef.operationName = 'ListAppSettings';
exports.listAppSettingsRef = listAppSettingsRef;

exports.listAppSettings = function listAppSettings(dc) {
  return executeQuery(listAppSettingsRef(dc));
};

const validateCouponCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ValidateCouponCode', inputVars);
}
validateCouponCodeRef.operationName = 'ValidateCouponCode';
exports.validateCouponCodeRef = validateCouponCodeRef;

exports.validateCouponCode = function validateCouponCode(dcOrVars, vars) {
  return executeQuery(validateCouponCodeRef(dcOrVars, vars));
};

const getMyProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProfile');
}
getMyProfileRef.operationName = 'GetMyProfile';
exports.getMyProfileRef = getMyProfileRef;

exports.getMyProfile = function getMyProfile(dc) {
  return executeQuery(getMyProfileRef(dc));
};

const updateMyProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyProfile', inputVars);
}
updateMyProfileRef.operationName = 'UpdateMyProfile';
exports.updateMyProfileRef = updateMyProfileRef;

exports.updateMyProfile = function updateMyProfile(dcOrVars, vars) {
  return executeMutation(updateMyProfileRef(dcOrVars, vars));
};

const listMyAddressesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyAddresses');
}
listMyAddressesRef.operationName = 'ListMyAddresses';
exports.listMyAddressesRef = listMyAddressesRef;

exports.listMyAddresses = function listMyAddresses(dc) {
  return executeQuery(listMyAddressesRef(dc));
};

const createMyAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyAddress', inputVars);
}
createMyAddressRef.operationName = 'CreateMyAddress';
exports.createMyAddressRef = createMyAddressRef;

exports.createMyAddress = function createMyAddress(dcOrVars, vars) {
  return executeMutation(createMyAddressRef(dcOrVars, vars));
};

const clearOtherDefaultAddressesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearOtherDefaultAddresses', inputVars);
}
clearOtherDefaultAddressesRef.operationName = 'ClearOtherDefaultAddresses';
exports.clearOtherDefaultAddressesRef = clearOtherDefaultAddressesRef;

exports.clearOtherDefaultAddresses = function clearOtherDefaultAddresses(dcOrVars, vars) {
  return executeMutation(clearOtherDefaultAddressesRef(dcOrVars, vars));
};

const setDefaultMyAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetDefaultMyAddress', inputVars);
}
setDefaultMyAddressRef.operationName = 'SetDefaultMyAddress';
exports.setDefaultMyAddressRef = setDefaultMyAddressRef;

exports.setDefaultMyAddress = function setDefaultMyAddress(dcOrVars, vars) {
  return executeMutation(setDefaultMyAddressRef(dcOrVars, vars));
};

const softDeleteMyAddressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SoftDeleteMyAddress', inputVars);
}
softDeleteMyAddressRef.operationName = 'SoftDeleteMyAddress';
exports.softDeleteMyAddressRef = softDeleteMyAddressRef;

exports.softDeleteMyAddress = function softDeleteMyAddress(dcOrVars, vars) {
  return executeMutation(softDeleteMyAddressRef(dcOrVars, vars));
};

const listMyVehiclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyVehicles');
}
listMyVehiclesRef.operationName = 'ListMyVehicles';
exports.listMyVehiclesRef = listMyVehiclesRef;

exports.listMyVehicles = function listMyVehicles(dc) {
  return executeQuery(listMyVehiclesRef(dc));
};

const createMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyVehicle', inputVars);
}
createMyVehicleRef.operationName = 'CreateMyVehicle';
exports.createMyVehicleRef = createMyVehicleRef;

exports.createMyVehicle = function createMyVehicle(dcOrVars, vars) {
  return executeMutation(createMyVehicleRef(dcOrVars, vars));
};

const updateMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyVehicle', inputVars);
}
updateMyVehicleRef.operationName = 'UpdateMyVehicle';
exports.updateMyVehicleRef = updateMyVehicleRef;

exports.updateMyVehicle = function updateMyVehicle(dcOrVars, vars) {
  return executeMutation(updateMyVehicleRef(dcOrVars, vars));
};

const softDeleteMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SoftDeleteMyVehicle', inputVars);
}
softDeleteMyVehicleRef.operationName = 'SoftDeleteMyVehicle';
exports.softDeleteMyVehicleRef = softDeleteMyVehicleRef;

exports.softDeleteMyVehicle = function softDeleteMyVehicle(dcOrVars, vars) {
  return executeMutation(softDeleteMyVehicleRef(dcOrVars, vars));
};

const setDefaultMyVehicleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetDefaultMyVehicle', inputVars);
}
setDefaultMyVehicleRef.operationName = 'SetDefaultMyVehicle';
exports.setDefaultMyVehicleRef = setDefaultMyVehicleRef;

exports.setDefaultMyVehicle = function setDefaultMyVehicle(dcOrVars, vars) {
  return executeMutation(setDefaultMyVehicleRef(dcOrVars, vars));
};

const listMyFavoritesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyFavorites');
}
listMyFavoritesRef.operationName = 'ListMyFavorites';
exports.listMyFavoritesRef = listMyFavoritesRef;

exports.listMyFavorites = function listMyFavorites(dc) {
  return executeQuery(listMyFavoritesRef(dc));
};

const addMyFavoriteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddMyFavorite', inputVars);
}
addMyFavoriteRef.operationName = 'AddMyFavorite';
exports.addMyFavoriteRef = addMyFavoriteRef;

exports.addMyFavorite = function addMyFavorite(dcOrVars, vars) {
  return executeMutation(addMyFavoriteRef(dcOrVars, vars));
};

const removeMyFavoriteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveMyFavorite', inputVars);
}
removeMyFavoriteRef.operationName = 'RemoveMyFavorite';
exports.removeMyFavoriteRef = removeMyFavoriteRef;

exports.removeMyFavorite = function removeMyFavorite(dcOrVars, vars) {
  return executeMutation(removeMyFavoriteRef(dcOrVars, vars));
};

const getMyCartRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyCart');
}
getMyCartRef.operationName = 'GetMyCart';
exports.getMyCartRef = getMyCartRef;

exports.getMyCart = function getMyCart(dc) {
  return executeQuery(getMyCartRef(dc));
};

const createMyCartRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMyCart', inputVars);
}
createMyCartRef.operationName = 'CreateMyCart';
exports.createMyCartRef = createMyCartRef;

exports.createMyCart = function createMyCart(dcOrVars, vars) {
  return executeMutation(createMyCartRef(dcOrVars, vars));
};

const updateMyCartPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyCartPreferences', inputVars);
}
updateMyCartPreferencesRef.operationName = 'UpdateMyCartPreferences';
exports.updateMyCartPreferencesRef = updateMyCartPreferencesRef;

exports.updateMyCartPreferences = function updateMyCartPreferences(dcOrVars, vars) {
  return executeMutation(updateMyCartPreferencesRef(dcOrVars, vars));
};

const insertMyCartItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertMyCartItem', inputVars);
}
insertMyCartItemRef.operationName = 'InsertMyCartItem';
exports.insertMyCartItemRef = insertMyCartItemRef;

exports.insertMyCartItem = function insertMyCartItem(dcOrVars, vars) {
  return executeMutation(insertMyCartItemRef(dcOrVars, vars));
};

const updateMyCartItemQtyRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyCartItemQty', inputVars);
}
updateMyCartItemQtyRef.operationName = 'UpdateMyCartItemQty';
exports.updateMyCartItemQtyRef = updateMyCartItemQtyRef;

exports.updateMyCartItemQty = function updateMyCartItemQty(dcOrVars, vars) {
  return executeMutation(updateMyCartItemQtyRef(dcOrVars, vars));
};

const removeMyCartItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RemoveMyCartItem', inputVars);
}
removeMyCartItemRef.operationName = 'RemoveMyCartItem';
exports.removeMyCartItemRef = removeMyCartItemRef;

exports.removeMyCartItem = function removeMyCartItem(dcOrVars, vars) {
  return executeMutation(removeMyCartItemRef(dcOrVars, vars));
};

const clearMyCartRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClearMyCart');
}
clearMyCartRef.operationName = 'ClearMyCart';
exports.clearMyCartRef = clearMyCartRef;

exports.clearMyCart = function clearMyCart(dc) {
  return executeMutation(clearMyCartRef(dc));
};

const listMyOrdersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyOrders', inputVars);
}
listMyOrdersRef.operationName = 'ListMyOrders';
exports.listMyOrdersRef = listMyOrdersRef;

exports.listMyOrders = function listMyOrders(dcOrVars, vars) {
  return executeQuery(listMyOrdersRef(dcOrVars, vars));
};

const getMyOrderByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyOrderById', inputVars);
}
getMyOrderByIdRef.operationName = 'GetMyOrderById';
exports.getMyOrderByIdRef = getMyOrderByIdRef;

exports.getMyOrderById = function getMyOrderById(dcOrVars, vars) {
  return executeQuery(getMyOrderByIdRef(dcOrVars, vars));
};

const listMyNotificationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMyNotifications');
}
listMyNotificationsRef.operationName = 'ListMyNotifications';
exports.listMyNotificationsRef = listMyNotificationsRef;

exports.listMyNotifications = function listMyNotifications(dc) {
  return executeQuery(listMyNotificationsRef(dc));
};

const markMyNotificationReadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkMyNotificationRead', inputVars);
}
markMyNotificationReadRef.operationName = 'MarkMyNotificationRead';
exports.markMyNotificationReadRef = markMyNotificationReadRef;

exports.markMyNotificationRead = function markMyNotificationRead(dcOrVars, vars) {
  return executeMutation(markMyNotificationReadRef(dcOrVars, vars));
};

const markAllMyNotificationsReadRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkAllMyNotificationsRead');
}
markAllMyNotificationsReadRef.operationName = 'MarkAllMyNotificationsRead';
exports.markAllMyNotificationsReadRef = markAllMyNotificationsReadRef;

exports.markAllMyNotificationsRead = function markAllMyNotificationsRead(dc) {
  return executeMutation(markAllMyNotificationsReadRef(dc));
};

const registerMyDeviceTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RegisterMyDeviceToken', inputVars);
}
registerMyDeviceTokenRef.operationName = 'RegisterMyDeviceToken';
exports.registerMyDeviceTokenRef = registerMyDeviceTokenRef;

exports.registerMyDeviceToken = function registerMyDeviceToken(dcOrVars, vars) {
  return executeMutation(registerMyDeviceTokenRef(dcOrVars, vars));
};

const refreshMyDeviceTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RefreshMyDeviceToken', inputVars);
}
refreshMyDeviceTokenRef.operationName = 'RefreshMyDeviceToken';
exports.refreshMyDeviceTokenRef = refreshMyDeviceTokenRef;

exports.refreshMyDeviceToken = function refreshMyDeviceToken(dcOrVars, vars) {
  return executeMutation(refreshMyDeviceTokenRef(dcOrVars, vars));
};

const deactivateMyDeviceTokenRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateMyDeviceToken', inputVars);
}
deactivateMyDeviceTokenRef.operationName = 'DeactivateMyDeviceToken';
exports.deactivateMyDeviceTokenRef = deactivateMyDeviceTokenRef;

exports.deactivateMyDeviceToken = function deactivateMyDeviceToken(dcOrVars, vars) {
  return executeMutation(deactivateMyDeviceTokenRef(dcOrVars, vars));
};
