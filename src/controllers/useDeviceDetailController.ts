import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDeviceStore } from '@/store/device-store';
import { useEffect, useState } from 'react';

export const useDeviceDetailController = () => {
  const router = useRouter();

  // 1. Lấy ID từ URL (được truyền từ DeviceBox khi bấm vào)
  const { id } = useLocalSearchParams();

  // 2. Lấy danh sách thiết bị đang có trong Store
  const { listDevices } = useDeviceStore();

  // 3. Tìm thiết bị cụ thể theo ID
  // Lưu ý: params 'id' từ URL thường là string, cần ép kiểu về number để so sánh
  const device = listDevices.find(d => d.device_id === Number(id));

  // 4. Hàm quay lại
  const handleBack = () => {
    router.back();
  };

  return {
    device, // Trả về object device tìm được
    handleBack,
  };
};
