interface DeviceType {
    device_id: number;
    name: string;
    device_type: "sensor" | "actuator";
    sensor_type?: "soil_moisture" | "temperature" | "humidity" | null;
    actuator_type?: "pump" | "relay" | "lcd" | null;
    model: string | null;
    status: "active" | "inactive" | "error";
    feed_key: string | null;
    garden_id: number;
}