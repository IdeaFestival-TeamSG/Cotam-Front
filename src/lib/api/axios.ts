import axios from "axios";
import { getCookie } from "@/utils";

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => {
    callback(token);
  });
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const response: RefreshResponse = await axiosInstance.post(
          "/auth/refresh",
          {
            refreshToken,
          },
        );

        document.cookie = `accessToken=${response.accessToken}; path=/;`;
        document.cookie = `refreshToken=${response.refreshToken}; path=/;`;

        onTokenRefreshed(response.accessToken);

        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.error(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
