import Input from "@/components/input";
import { COLORS } from "@/constants/colors";
import { useDeviceStore } from "@/store/device-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1
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
    const [deviceName, setDeviceName] = useState<string>("");
    const [deviceType, setDeviceType] = useState<string>("");
    const [deviceLocation, setDeviceLocation] = useState<string>("");
    const [installationDate, setInstallationDate] = useState<string>("");

    const router = useRouter();
    const { addDevice } = useDeviceStore();
    const handleAddDevice = () => {
        if (deviceName.trim() === "") {
            alert("Please enter device name");
            return;
        }
        addDevice(deviceName);
        router.back()
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Input
                    placeholder="Enter device name"
                    label="Name"
                    value={deviceName}
                    setValue={setDeviceName}
                />
                <Input
                    placeholder="Enter device type"
                    label="Type"
                    value={deviceType}
                    setValue={setDeviceType}
                />
                <Input
                    placeholder="Enter device location"
                    label="Location"
                    value={deviceLocation}
                    setValue={setDeviceLocation}
                />
                <Input
                    placeholder="Enter installation date"
                    label={"Installation date"}
                    value={installationDate}
                    setValue={setInstallationDate}
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