import axios from '@/utils/axios.customize';
import { DeviceItem } from '@/types/device';

export const DeviceService = {
  getDevicesByGarden: (gardenId: number = 1) => {
    return axios.get<DeviceItem[]>(`/devices`);
  },
  deleteDevice: (deviceId: number) => {
    return axios.delete(`/devices/${deviceId}`);
  },
};
