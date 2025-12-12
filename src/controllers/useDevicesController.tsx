import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDeviceStore } from '@/store/device-store';

// Icons
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';

export const useDevicesController = () => {
  const { listDevices, isLoading, fetchDevices, deleteDevice } = useDeviceStore();

  // 1. Fetch dữ liệu khi vào màn hình
  useEffect(() => {
    const GARDEN_ID = 1; 
    fetchDevices(GARDEN_ID);
  }, []);

  // 2. Đảm bảo data luôn là mảng an toàn
  const safeDevices = Array.isArray(listDevices) ? listDevices : [];

  // 3. Map Icon theo feed_key
  const getDeviceConfig = (feedKey: string) => {
    switch (feedKey) {
      case 'moisture': 
      case 'soil_moisture':
        return <Ionicons name="water" size={40} color="#4CAF50" />;
      case 'temperature':
        return <MaterialCommunityIcons name="thermometer" size={40} color="red" />;
      case 'humidity':
        return <MaterialCommunityIcons name="weather-windy" size={40} color="#00AEEF" />;
      case 'manual_watering':
      case 'pump':
        return <MaterialCommunityIcons name="water-pump" size={40} color="blue" />;
      case 'fan':
        return <MaterialCommunityIcons name="fan" size={40} color="grey" />;
      case 'light':
        return <Foundation name="lightbulb" size={40} color="orange" />;
      default:
        return <MaterialCommunityIcons name="devices" size={40} color="gray" />;
    }
  };

  // 4. Xử lý Xóa
  const handleDelete = (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this device?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => deleteDevice(id) 
        }
      ]
    );
  };

  return {
    devices: safeDevices,
    isLoading,
    getDeviceConfig,
    handleDelete
  };
};