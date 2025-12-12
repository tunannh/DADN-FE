import axios from 'axios';
import { Platform } from 'react-native';
import { TokenService } from '@/utils/token.storage'; // Import TokenService

const backendUrl =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_ANDROID_API_URL
    : process.env.EXPO_PUBLIC_IOS_API_URL;

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
});

// --- INTERCEPTOR REQUEST ---
instance.interceptors.request.use(
  async function (config) {
    // Trước khi gửi request đi, hãy lấy token từ SecureStore
    const token = await TokenService.getToken();

    // Nếu có token, gắn vào Header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// --- INTERCEPTOR RESPONSE (Giữ nguyên như cũ) ---
instance.interceptors.response.use(
  function (response) {
    if (response && response.data) return response.data;
    return response;
  },
  function (error) {
    if (error?.response?.data) return error.response.data;
    return Promise.reject(error);
  }
);

export default instance;
