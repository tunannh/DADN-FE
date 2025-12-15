import { COLORS } from "@/constants/colors";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [modalVisible, setModalVisible] = useState(false);
    const logout = async () => {
        await AsyncStorage.removeItem('access_token');
    };
    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/SignIn");
    };
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

            <TouchableOpacity style={styles.logout} onPress={() => setModalVisible(true)}>
                <Text style={styles.logout_text}>Logout</Text>
            </TouchableOpacity>

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
                    <View style={{ backgroundColor: COLORS.bgColor, padding: 20, borderRadius: 10, width: "70%" }}>
                        <Text style={{ marginBottom: 20, fontSize: 16 }}>Are you sure you want to log out?</Text>

                        <View style={{ flexDirection: "row", alignSelf: "flex-end", gap: 20 }}>
                            <TouchableOpacity
                                style={{ width: 70, alignItems: "center", paddingVertical: 8, backgroundColor: '#A8A8A8', borderRadius: 5 }}
                                onPress={() => setModalVisible(false)}>
                                <Text style={{ color: "white" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: 70, alignItems: "center", paddingVertical: 8, backgroundColor: COLORS.primary, borderRadius: 5, opacity: 0.89 }}
                                onPress={() => { setModalVisible(false); handleLogout(); }}>
                                <Text style={{ color: "white" }}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Settings;