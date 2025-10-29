import { COLORS } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 20,
        paddingTop: 40,
        gap: 15
    },
    box: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 15,
        paddingVertical: 15,
        fontSize: 14,
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: "space-between",
    },
    left: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: COLORS.titleColor,
        fontSize: 16
    },
    logout: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        position: "absolute",
        bottom: 60,
        right: 20,
        alignSelf: "center",
        width: '100%'
    },
    logout_text: {
        textAlign: "center",
        fontSize: 16,
        textDecorationLine: "underline",
        fontWeight: '600'
    }
})

const Settings = () => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.left}>
                    <MaterialCommunityIcons name="account-edit-outline" size={26} color={COLORS.titleColor} />
                    <Text style={styles.text}>Edit profile</Text>
                </View>
                <Entypo name="chevron-right" size={24} color={COLORS.titleColor} />
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <Ionicons name="language-outline" size={26} color={COLORS.titleColor} />
                    <Text style={styles.text}>Change languge</Text>
                </View>
                <Entypo name="chevron-right" size={24} color={COLORS.titleColor} />
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <MaterialIcons name="notifications-none" size={26} color={COLORS.titleColor} />
                    <Text style={styles.text}>Notifications</Text>
                </View>
                <Entypo name="chevron-right" size={24} color={COLORS.titleColor} />
            </View>
            <View style={styles.box}>
                <View style={styles.left}>
                    <AntDesign name="exclamation-circle" size={26} color={COLORS.titleColor} />
                    <Text style={styles.text}>Help</Text>
                </View>
                <Entypo name="chevron-right" size={24} color={COLORS.titleColor} />
            </View>

            <View style={styles.logout}>
                <Text style={styles.logout_text}>Logout</Text>
            </View>
        </View>
    )
}

export default Settings;