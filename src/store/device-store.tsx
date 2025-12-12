import { create } from 'zustand';
import { DeviceItem } from '@/types/device';
import { DeviceService } from '@/services/device.service';

interface DeviceStore {
    listDevices: DeviceItem[];
    isLoading: boolean;
    fetchDevices: (gardenId: number) => Promise<void>;
    deleteDevice: (id: number) => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
    listDevices: [], // Khởi tạo mảng rỗng để tránh lỗi .filter undefined
    isLoading: false,

    // --- FETCH DATA ---
    fetchDevices: async (gardenId) => {
        set({ isLoading: true });
        try {
            const response: any = await DeviceService.getDevicesByGarden(gardenId);
            
            // Kiểm tra kỹ response để tránh lỗi crash
            if (Array.isArray(response)) {
                set({ listDevices: response });
            } else if (response && Array.isArray(response.data)) {
                 // Trường hợp API trả về { data: [...] }
                set({ listDevices: response.data });
            } else {
                set({ listDevices: [] });
            }
        } catch (error) {
            console.error("Fetch devices error:", error);
            set({ listDevices: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    // --- DELETE DEVICE ---
    deleteDevice: async (id) => {
        const previousList = get().listDevices;

        // 1. Optimistic Update: Xóa trên UI trước
        set((state) => ({
            listDevices: state.listDevices.filter((d) => d.device_id !== id),
        }));

        try {
            // 2. Gọi API xóa
            await DeviceService.deleteDevice(id);
        } catch (error) {
            console.error("Delete device error:", error);
            // 3. Nếu lỗi -> Hoàn tác lại danh sách cũ
            set({ listDevices: previousList });
            alert("Failed to delete device");
        }
    },
}));