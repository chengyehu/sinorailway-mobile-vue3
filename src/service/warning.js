import { get, put, del } from "../utils/request";

// warning message list
export function warningSearchApi(params) {
  return get("/app-sys/api/warning/search", params);
}

// warning message update
export function warningUpdateApi(params) {
  return put("/app-sys/api/warning/update", params);
}

// warning message delete
export function warningDeleteApi(params) {
  return del("/app-sys/api/warning/delete", params);
}

// warning message list
export function getWarningDetailApi(params) {
  return get("/app-sys/api/warning/detail", params);
}