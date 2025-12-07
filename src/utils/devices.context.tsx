import React, { createContext, useContext, useState, useEffect } from "react";

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
    addDevice: (device: DeviceType) => void;
    removeDevice: (device_id: number) => void;
    //   fetchDevices: () => Promise<void>;
    //   createDevice: (payload: any) => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

interface Iprops {
    children: React.ReactNode;
}

const DeviceProvider = ({ children }: Iprops) => {
    const [devices, setDevices] = useState<DeviceType[]>([]);
    const addDevice = (device: DeviceType) => {
        setDevices((prevDevices) => [...prevDevices, device]);
    }
    const removeDevice = (device_id: number) => {
        setDevices((prevDevices) => prevDevices.filter(device => device.device_id !== device_id));
    }
    return (
        <DeviceContext.Provider
            value={{ devices, setDevices, addDevice, removeDevice }}
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