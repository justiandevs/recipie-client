import axios from "axios";
import {getDeviceIdentifier, getSpecificKeyValueResult} from "./localStorage";

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

    if(err.response?.status === 401) {
      try {
        await instance.get(`http://localhost:4999/auth/refresh?identifier=${getDeviceIdentifier()}`, {
          headers: {
            "Authorization": `Bearer ${getSpecificKeyValueResult('refreshToken')}`
          }
          })
            .then((result) => {
              localStorage.setItem('accessToken', result.data.accessToken);
              localStorage.setItem('refreshToken', result.data.refreshToken);
              return instance(originalConfig);
            })
            .catch((err) => {
              console.log(err);
            })
        } catch (e) {
          return Promise.reject(e);
        }
      }
  }
)

export const api = instance;