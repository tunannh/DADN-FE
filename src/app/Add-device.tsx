import Input from "@/components/input";
import { COLORS } from "@/constants/colors";
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
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <Input
                    label="Name"
                    value={"abc"}
                />
                <Input
                    label="Type"
                    value={"abc"}
                />
                <Input
                    label="Location"
                    value={"Location"}
                />
                <Input
                    label="Instainstallation date"
                    value={"Installation date"}
                />
            </View>

            <TouchableOpacity style={styles.btn_add}>
                <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
        </View>

    )
};

export default AddDevice;