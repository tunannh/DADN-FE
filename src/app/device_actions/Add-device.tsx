import Input from "@/components/input";
import { COLORS } from "@/constants/colors";
import { createDeviceAPI } from "@/utils/api";
import { useDevices } from "@/utils/devices.context";
import { router } from "expo-router";
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
    const [deviceName, setDeviceName] = useState<string>("");
    const [sensorType, setSensorType] = useState<"soil_moisture" | "temperature" | "humidity" | null>(null);
    const [actuatorType, setActuatorType] = useState<"pump" | "relay" | "lcd" | null>(null);
    const [modal, setModal] = useState<string>("");
    const [feedKey, setFeedKey] = useState<string>("");

    const [deviceType, setDeviceType] = useState<"sensor" | "actuator" | "">("")
    // const deviceTypes = [
    //     { label: "Sensor", value: "sensor" },
    //     { label: "Actuator", value: "actuator" },
    // ];
    // const sensorTypes = [
    //     { label: "Soil moisture", value: "soil_moisture" },
    //     { label: "Temperature", value: "temperature" },
    //     { label: "Humidity", value: "humidity" },
    // ];
    const actuatorTypes = [
        { label: "Pump", value: "pump" },
        { label: "Relay", value: "relay" },
        { label: "LCD", value: "lcd" },
    ];

    const toastShow = (message: string, color: string) => {
        Toast.show(message, {
            duration: 2800,
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
        if (!actuatorType) {
            toastShow('Please select actuator type', '#ECB90D');
            return;
        }
        try {
            const response = await createDeviceAPI(
                deviceName,
                "actuator",
                null,
                actuatorType,
                modal ? modal : null,
                feedKey ? feedKey : null);

            if (response.data) { // response.status === 200
                addDevice(response.data);
                toastShow('Add device successfully', '#04B20C');
                setTimeout(() => {
                    router.back();
                }, 500);
            }
            else {
                toastShow(`Add device failed${response.detail ? `: ${response.detail}` : ''}`, '#E13F33');
            }
        } catch (error) {
            console.error('Add device Error:', error);
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