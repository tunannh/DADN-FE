import { COLORS } from "@/constants/colors";
import { logsAPI } from "@/utils/api";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    data: {
        gap: 10,
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
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    body: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 5,
    },
    action: {
        fontWeight: "600",
        fontSize: 16,
        color: COLORS.titleColor
    }

})

interface IProps {
    startfilter?: Date;
    endfilter?: Date
};

const EnvData = ({ startfilter, endfilter }: IProps) => {
    const [envData, setEnvData] = useState<{
        "log_id": number,
        "event_id": number,
        "name": string,
        "description": string,
        "action": string,
        "created_at": string,
        "event_type": string,
        "occurred_at": string,
        "source": string
    }[]>([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                let params: any = {};
                if (startfilter && endfilter) {
                    params = {
                        start_time: startfilter.toISOString(),
                        end_time: getEndOfDay(endfilter).toISOString(),
                        limit: 50
                    };
                }
                const response = await logsAPI(params);
                if (response.data) {
                    setEnvData(response.data);
                }
            };
            fetchData();
        } catch (error) {
            console.error("Failed to get action history data:", error);
        }
    }, [startfilter, endfilter]);

    const getEndOfDay = (date: Date) => {
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return end;
    };

    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            {envData.length !== 0 ? (
                <>
                    {envData.map((item) => (
                        <View style={styles.data} key={item.log_id}>
                            <View style={styles.head}>
                                <Text style={{ color: "#a06704ff", fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
                                <Text style={{ color: COLORS.textColor }}>{formatDateTime(item.occurred_at)}</Text>
                            </View >
                            <View style={styles.body}>
                                <Text style={styles.action}>Message:</Text>
                                <Text style={{ fontSize: 16 }}>{item.action === "PUMP_ON" ? "Turn on the pump" : (item.action === "PUMP_OFF") ? "Turn off the pump" : item.action}</Text>
                            </View>
                        </View>
                    ))}
                </>
            ) : (
                <View><Text style={{ color: COLORS.titleColor, fontSize: 18 }}>No data available</Text></View>
            )}
        </View>
    )
}

export default EnvData;