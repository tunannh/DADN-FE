import Input from "@/components/input";
import { COLORS } from "@/constants/colors";
import { useDeviceStore } from "@/store/device-store";
import { createDeviceAPI } from "@/utils/api";
import { useDevices } from "@/utils/devices.context";
import { useUserTokenContext } from "@/utils/userToken.context";
import { router, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-root-toast";


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1
    },
    label: {
        fontSize: 18,
        color: COLORS.titleColor,
        fontWeight: '600',
        marginBottom: 10
    },
    typewrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typeelem: { width: '48%' },
    dropdown: {
        // height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        // color: COLORS.textColor,
        borderColor: COLORS.borderColor,
    },
    input: {
        gap: 20
    },
    btn_add: {
        backgroundColor: COLORS.buttonBackground,
        padding: 15,
        borderRadius: 30,
        marginTop: 30,
    },
    add: {
        color: 'white',
        textAlign: "center",
        fontSize: 16
    }
})
const AddDevice = () => {
    const { addDevice } = useDevices();
    const { access_token } = useUserTokenContext();
    const [deviceName, setDeviceName] = useState<"sensor" | "actuator" | "">("");
    const [sensorType, setSensorType] = useState<"soil_moisture" | "temperature" | "humidity" | "">("");
    const [actuatorType, setActuatorType] = useState<"pump" | "relay" | "lcd" | "">("");
    const [modal, setModal] = useState<string>("");
    const [feedKey, setFeedKey] = useState<string>("");

    const [deviceType, setDeviceType] = useState<any>("");
    const deviceTypes = [
        { label: "Sensor", value: "sensor" },
        { label: "Actuator", value: "actuator" },
    ];
    const sensorTypes = [
        { label: "Soil moisture", value: "soil_moisture" },
        { label: "Temperature", value: "temperature" },
        { label: "Humidity", value: "humidity" },
    ];
    const actuatorTypes = [
        { label: "Pump", value: "pump" },
        { label: "Relay", value: "relay" },
        { label: "LCD", value: "lcd" },
    ];

    const toastShow = (message: string, color: string) => {
        Toast.show(message, {
            duration: 2000,
            animation: true,
            backgroundColor: color,
            opacity: 1,
            position: -100,
        })
    }
    const handleAddDevice = async () => {
        if (deviceName.trim() === "") {
            toastShow('Please enter device name', '#ECB90D');
            return;
        }
        if (deviceType === "") {
            toastShow('Please select device type', '#ECB90D');
            return;
        }
        if (deviceType === "sensor" && sensorType === "") {
            toastShow('Please select sensor type', '#ECB90D');
            return;
        }
        if (deviceType === "actuator" && actuatorType === "") {
            toastShow('Please select actuator type', '#ECB90D');
            return;
        }
        try {
            const response = await createDeviceAPI(access_token, deviceName,
                deviceType,
                sensorType ? sensorType : null,
                actuatorType ? actuatorType : null,
                modal ? modal : null,
                "inactive",
                feedKey ? feedKey : null,
                1);

            if (response.data) { // response.status === 200
                addDevice(response.data);
                toastShow('Add device successfully', '#04B20C');
                setTimeout(() => {
                    router.back();
                }, 1000);
            }
            else {
                console.log('Add Device failed:', response);
                toastShow('Add device failed', '#E13F33');
            }
        } catch (error) {
            console.error('Registration Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Input
                    placeholder="Enter device name"
                    label="Device name"
                    value={deviceName}
                    setValue={setDeviceName}
                />
                <View style={styles.typewrapper}>
                    <View style={styles.typeelem}>
                        <Text style={styles.label}>Device Type</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={{ color: COLORS.textColor, fontSize: 15 }}
                            containerStyle={{ backgroundColor: COLORS.bgColor, borderRadius: 5 }}
                            selectedTextStyle={{ fontSize: 15 }}
                            activeColor={COLORS.border}
                            data={deviceTypes}
                            labelField="label"
                            valueField="value"
                            placeholder="Select device type"
                            value={deviceType}
                            onChange={(item) => setDeviceType(item.value)}
                        />
                    </View>
                    {deviceType ? (
                        deviceType === "sensor" ? (
                            <View style={styles.typeelem}>
                                <Text style={styles.label}>Sensor Type</Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={{ color: COLORS.textColor, fontSize: 15 }}
                                    containerStyle={{ backgroundColor: COLORS.bgColor, borderRadius: 5 }}
                                    selectedTextStyle={{ fontSize: 15 }}
                                    activeColor={COLORS.border}
                                    data={sensorTypes}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select sensor type"
                                    value={sensorType}
                                    onChange={(item) => setSensorType(item.value)}
                                />
                            </View>
                        ) : (
                            <View style={styles.typeelem}>
                                <Text style={styles.label}>Actuator Type</Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={{ color: COLORS.textColor, fontSize: 15 }}
                                    containerStyle={{ backgroundColor: COLORS.bgColor, borderRadius: 5 }}
                                    selectedTextStyle={{ fontSize: 15 }}
                                    activeColor={COLORS.border}
                                    data={actuatorTypes}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select actuator type"
                                    value={actuatorType}
                                    onChange={(item) => setActuatorType(item.value)}
                                />
                            </View>
                        )
                    ) : (
                        <View></View>
                    )}
                </View>
                <Input
                    placeholder="Enter modal"
                    label="Modal"
                    value={modal}
                    setValue={setModal}
                />
                <Input
                    placeholder="Enter feed key"
                    label="Feed Key"
                    value={feedKey}
                    setValue={setFeedKey}
                />
            </View>

            <TouchableOpacity
                style={styles.btn_add}
                onPress={handleAddDevice}
            >
                <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
        </View>

    )
};

export default AddDevice;