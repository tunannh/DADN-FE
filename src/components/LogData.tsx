import { COLORS } from "@/constants/colors";
import { wateringHistoryAPI } from "@/utils/api";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        gap: 15,
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
        justifyContent: 'space-between'
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    watertime: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    time: {
        backgroundColor: '#F0F4F7',
        borderRadius: 8,
        paddingVertical: 8,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#D1D9E2',
        width: 80,
        alignItems: 'center',
    }
})

interface IProps {
    startfilter?: Date;
    endfilter?: Date;
}

const LogData = (props: IProps) => {
    const { startfilter, endfilter } = props;
    type data = {
        session_id: number;
        actuator_id?: number;
        start_time: string;
        end_time: string;
        duration?: {
            hours: number;
            minutes: number;
        };
        date?: string;
    };
    const [logData, setLogData] = useState<data[]>([]);

    const formatTime = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0"); // Thêm 0 nếu < 10

        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12; // Chuyển 0 thành 12

        return `${hours}:${minutes} ${ampm}`;
    };
    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const parseWateringSession = (item: data) => {
        const start = new Date(item.start_time);
        const end = new Date(item.end_time);

        // const day = start.getDate();
        // const month = start.getMonth() + 1;
        // const year = start.getFullYear();

        const startTime = formatTime(start);
        const endTime = formatTime(end);

        const diffMs = end.getTime() - start.getTime();
        const totalMinutes = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(totalMinutes / 60);
        const diffMinutes = totalMinutes % 60;

        return {
            session_id: item.session_id,
            date: formatDate(start),
            start_time: startTime,
            end_time: endTime,
            duration: {
                hours: diffHours,
                minutes: diffMinutes
            }
        };
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await wateringHistoryAPI();
                if (response.data) {
                    setLogData(response.data.map(parseWateringSession));
                }
            };
            fetchData();
        } catch (error) {
            console.error("Failed to get watering history data:", error);
        }
    }, []);

    const normalizeDate = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };
    const parseDateString = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
    };
    const filteredData = logData.filter((item) => {
        if (!startfilter || !endfilter) return true;

        // const itemDate = parseDateString(item.date!);
        const itemDate = normalizeDate(parseDateString(item.date!));
        const start = normalizeDate(startfilter);
        const end = normalizeDate(endfilter);

        return itemDate >= start && itemDate <= end;

        // return itemDate >= startfilter && itemDate <= endfilter;
    });

    return (
        <View style={styles.container}>
            {filteredData.length !== 0 ? (
                <>
                    {filteredData.map((item) => (
                        <View style={styles.data} key={item.session_id}>
                            <View style={styles.head}>
                                <Text style={{ color: "#a06704ff", fontWeight: 'bold', fontSize: 16 }}>{item.duration?.hours} hour {item.duration?.minutes} minutes</Text>
                                <Text style={{ color: COLORS.textColor }}>{item.date}</Text>
                            </View >
                            <View style={styles.body}>
                                <View style={styles.watertime}>
                                    <Text style={{ color: '#1A2530', fontWeight: '800', fontSize: 16 }}>Start at: </Text>
                                    <View style={styles.time}><Text style={{ fontSize: 16 }}>{item.start_time}</Text></View>
                                </View>
                                <View style={styles.watertime}>
                                    <Text style={{ color: '#1A2530', fontWeight: '800', fontSize: 16 }}>  End at: </Text>
                                    <View style={styles.time}><Text style={{ fontSize: 16 }}>{item.end_time}</Text></View>
                                </View>
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

export default LogData;