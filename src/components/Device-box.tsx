import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from "@/constants/colors";
import React, { ReactNode } from "react";
import { router } from "expo-router";
import { useDeviceStore } from "@/store/device-store";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        borderRadius: 15,
    },
    infor: {
        flexDirection: 'row',
        gap: 15,
        alignItems: "center"
    },
    device_icon: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#DEDEDE',
        borderRadius: 15
    },
    device_name: {
        gap: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.titleColor
    },
    status: {
        borderRadius: 50,
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center"
    },
    actions: {
        gap: 9,
    }
})

interface IProps {
    deviceName: string;
    active: boolean;
    deviceId?: string;
    icon?: ReactNode,
    toggle?: (value: boolean) => void;
}

const DeviceBox = (props: IProps) => {
    const { deviceName, active, icon, deviceId, toggle } = props;
    const { deleteDevice, changeStatus } = useDeviceStore();
    const status: string = active ? "On" : "Off"
    return (
        <View style={styles.container}>
            <View style={styles.infor}>
                <View style={styles.device_icon}>
                    {icon ? icon : <MaterialIcons name="device-unknown" size={50} color={COLORS.buttonBackground} />}
                </View>
                <View style={styles.device_name}>
                    <Text style={styles.label}>{deviceName}</Text>
                    <TouchableOpacity
                        style={[styles.status, { backgroundColor: active ? '#13E633' : '#CC1800' }]}
                        onPress={() => { toggle ? toggle(!active) : changeStatus(deviceId!) }}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>{status}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.actions}>
                <View>
                    <TouchableOpacity
                        onPress={() => { deviceId ? deleteDevice(deviceId) : alert("Can not delete this device") }}
                    >
                        <MaterialIcons name="delete-outline" size={22} color={COLORS.titleColor} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { router.navigate("/device_actions/Device-infor") }}>
                    <Entypo name="chevron-thin-right" size={24} color={COLORS.titleColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default DeviceBox;