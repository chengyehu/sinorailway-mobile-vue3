import { get, post, del, put } from "../utils/request";

// Get unit list
export function getUnitsListApi(params) {
  return get("/app-sys/api/sys/org/search", params);
}

// Create a unit
export function createUnitApi(params) {
  return post("/app-sys/api/sys/org/create", params);
}

// Delete a unit
export function deleteUnitApi(id) {
  return del("/app-sys/api/sys/org/delete", id);
}

// View unit's details
export function unitDetailApi(id) {
  return get("/app-sys/api/sys/org/detail", id);
}

// Update unit's info
export function updateUnitApi(params) {
  return put("/app-sys/api/sys/org/update", params);
}