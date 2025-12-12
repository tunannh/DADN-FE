import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from "@/constants/colors";
import Input from "@/components/input";
import { useDeviceDetailController } from '@/controllers/useDeviceDetailController';

const DeviceInfor = () => {
    const { device, handleBack } = useDeviceDetailController();

    if (!device) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Ionicons name="alert-circle-outline" size={50} color={COLORS.titleColor} />
                <Text style={styles.notFoundText}>Device not found!</Text>
                <TouchableOpacity style={styles.btnBack} onPress={handleBack}>
                    <Text style={styles.btnText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgColor }}>
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.titleColor} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Device Information</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.inputContainer}>
                        
                        {/* 1. Device Name */}
                        <View style={styles.readOnlyWrapper}>
                            <Input
                                label="Device Name"
                                value={device.name}
                                setValue={() => {}} // <--- THÊM DÒNG NÀY (Hàm rỗng)
                            />
                        </View>

                        {/* 2. Device Type */}
                        <View style={styles.readOnlyWrapper}>
                            <Input
                                label="Type"
                                value={device.device_type.toUpperCase()}
                                setValue={() => {}} // <--- THÊM DÒNG NÀY
                            />
                        </View>

                        {/* 3. Feed Key */}
                        <View style={styles.readOnlyWrapper}>
                            <Input
                                label="Feed Key"
                                value={device.feed_key}
                                setValue={() => {}} // <--- THÊM DÒNG NÀY
                            />
                        </View>

                        {/* 4. Status */}
                        <View style={styles.readOnlyWrapper}>
                            <Input
                                label="Status"
                                value={device.status.toUpperCase()}
                                setValue={() => {}} // <--- THÊM DÒNG NÀY
                            />
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
        gap: 10
    },
    notFoundText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    backButton: {
        marginRight: 15,
        padding: 5
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.titleColor
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    inputContainer: {
        gap: 20
    },
    // Style này ngăn không cho người dùng bấm vào input
    readOnlyWrapper: {
        opacity: 0.9,
        pointerEvents: 'none' 
    },
    btnBack: {
        backgroundColor: COLORS.buttonBackground,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default DeviceInfor;