import { useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

// Import Types & Services
import { DashboardState, SensorBackendResponse } from '@/types/dashboard';
import { SensorService } from '@/services/sensor.service';

export const useHomeController = () => {
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<DashboardState>({
    temperature: '--',
    humidity: '--',
    soilMoisture: '--',
    isAutoMode: false,
    location: 'Gampaha, Sri Lanka',
    weatherCondition: 'Rainy',
  });

  // --- HÀM GỌI API ---
  const fetchSensorData = useCallback(async () => {
    try {
      // 1. Gọi API
      const response = await SensorService.getLatest();

      const data = response as unknown as SensorBackendResponse;

      if (data) {
        setDashboardData(prev => ({
          ...prev,
          temperature: data.temperature?.value ?? 0,
          humidity: data.humidity?.value ?? 0,
          soilMoisture: data.soil_moisture?.value ?? 0,
        }));
      }
    } catch (error) {
      console.log('Polling Error:', error);
    }
  }, []);

  // --- POLLING LOGIC ---
  useFocusEffect(
    useCallback(() => {
      fetchSensorData(); // Gọi ngay lần đầu
      const intervalId = setInterval(fetchSensorData, 5000000); // Lặp lại mỗi 5s
      return () => clearInterval(intervalId); // Dọn dẹp khi chuyển tab
    }, [fetchSensorData])
  );

  // --- TOGGLE AUTO MODE ---
  const handleToggleAutoMode = async () => {
    const currentMode = dashboardData.isAutoMode;
    const newMode = !currentMode;

    // Optimistic Update
    setDashboardData(prev => ({ ...prev, isAutoMode: newMode }));

    try {
      // TODO: Gọi API cập nhật mode nếu có
      // await SensorService.toggleAutoMode(newMode);

      Toast.show({
        type: 'success',
        text1: `Auto Mode: ${newMode ? 'ON' : 'OFF'}`,
      });
    } catch (error) {
      console.error('Toggle Error:', error);
      // Revert lại nếu lỗi
      setDashboardData(prev => ({ ...prev, isAutoMode: currentMode }));
      Toast.show({ type: 'error', text1: 'Failed to change mode' });
    }
  };

  const navigateToManageUser = () =>
    router.push('/manage_user/ManageUser' as never);
  const navigateToSettings = () => router.push('/setting/setting' as never);

  return {
    dashboardData,
    handleToggleAutoMode,
    navigateToManageUser,
    navigateToSettings,
    refreshData: fetchSensorData,
  };
};
