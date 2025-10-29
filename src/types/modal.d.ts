interface IDeviceType {
    id: string;
    deviceName: string;
    isActive: boolean;
};

interface DeviceStore {
    listDevices: IDeviceType[];
    addDevice: (newDeviceName: string) => void;
    deleteDevice: (id: string) => void;
    changeStatus: (id: string) => void;
}
