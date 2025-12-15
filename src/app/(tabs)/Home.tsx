import { homeStyles } from '@/assets/styles/home.style';
import { COLORS } from '@/constants/colors';
import { autoStatus, changeAutoStatus, sensorDataAPI } from '@/utils/api';
import { useAutoStatus } from '@/utils/useAutoStatus.context';
import { Feather, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-root-toast';

const Home = () => {
  const toastShow = (message: string, color: string) => {
    Toast.show(message, {
      duration: 2000,
      animation: true,
      backgroundColor: color,
      opacity: 1,
      position: -82
    })
  }
  const [sensorData, setSensorData] = useState<any>(null);
  const { enabled, set_enabled } = useAutoStatus();

  useEffect(() => {
    // Fetch sensor data from API when component mounts
    try {
      const getSensorData = async () => {
        const response = await sensorDataAPI();
        setSensorData(response.data);
      }
      const getAutoStatus = async () => {
        const response = await autoStatus();
        set_enabled(response.data.enabled);
      }
      getSensorData();
      getAutoStatus();
    } catch (error) {
      console.error('Login Error:', error);
    }
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
          <Text style={homeStyles.tempText}>23°C</Text>
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
            <Ionicons name="thermometer-outline" size={50} color="red" />
            <Text style={homeStyles.infoValue}>{sensorData?.temperature?.value ? `${sensorData.temperature.value}°C` : 'N/A'}</Text>
            <Text style={homeStyles.infoLabel}>Temperature</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <Feather name="wind" size={50} color="#00AEEF" />
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
              color={COLORS.pump_color}
            />

            {/* View riêng cho Switch */}
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
                      toastShow(`Pump turned ${response.data.enabled ? 'on' : 'off'}`, response.data.enabled ? '#04B20C' : '#e19833ff');
                    }
                    else {
                      toastShow('Failed to change auto mode', '#E13F33');
                    }
                  } catch (error) {
                    console.error("Error toggling auto status:", error);
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

            <Text style={homeStyles.infoLabel}>Pump status</Text>
          </View>
        </View>
      </ScrollView >
    </View >
  );
};

export default Home;
