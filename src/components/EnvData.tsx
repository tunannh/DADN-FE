import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    dataEnv: {
        // gap: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: COLORS.titleColor,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    date: {
        color: COLORS.textColor,
        alignSelf: "flex-end"
    },
    label_value: {
        flexDirection: "row",
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.titleColor
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.titleColor
    }
})

const EnvData = () => {
    const [envData, setEnvData] = useState<{
        id: number;
        soilMoisure: number;
        temperature: number;
        humidity: number;
        pumbStatus: string;
        date: string;
        time: string;
    }[]>
        ([{
            id: 100,
            soilMoisure: 25,
            temperature: 28,
            humidity: 40,
            pumbStatus: "On",
            date: "15/10/2025",
            time: "09:35:12",
        }, {
            id: 101,
            soilMoisure: 25,
            temperature: 28,
            humidity: 40,
            pumbStatus: "On",
            date: "15/10/2025",
            time: "09:35:12",
        },
        {
            id: 102,
            soilMoisure: 25,
            temperature: 28,
            humidity: 40,
            pumbStatus: "On",
            date: "15/10/2025",
            time: "09:35:12",
        },
        ]);
    return (
        <View style={styles.container}>
            {envData.length !== 0 ? (
                <>
                    {envData.map((item) => (
                        <View style={styles.dataEnv} key={item.id}>
                            <View style={styles.label_value}>
                                <Text style={styles.label}>Soil moisure: </Text>
                                <Text style={styles.value}>{item.soilMoisure}%</Text>
                            </View>
                            <View style={styles.label_value}>
                                <Text style={styles.label}>Temperature: </Text>
                                <Text style={styles.value}>{item.temperature}°C </Text>
                            </View>
                            <View style={styles.label_value}>
                                <Text style={styles.label}>Humidity: </Text>
                                <Text style={styles.value}>{item.humidity}%</Text>
                            </View>
                            <View style={styles.label_value}>
                                <Text style={styles.label}>Pump status: </Text>
                                <Text style={styles.value}>{item.pumbStatus}</Text>
                            </View>
                            <Text style={styles.date}>{item.date} {item.time}</Text>
                        </View>
                    ))}
                </>
            ) : (
                <View><Text style={{ color: COLORS.text, fontSize: 16 }}>No data available</Text></View>
            )}
        </View>
    )
}

export default EnvData;