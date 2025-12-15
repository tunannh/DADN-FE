import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native"
import { useLocalSearchParams } from "expo-router";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 20,
        paddingVertical: 30,
        flex: 1,
        gap: 30
    },
    input_group: {
        gap: 10
    },
    label: {
        fontSize: 18,
        color: COLORS.titleColor,
        fontWeight: '600'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 15,
        gap: 20
    }
})
const DeviceInfor = () => {
    const [isFocus, setIsForcus] = useState<boolean>(false);
    const { device_name, device_type, model, feed_key } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            {/* <View style={styles.input}> */}
            <View style={styles.input_group}>
                <Text style={styles.label}>Name</Text>
                <TextInput style={[styles.input, { borderColor: isFocus ? COLORS.primary : COLORS.borderColor }]}
                    onFocus={() => setIsForcus(true)}
                    onBlur={() => setIsForcus(false)}
                    editable={false}
                    value={device_name as string}
                />
            </View>
            <View style={styles.input_group}>
                <Text style={styles.label}>Type</Text>
                <TextInput style={[styles.input, { borderColor: isFocus ? COLORS.primary : COLORS.borderColor }]}
                    onFocus={() => setIsForcus(true)}
                    onBlur={() => setIsForcus(false)}
                    editable={false}
                    value={device_type as string}
                />
            </View>
            <View style={styles.input_group}>
                <Text style={styles.label}>Modal</Text>
                <TextInput style={[styles.input, { borderColor: isFocus ? COLORS.primary : COLORS.borderColor }]}
                    onFocus={() => setIsForcus(true)}
                    onBlur={() => setIsForcus(false)}
                    editable={false}
                    value={model ? model as string : "Undefined"}
                />
            </View>
            <View style={styles.input_group}>
                <Text style={styles.label}>Feed key</Text>
                <TextInput style={[styles.input, { borderColor: isFocus ? COLORS.primary : COLORS.borderColor }]}
                    onFocus={() => setIsForcus(true)}
                    onBlur={() => setIsForcus(false)}
                    editable={false}
                    value={feed_key ? feed_key as string : "Undefined"}
                />
            </View>
            {/* </View> */}
        </View>
    )
};

export default DeviceInfor;