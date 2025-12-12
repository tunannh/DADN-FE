import { TokenService } from '@/utils/token.storage';
import axios from 'axios';
import { router } from 'expo-router';

export const handleLogout = async () => {
  // 1. Xóa trong ổ cứng
  await TokenService.clearToken();

  // 2. Xóa trong RAM axios (để chắc chắn)
  delete axios.defaults.headers.common['Authorization'];

  // 3. Đá về trang Login
  router.replace('/(auth)/SignIn');
};
