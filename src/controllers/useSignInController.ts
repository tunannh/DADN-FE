import { useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import axios from '@/utils/axios.customize'; // Import axios instance để set token

import { AuthService } from '@/services/auth.service';
import { SignInFormValues } from '@/types/auth';
import { TokenService } from '@/utils/token.storage';

export const useSignInController = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      setLoading(true);
      const response: any = await AuthService.login(
        values.email,
        values.password
      );

      if (response && response.access_token) {
        const token = response.access_token;

        // --- QUAN TRỌNG: LƯU TOKEN ---

        // 1. Lưu vào RAM (để dùng ngay lập tức cho các request tiếp theo)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // 2. Lưu vào Ổ cứng an toàn (để tắt app mở lại vẫn còn)
        await TokenService.saveToken(token);

        Toast.show({ type: 'success', text1: 'Login Success' });
        router.replace('/(tabs)/Home');
      } else {
        Toast.show({ type: 'error', text1: 'Login Failed' });
      }
    } catch (error: any) {
      // ... xử lý lỗi
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    showPassword,
    togglePasswordVisibility,
    handleSignIn,
  };
};
