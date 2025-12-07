import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from "@/constants/colors";
import React, { ReactNode, useState } from "react";
import { router } from "expo-router";
import { useUserTokenContext } from "@/utils/userToken.context";
import { deleteDeviceAPI } from "@/utils/api";
import { useDevices } from "@/utils/devices.context";
import Toast from "react-native-root-toast";
import Fontisto from '@expo/vector-icons/Fontisto';

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
    deviceId: string;
    status: string;
    icon?: ReactNode,
    // toggle?: (value: boolean) => void;
}

const DeviceBox = (props: IProps) => {
    const { access_token } = useUserTokenContext();
    const { removeDevice } = useDevices();

    const [modalVisible, setModalVisible] = useState(false);
    const { deviceName, deviceId, status, icon } = props;
    const displayStatus: string = status ? "On" : "Off"

    const toastShow = (message: string, color: string) => {
        Toast.show(message, {
            duration: 2000,
            animation: true,
            backgroundColor: color,
            opacity: 1,
            position: -100,
        })
    }
    const handelDeleteDevice = async (access_token: string, device_id: string) => {
        try {
            const response = await deleteDeviceAPI(access_token, parseInt(device_id));
            if (response.status === 204) {
                toastShow('Delete device successfully', '#04B20C');
                removeDevice(parseInt(device_id));
            }
            else {
                toastShow('Delete device failed', '#E13F33');
            }
        } catch (error) {
            console.log("Error deleting device:", error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.infor}>
                <View style={styles.device_icon}>
                    {icon ? icon : <MaterialIcons name="device-unknown" size={50} color={COLORS.buttonBackground} />}
                </View>
                <View style={styles.device_name}>
                    <Text style={styles.label}>{deviceName}</Text>
                    <TouchableOpacity>
                        {/* style={[styles.status, { backgroundColor: status === "inactive" ? '#CC1800' : '#13E633' }]} */}
                        {/* <Text style={{ color: 'white', fontSize: 16 }}>{status === "active" ? "On" : "Off"}</Text> */}
                        {status === "active" ? (
                            <Fontisto name="toggle-on" size={45} color="#08d012ff" />
                        ) : (
                            <Fontisto name="toggle-off" size={45} color="#CC1800" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.actions}>
                <View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="delete-outline" size={22} color={COLORS.titleColor} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { router.navigate("/device_actions/Device-infor") }}>
                    <Entypo name="chevron-thin-right" size={24} color={COLORS.titleColor} />
                </TouchableOpacity>
            </View>


            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.4)"
                }}>
                    <View style={{ backgroundColor: COLORS.bgColor, padding: 20, borderRadius: 10 }}>
                        <Text style={{ marginBottom: 20, fontSize: 16 }}>This action will delete this device. Continue?</Text>

                        <View style={{ flexDirection: "row", alignSelf: "flex-end", gap: 20 }}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#A8A8A8', borderRadius: 5 }}
                                onPress={() => setModalVisible(false)}>
                                <Text style={{ color: "white" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#E32928', borderRadius: 5, opacity: 0.89 }}
                                onPress={() => { setModalVisible(false); handelDeleteDevice(access_token, deviceId); }}>
                                <Text style={{ color: "white" }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

export default DeviceBox;