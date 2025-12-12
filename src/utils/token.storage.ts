import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'auth_access_token';

export const TokenService = {
  /**
   * 1. Lưu Token (Dùng sau khi Login thành công)
   */
  saveToken: async (token: string) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  /**
   * 2. Lấy Token (Dùng trong axios interceptor hoặc check auto login)
   */
  getToken: async () => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(TOKEN_KEY);
      }
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  /**
   * 3. Xóa Token (Dùng khi Logout)
   */
  clearToken: async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  },
};
