import axios, {AxiosRequestConfig} from "axios";
import {getDeviceIdentifier, getSpecificKeyValueResult} from "./localStorage";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

const instance = axios.create({
  baseURL: 'http://localhost:4999/',
  headers: {
    "Authorization": `Bearer ${getSpecificKeyValueResult('accessToken')}`
  }
})

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.config && err.response && err.response.status === 401) {
      return instance.get(`http://localhost:4999/auth/refresh?identifier=${getDeviceIdentifier()}`, {
               headers: {
                 "Authorization": `Bearer ${getSpecificKeyValueResult('refreshToken')}`
               }
        }).then(async (res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        originalConfig.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
        return instance.request(originalConfig);
      }, (err) => {
        return Promise.reject(err);
      })
    }
  }
)

export const api = instance;