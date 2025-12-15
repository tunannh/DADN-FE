import { homeStyles } from '@/assets/styles/home.style';
import { COLORS } from '@/constants/colors';
import { autoStatus, changeAutoStatus, sensorDataAPI, controlPumpAPI, getPumpStateAPI, getNotificationsAPI, cleanupTestNotificationsAPI } from '@/utils/api';
import { useAutoStatus } from '@/utils/useAutoStatus.context';
import { Feather, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => {
  const [sensorData, setSensorData] = useState<any>(null);
  const { enabled, set_enabled } = useAutoStatus();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pumpState, setPumpState] = useState<"on" | "off">("off");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [lastShownNotificationId, setLastShownNotificationId] = useState<number | null>(null);
  const [tempAlert, setTempAlert] = useState(false);
  const [humidityAlert, setHumidityAlert] = useState(false);

  // Clean up test notifications on first load
  useEffect(() => {
    const cleanup = async () => {
      try {
        const response = await cleanupTestNotificationsAPI();
        console.log('Cleaned up test notifications:', response.data);
      } catch (error) {
        console.error('Error cleaning up test notifications:', error);
      }
    };
    cleanup();
  }, []);

  const fetchSensorData = async () => {
    try {
      const [sensorResponse, statusResponse, pumpResponse, notifResponse] = await Promise.all([
        sensorDataAPI(),
        autoStatus(),
        getPumpStateAPI(),
        getNotificationsAPI(50), // Increased limit to get past test notifications
      ]);
      setSensorData(sensorResponse.data);
      set_enabled(statusResponse.data.enabled);
      setPumpState(pumpResponse.data.state);

      console.log('=== NOTIFICATION DEBUG ===');
      console.log('Raw notifications:', notifResponse.data);
      console.log('Notifications count:', notifResponse.data?.length || 0);

      if (notifResponse.data && notifResponse.data.length > 0) {
        console.log('First 3 notifications:');
        notifResponse.data.slice(0, 3).forEach((n: any, i: number) => {
          console.log(`  [${i}] event_id=${n.event_id}, message="${n.message}"`);
        });
      }

      // Filter out test notifications completely
      const realNotifications = (notifResponse.data || []).filter(
        (notif: any) => !notif.message.includes('Test notification')
      );

      // Keep only recent notifications (last 10s) to avoid stale alerts after threshold changes
      const recentNotifications = realNotifications.filter((notif: any) => {
        const ts = new Date(notif.timestamp).getTime();
        return Date.now() - ts <= 10_000; // 10 seconds
      });

      console.log('Real notifications after filter:', realNotifications);
      console.log('Real notifications count:', realNotifications.length);
      console.log('Recent notifications (<=60s) count:', recentNotifications.length);
      console.log('Last shown notification ID:', lastShownNotificationId);

      // Detect per-sensor alerts
      const hasTempAlert = recentNotifications.some((n: any) => n.message.includes('temperature'));
      const hasHumidityAlert = recentNotifications.some((n: any) => n.message.includes('humidity'));
      setTempAlert(hasTempAlert);
      setHumidityAlert(hasHumidityAlert);

      // Show alert for new real sensor notifications only (recent ones)
      if (recentNotifications.length > 0) {
        const latestNotif = recentNotifications[0];
        console.log('Latest notification:', latestNotif);
        console.log('Latest notification event_id:', latestNotif.event_id);
        console.log('Should show alert?', lastShownNotificationId !== latestNotif.event_id);

        // Only show if this is a new notification we haven't shown yet
        if (lastShownNotificationId !== latestNotif.event_id) {
          console.log('SHOWING ALERT for notification:', latestNotif.message);
          setLastShownNotificationId(latestNotif.event_id);

          // Parse the message to make it more user-friendly
          let alertTitle = '⚠️ Sensor Alert';
          let alertMessage = latestNotif.message;

          if (alertMessage.includes('temperature')) {
            alertTitle = '🌡️ Temperature Alert';
          } else if (alertMessage.includes('humidity')) {
            alertTitle = '💧 Humidity Alert';
          }

          Alert.alert(
            alertTitle,
            alertMessage,
            [{ text: 'OK', onPress: () => console.log('Alert dismissed') }],
            { cancelable: true }
          );
        } else {
          console.log('SKIPPING ALERT - already shown this notification');
        }
      } else {
        console.log('NO NOTIFICATIONS to show alert for');
      }
      console.log('=== END NOTIFICATION DEBUG ===');

      // Only set recent real notifications (filter out test and old ones)
      setNotifications(recentNotifications);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      console.error('Notifications fetch error:', error);
    }
  };

  const handlePumpControl = async (action: "pump_on" | "pump_off") => {
    try {
      const response = await controlPumpAPI(action);
      if (response.data) {
        setPumpState(response.data.state);
        Alert.alert('Success', `Pump turned ${action === 'pump_on' ? 'ON' : 'OFF'}`);
      } else {
        Alert.alert('Error', 'Failed to control pump');
      }
    } catch (error) {
      console.error('Error controlling pump:', error);
      Alert.alert('Error', 'Unable to control pump');
    }
  };

  useEffect(() => {
    // Fetch sensor data immediately on mount
    fetchSensorData();

    // Set up interval to refresh every 1 second (faster notifications)
    const interval = setInterval(() => {
      fetchSensorData();
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={homeStyles.container}>
      <ImageBackground
        source={require('@/assets/images/bg-farm.jpg')}
        style={homeStyles.imgBackground}
        imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
      >
        {/* Top Icons */}
        <View style={homeStyles.topIcon}>
          <TouchableOpacity style={homeStyles.iconCircle} onPress={() => router.navigate('/setting/setting')}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={homeStyles.locationContainer}>
          <Ionicons name="location-sharp" size={26} color="red" />
          <Text style={homeStyles.locationText}>Default location</Text>
        </View>
      </ImageBackground>

      {/* Weather Card */}
      <View style={homeStyles.weatherCard}>
        <View>
          <Text style={homeStyles.tempText}>{sensorData?.temperature?.value ? `${sensorData.temperature.value}°C` : 'N/A'}</Text>
          <Text style={homeStyles.cityText}>Default location</Text>
        </View>
        <Image
          source={require('@/assets/images/RainThunder.png')}
          style={{ width: 70, height: 70 }}
        />
      </View>

      {/* Info Grid */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={homeStyles.infoGrid}>
          <View style={homeStyles.infoCard}>
            <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
              {tempAlert && (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: 10,
                    backgroundColor: '#FFC107',
                    borderRadius: 50,
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>!</Text>
                </View>
              )}
              <Ionicons name="thermometer-outline" size={50} color="red" />
            </View>
            <Text style={homeStyles.infoValue}>{sensorData?.temperature?.value ? `${sensorData.temperature.value}°C` : 'N/A'}</Text>
            <Text style={homeStyles.infoLabel}>Temperature</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
              {humidityAlert && (
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: 10,
                    backgroundColor: '#FFC107',
                    borderRadius: 50,
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>!</Text>
                </View>
              )}
              <Feather name="wind" size={50} color="#00AEEF" />
            </View>
            <Text style={homeStyles.infoValue}>{sensorData?.humidity?.value ? `${sensorData.humidity.value}%` : 'N/A'}</Text>
            <Text style={homeStyles.infoLabel}>Air humidity</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <Ionicons name="water-outline" size={50} color="green" />
            <Text style={homeStyles.infoValue}>{sensorData?.soil_moisture?.value ? `${sensorData.soil_moisture.value}%` : 'N/A'}</Text>
            <Text style={homeStyles.infoLabel}>Soil moisture</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <MaterialCommunityIcons
              name="water-pump"
              size={50}
              color={pumpState === "on" ? "#08d012ff" : COLORS.pump_color}
            />

            {/* Manual Pump Control Buttons */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePumpControl("pump_on")}
                style={{
                  backgroundColor: '#08d012ff',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>ON</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handlePumpControl("pump_off")}
                style={{
                  backgroundColor: '#CC1800',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>OFF</Text>
              </TouchableOpacity>
            </View>

            <Text style={homeStyles.infoLabel}>
              Pump: {pumpState.toUpperCase()}
            </Text>
          </View>

          <View style={homeStyles.infoCard}>
            <MaterialCommunityIcons
              name="robot"
              size={50}
              color={COLORS.pump_color}
            />

            {/* Auto Mode Toggle */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}

            >
              <TouchableOpacity
                onPress={async () => {
                  try {
                    // Call API to toggle auto status
                    const response = await changeAutoStatus(!enabled);
                    if (response.data) {
                      set_enabled(response.data.enabled);
                      Alert.alert(
                        'Success',
                        `Automation turned ${response.data.enabled ? 'on' : 'off'}`,
                      );
                    }
                    else {
                      Alert.alert('Error', 'Failed to change automation mode');
                    }
                  } catch (error) {
                    console.error("Error toggling auto status:", error);
                    Alert.alert('Error', 'Unable to change automation mode');
                  }
                }}
              >
                {enabled === true ? (
                  <Fontisto name="toggle-on" size={38} color="#08d012ff" />
                ) : (
                  <Fontisto name="toggle-off" size={38} color="#CC1800" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={homeStyles.infoLabel}>Auto Mode</Text>
          </View>
        </View>
      </ScrollView >
    </View >
  );
};

export default Home;
