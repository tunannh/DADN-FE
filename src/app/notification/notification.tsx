import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { notificationAPI } from '@/utils/api';

const Notification = () => {
    const [notification, setNotification] = useState<{
        "event_id": number,
        "message": string,
        "timestamp": string
    }[]>([])

    useEffect(() => {
        const fetchNotification = async () => {
            const response = await notificationAPI();
            if (response.data) {
                console.log(response.data)
                setNotification(response.data)
            }
        }
        try {
            fetchNotification()
        } catch (error) {
            console.error("Failed to fetch notification", error)
        }
    }, [])
    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };
    return (
        <ScrollView style={styles.container}>
            {notification.length !== 0 ?
                (
                    notification.map((item) => (
                        <View style={styles.card} key={item.event_id}>
                            <Text style={styles.time}>{formatDateTime(item.timestamp)}</Text>
                            <Text style={{ textAlign: "justify" }}>{item.message}</Text>
                        </View>
                    ))
                ) : (
                    <View>
                        <Text>You have no notifications.</Text>
                    </View>
                )
            }
        </ScrollView>
    );
};

export default Notification;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 50,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20
    },
    time: {
        color: COLORS.textColor,
        fontSize: 12,
        position: "absolute",
        top: 2,
        left: 265
    }
});
