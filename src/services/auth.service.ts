import axios from '@/utils/axios.customize';

export const AuthService = {
  /**
   * API Đăng nhập
   */
  login: (email: string, password: string) => {
    const url = '/login';

    const params = new URLSearchParams();

    // 2. BẮT BUỘC: Key phải là 'username', dù giá trị là email
    params.append('username', email);
    params.append('password', password);

    // 3. Gửi đi với Header đặc biệt
    return axios.post<IbackendResponse>(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
};
