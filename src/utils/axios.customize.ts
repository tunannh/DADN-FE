import axios from 'axios';
import { Platform } from 'react-native';

const backendUrl = Platform.OS === 'android' ? process.env.EXPO_PUBLIC_ANDROID_API_URL : process.env.EXPO_PUBLIC_IOS_API_URL;

const instance = axios.create({
    baseURL: backendUrl,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error?.response?.data) return error.response.data;
    return Promise.reject(error);
});

export default instance;