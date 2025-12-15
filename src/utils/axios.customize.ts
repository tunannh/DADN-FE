import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import { router } from 'expo-router';

// Determine API base URL based on platform
let envUrl: string | undefined;
let defaultUrl: string;

if (Platform.OS === 'android') {
    envUrl = process.env.EXPO_PUBLIC_ANDROID_API_URL;
    defaultUrl = 'http://10.0.2.2:8000';
} else if (Platform.OS === 'ios') {
    envUrl = process.env.EXPO_PUBLIC_IOS_API_URL;
    defaultUrl = 'http://localhost:8000';
} else {
    // Web platform (Expo web, browser)
    defaultUrl = 'http://localhost:8000';
}

const baseURL = envUrl || defaultUrl;

const instance = axios.create({
    baseURL,
});

instance.interceptors.request.use(async function (config) {
    const access_token = await AsyncStorage.getItem('access_token');
    if (access_token) {
        config.headers["Authorization"] = `bearer ${access_token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    // Handle 401 Unauthorized - token expired or invalid
    if (error?.response?.status === 401) {
        try {
            // Clear the stored token
            await AsyncStorage.removeItem('access_token');
        } catch (e) {
            console.error('Error clearing token:', e);
        }
        // Redirect to login screen
        router.replace('(auth)/SignIn');
    }
    
    if (error?.response?.data) return error.response.data;
    return Promise.reject(error);
});

export default instance;