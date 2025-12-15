import React, { createContext, useContext, useState, useEffect } from "react";
import { listDevicesAPI } from "./api";

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

interface DeviceContextType {
    devices: DeviceType[];
    setDevices: React.Dispatch<React.SetStateAction<DeviceType[]>>;
    actuatorDevices?: DeviceType[];
    sensorDevices?: DeviceType[];
    setActuatorDevices?: React.Dispatch<React.SetStateAction<DeviceType[]>>;
    setSensorDevices?: React.Dispatch<React.SetStateAction<DeviceType[]>>;

    addDevice: (device: DeviceType) => void;
    removeDevice: (device_id: number) => void;

    fetchDevices: () => Promise<void>;
    //   createDevice: (payload: any) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

interface Iprops {
    children: React.ReactNode;
}

const DeviceProvider = ({ children }: Iprops) => {
    const [devices, setDevices] = useState<DeviceType[]>([]);
    const [actuatorDevices, setActuatorDevices] = useState<DeviceType[]>([]);
    const [sensorDevices, setSensorDevices] = useState<DeviceType[]>([]);
    const addDevice = (device: DeviceType) => {
        setDevices(prev => {
            const updated = [...prev, device];
            setActuatorDevices(updated.filter(d => d.device_type === 'actuator'));
            setSensorDevices(updated.filter(d => d.device_type === 'sensor'));
            return updated;
        });
    };
    const removeDevice = (device_id: number) => {
        setDevices((prevDevices) => {
            const updated = prevDevices.filter(device => device.device_id !== device_id);
            setActuatorDevices(updated.filter(d => d.device_type === 'actuator'));
            setSensorDevices(updated.filter(d => d.device_type === 'sensor'));
            return updated;
        });
    }
    const fetchDevices = async () => {
        try {
            // Replace with your API call to fetch devices
            const response = await listDevicesAPI();
            if (response.data) {
                setDevices(response.data);
                setActuatorDevices(response.data.filter((device: DeviceType) => device.device_type === 'actuator'));
                setSensorDevices(response.data.filter((device: DeviceType) => device.device_type === 'sensor'));
            }
        } catch (error) {
            console.error("Failed to fetch devices:", error);
        }
    };
    return (
        <DeviceContext.Provider
            value={{ devices, setDevices, addDevice, removeDevice, fetchDevices, actuatorDevices, sensorDevices }}
        >
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevices = () => {
    const context = useContext(DeviceContext);
    if (!context) throw new Error("useDevices must be inside DeviceProvider");
    return context;
};

export default DeviceProvider;