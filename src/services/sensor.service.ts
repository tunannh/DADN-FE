import axios from '@/utils/axios.customize';
// Import type để gợi ý code
import { SensorBackendResponse } from '@/types/dashboard';

export const SensorService = {
  getLatest: async (gardenId: number = 1) => {
    const url = `/monitoring`;
    // Nếu axios.customize đã xử lý trả về data trực tiếp:
    return axios.get<SensorBackendResponse>(url);
  },
};
