import React, { createContext, useContext, useState, useEffect } from "react";
// 1. Import Service quản lý SecureStore (bạn đã viết)
import { TokenService } from "@/utils/token.storage"; 
// 2. Import instance axios (để set header global)
import axios from "@/utils/axios.customize"; 

// Định nghĩa kiểu dữ liệu cho Context
interface IUserTokenType {
    access_token: string | null;
    isLoading: boolean; // Quan trọng: Để biết app đang check token hay chưa
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Khởi tạo Context
const UserTokenContext = createContext<IUserTokenType | null>(null);

// Hook để sử dụng Context ở các component con
export const useUserTokenContext = () => {
    const context = useContext(UserTokenContext);
    if (!context) {
        throw new Error("useUserTokenContext must be used within a UserTokenProvider");
    }
    return context;
}

interface IProps {
    children: React.ReactNode;
}

// Provider Component
const UserTokenProvider = (props: IProps) => {
    const [access_token, set_access_token] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /**
     * 1. CHECK TOKEN KHI MỞ APP (Auto Login)
     * Chạy 1 lần duy nhất khi App khởi động
     */
    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                // Lấy token từ SecureStore
                const storedToken = await TokenService.getToken();
                
                if (storedToken) {
                    // Nếu có token:
                    // a. Lưu vào State
                    set_access_token(storedToken);
                    // b. Gắn vào Axios Header ngay lập tức
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                }
            } catch (e) {
                console.log("Failed to restore token", e);
            } finally {
                // Dù có token hay không, cũng báo là đã check xong
                setIsLoading(false);
            }
        };

        bootstrapAsync();
    }, []);

    /**
     * 2. HÀM LOGIN (Dùng khi user bấm nút Đăng nhập)
     */
    const login = async (token: string) => {
        // a. Lưu vào State (RAM) -> App re-render, chuyển màn hình
        set_access_token(token);
        
        // b. Lưu vào Axios defaults -> Các request sau tự động có token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // c. Lưu vào SecureStore (Disk) -> Để lần sau mở app vẫn còn
        await TokenService.saveToken(token);
    };

    /**
     * 3. HÀM LOGOUT (Dùng khi user bấm Đăng xuất)
     */
    const logout = async () => {
        // a. Xóa khỏi State
        set_access_token(null);
        
        // b. Xóa khỏi Axios header
        delete axios.defaults.headers.common['Authorization'];
        // Hoặc: axios.defaults.headers.common['Authorization'] = '';
        
        // c. Xóa khỏi SecureStore
        await TokenService.clearToken();
    };

    return (
        <UserTokenContext.Provider value={{ access_token, isLoading, login, logout }}>
            {props.children}
        </UserTokenContext.Provider>
    )
}

export default UserTokenProvider;