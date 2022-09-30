import { del, get, post, put } from "../utils/request";

// Add a electronic fence
export function createFenceApi(params){
  return post("/app-sys/api/electronicFence/add", params);
}

// get fence list
export function getFenceListApi(params) {
  return get("/app-sys/api/electronicFence/search", params);
}

// update a fence
export function updateFenceApi(params) {
  return put("/app-sys/api/electronicFence/update", params);
}

// delete a fence
export function deleteFenceApi(params) {
  return del("/app-sys/api/electronicFence/delete", params);
}

// distribute a fence to devices
export function distributeFenceToDeviceApi(params) {
  return put("/app-sys/api/electronicFence/distribute", params);
}
