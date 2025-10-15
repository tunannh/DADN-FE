import Input from "@/components/input";
import { COLORS } from "@/constants/colors";
import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1
    },
    input: {
        gap: 20
    }
})
const DeviceInfor = () => {
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
            </View>
        </View>
    )
};

export default DeviceInfor;