// import { APP_COLOR } from "constanst/colorTheme";
import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
    btnContainer: {
        // backgroundColor: '#e0e0e0',
        // backgroundColor: 'orange',
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
})

interface IProps {
    title: string,
    onPress: () => void,

    textStyle?: StyleProp<TextStyle>,
    pressStyle?: StyleProp<ViewStyle>,
    btnStyle?: StyleProp<ViewStyle>,
    icon?: ReactNode
}

const ShareButton = (props: IProps) => {
    const { title, onPress, textStyle, pressStyle, btnStyle, icon } = props;

    return (
        <Pressable
            style={({ pressed }) => ([{
                opacity: pressed === true ? 0.5 : 1,
            }, pressStyle])}
            onPress={onPress}
        >
            <View style={[styles.btnContainer, btnStyle]}>
                {icon}
                <Text style={textStyle}>{title}</Text>
            </View>
        </Pressable>
    )
};

export default ShareButton;