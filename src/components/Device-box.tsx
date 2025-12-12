import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from "@/constants/colors";

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
        elevation: 4,
        borderRadius: 15,
        marginBottom: 15 // Thêm margin để các box cách nhau
    },
    infor: {
        flexDirection: 'row',
        gap: 15,
        alignItems: "center",
        flex: 1 // Để phần tên chiếm hết khoảng trống còn lại
    },
    device_icon: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F5F5F5',
        borderRadius: 15
    },
    device_name: {
        gap: 8,
        justifyContent: 'center',
        flex: 1
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.titleColor,
    },
    statusButton: {
        borderRadius: 50,
        width: 60, 
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    statusText: {
        color: 'white',
        fontSize: 14, 
        fontWeight: '600'
    },
    actions: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 5,
        marginLeft: 10
    }
});

interface IProps {
    deviceId: number;
    deviceName: string;
    isActive: boolean;    
    icon?: ReactNode;     
    isSensor?: boolean;   
    onToggle?: () => void; 
    onDelete?: () => void;
}

const DeviceBox = (props: IProps) => {
    const { deviceId, deviceName, isActive, icon, isSensor = false, onToggle, onDelete } = props;
    const router = useRouter();

    const statusText = isActive ? "On" : "Off";
    const statusColor = isActive ? '#13E633' : '#CC1800';

    return (
        <View style={styles.container}>
            {/* Icon & Info */}
            <View style={styles.infor}>
                <View style={styles.device_icon}>
                    {icon ? icon : <MaterialIcons name="device-unknown" size={40} color={COLORS.buttonBackground} />}
                </View>
                <View style={styles.device_name}>
                    <Text style={styles.label} numberOfLines={1}>{deviceName}</Text>
                    
                    {/* Nút trạng thái */}
                    <TouchableOpacity
                        style={[styles.statusButton, { backgroundColor: isSensor ? '#B0BEC5' : statusColor }]}
                        disabled={isSensor} // Sensor không bấm được
                        onPress={onToggle}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.statusText}>
                            {isSensor ? "Active" : statusText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={onDelete} style={{ padding: 5 }}>
                    <MaterialIcons name="delete-outline" size={24} color="#FF4444" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push(`/device_actions/Device-infor?id=${deviceId}` as any)}>
                    <Entypo name="chevron-thin-right" size={20} color={COLORS.titleColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default DeviceBox;