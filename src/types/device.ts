// types/device.ts
export interface DeviceItem {
  device_id: number;
  name: string;
  device_type: 'sensor' | 'actuator'; // Phân loại quan trọng
  feed_key: string; // Dùng để quyết định Icon
  garden_id: number;
  status: 'active' | 'inactive';

  // Field phụ cho Frontend (để toggle bật/tắt trên UI)
  isToggleOn?: boolean;
}
