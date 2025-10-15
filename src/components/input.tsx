import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { COLORS } from "@/constants/colors";

const styles = StyleSheet.create({
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
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 14,
        color: COLORS.textColor
    },
    eye: {
        position: 'absolute',
        right: 5,
        top: 13,
        fontSize: 18,
        color: "black"
    }
})

interface IProps {
    label?: string;
    keyboardType?: KeyboardTypeOptions;
    isPassword?: boolean;
    value: any;
    setValue?: (v: any) => void;
}
const Input = (props: IProps) => {
    const [isFocus, setIsForcus] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { label, keyboardType, isPassword = false,
        value, setValue
    } = props;
    return (
        <View style={styles.input_group}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View>
                <TextInput style={[styles.input, { borderColor: isFocus ? 'orange' : COLORS.borderColor }]} keyboardType={keyboardType}
                    onFocus={() => setIsForcus(true)}
                    onBlur={() => setIsForcus(false)}
                    secureTextEntry={(isPassword && showPassword) ? true : false}
                    value={value}
                // onChangeText={(text) => setValue(text)}
                />
                {isPassword && isFocus && <Feather
                    style={styles.eye}
                    name={showPassword ? "eye-off" : "eye"}
                    onPress={() => { setShowPassword(!showPassword) }} />}
            </View>
        </View>
    )
}

export default Input;