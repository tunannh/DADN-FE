import { COLORS } from "@/constants/colors";
import { getLogsAPI } from "@/utils/api";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    dataEnv: {
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

type LogEvent = {
    log_id: number;
    event_id: number;
    name: string;
    description: string;
    action: string;
    created_at: string;
};

const EnvData = () => {
    const [logs, setLogs] = useState<LogEvent[]>([]);

    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getLogsAPI({ limit: 50 });
                if (response.data) {
                    setLogs(response.data);
                }
            } catch (error) {
                console.error("Failed to get logs:", error);
            }
        };
        
        // Fetch immediately
        fetchLogs();

        // Set up interval to refresh every 10 seconds
        const interval = setInterval(() => {
            fetchLogs();
        }, 10000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {logs.length !== 0 ? (
                <>
                    {logs.map((item) => (
                        <View style={styles.dataEnv} key={item.log_id}>
                            <View style={styles.label_value}>
                                <Text style={styles.label}>Action: </Text>
                                <Text style={styles.value}>{item.action}</Text>
                            </View>
                            <View style={styles.label_value}>
                                <Text style={styles.label}>Event: </Text>
                                <Text style={styles.value}>{item.name}</Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 14, color: COLORS.textColor }}>
                                    {item.description}
                                </Text>
                            </View>
                            <Text style={styles.date}>{formatDateTime(item.created_at)}</Text>
                        </View>
                    ))}
                </>
            ) : (
                <View><Text style={{ color: COLORS.titleColor, fontSize: 16 }}>No data available</Text></View>
            )}
        </View>
    )
}

export default EnvData;