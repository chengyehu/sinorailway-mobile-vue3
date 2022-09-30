import { get, post, put, del } from '../utils/request'

// get device list
export function deviceListApi(params) {
  return get('/app-sys/api/device/search', params);
}

// add a device
export function createDeviceApi(params) {
  return post("/app-sys/api/device/add", params);
}

// update device info
export function updateDeviceApi(params) {
  return put("/app-sys/api/device/update", params);
}

// distribute device 
export function distributeDeviceApi(params) {
  return put("/app-sys/api/device/distribute", params);
}

// check out device detail
export function deviceDetailApi(params) {
  return get("/app-sys/api/device/detail", params);
}

// delete a device 
export function deleteDeviceApi(params) {
  return del("/app-sys/api/device/delete", params);
}

// 设置子设备阈值
export function setDeviceMaximumApi(params) {
  return put("/app-sys/api/subDevice/limit", params);
}


// set maximum delete a device 
export function updateSubDeviceApi(params) {
  return put("/app-sys/api/deviceSub/update", params);
}

// get device trace
export function getDeviceHistoryApi(params) {
  return get("/app-sys/api/device/history", params);
}

// 子设备的历史记录
export function getSubDeviceHistoryApi(params) {
  return get("/app-sys/api/subDevice/history", params);
}

// 子设备的阈值单个设置
export function setSubDeiveLimitOneApi(params) {
  return put("/app-sys/api/subDevice/limit/one", params);
}