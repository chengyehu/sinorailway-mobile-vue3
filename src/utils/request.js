import axios from "axios";
import { getToken } from "./auth"

function returnToLogin() {
  window.location.href = "/login"
}

const instance = axios.create({
  baseURL: 'http://172.16.1.8:8080/',
  timeout: 5000,
});

instance.interceptors.request.use(function (config) {
  if (config.url !== '/api/authenticate') {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  returnToLogin();

});


/**
 * get请求
 * @param url  请求地址
 * @param params  url参数
 * @returns 
 */
export function get(url, params) {
  return instance.get(url, {
    params
  })
}


export function getWithoutParams(url) {
  return instance.get(url)
}

/**
 * post请求
 * @param url  请求地址
 * @param data  数据
 * @returns 
 */
export function post(url, data) {
  return instance.post(url, data)
}

/**
 * put请求
 * @param url 请求地址
 * @param data  数据
 * @returns 
 */
export function put(url, data) {
  return instance.put(url, data)
}


/**
 * delete请求
 * @param url  请求地址
 * @returns 
 */
export function del(url, params) {
  return instance.delete(url, params)
}