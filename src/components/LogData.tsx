import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    data: {
        gap: 5,
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
        flexWrap: 'wrap',
    }
})

const LogData = () => {
    const [logData, setLogData] = useState<{
        id: number;
        actor: string;
        action: string;
        date: string;
        time: string;
    }[]>
        ([{
            id: 1,
            actor: 'Alison Becker',
            action: 'Set threshold: Soil moisure < 30%',
            date: '10/10/2025',
            time: '07:14:22'

        }, {
            id: 2,
            actor: 'Brunet Hapatric',
            action: 'Turn off the light',
            date: '15/10/2025',
            time: '07:14:22'
        }, {
            id: 3,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        },
        {
            id: 4,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 5,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 6,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 7,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 8,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 9,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 10,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 11,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 12,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }, {
            id: 13,
            actor: 'Andrew Nathan',
            action: 'Add new device',
            date: '18/10/2025',
            time: '07:14:22'
        }]);
    return (
        <View style={styles.container}>
            {logData.length !== 0 ? (
                <>
                    {logData.map((item) => (
                        <View style={styles.data} key={item.id}>
                            <View style={styles.head}>
                                <Text style={{ color: COLORS.titleColor, fontWeight: 'bold', fontSize: 18 }}>{item.actor}</Text>
                                <Text style={{ color: COLORS.textColor }}>{item.date} {item.time}</Text>
                            </View >
                            <View style={styles.body}>
                                <Text style={{ color: '#1A2530', fontWeight: '800', fontSize: 16 }}>Action: </Text>
                                <Text style={{ fontSize: 16, flexShrink: 1 }}>{item.action}</Text>
                            </View>
                        </View>
                    ))}
                </>
            ) : (
                <View><Text style={{ color: COLORS.text, fontSize: 16 }}>No data available</Text></View>
            )}
        </View>
    )
}

export default LogData;