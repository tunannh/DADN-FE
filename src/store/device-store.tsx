import { create } from 'zustand';

export const useDeviceStore = create<DeviceStore>((set) => ({
    listDevices: [],
    addDevice: (newDeviceName) =>
        set((state) => ({
            listDevices: [
                ...state.listDevices,
                {
                    id: Math.random().toString(36).substring(2, 10),
                    deviceName: newDeviceName,
                    isActive: false,
                },
            ],
        })),
    deleteDevice: (id) =>
        set((state) => ({
            listDevices: state.listDevices.filter((device) => device.id !== id),
        })),
    // changeStatus: (id) =>
    //     set((state) => ({
    //         listDevices: state.listDevices.map((device) => {
    //             if (device.id === id) {
    //                 return { ...device, isActive: !device.isActive };
    //             }
    //             return device;
    //         }),
    //     }))
    changeStatus: (id) =>
        set((state) => {
            const index = state.listDevices.findIndex((d) => d.id === id);
            if (index === -1) return state;

            const newList = [...state.listDevices];
            // tạo object mới tại vị trí index
            newList[index] = {
                ...newList[index],
                isActive: !newList[index].isActive,
            };

            return { listDevices: newList };
        })
}));
