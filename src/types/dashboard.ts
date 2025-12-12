// types/dashboard.ts

// 1. Cấu trúc của 1 cảm biến trong JSON
export interface SensorItem {
  sensor_type: string;
  value: number | null; // Value có thể null
}

// 2. Cấu trúc phản hồi từ API (Backend trả về)
export interface SensorBackendResponse {
  soil_moisture: SensorItem;
  temperature: SensorItem;
  humidity: SensorItem;
  // Nếu có thêm trạng thái auto mode từ backend thì thêm vào đây
}

// 3. State dùng cho UI (Frontend)
export interface DashboardState {
  temperature: number | string;
  humidity: number | string;
  soilMoisture: number | string;
  isAutoMode: boolean;
  location: string;
  weatherCondition: string;
}
