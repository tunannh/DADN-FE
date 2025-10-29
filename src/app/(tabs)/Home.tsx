import { homeStyles } from '@/assets/styles/home.style';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <View style={homeStyles.container}>
      <ImageBackground
        source={require('@/assets/images/bg-farm.jpg')}
        style={homeStyles.imgBackground}
        imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
      >
        {/* Top Icons */}
        <View style={homeStyles.topIcon}>
          <TouchableOpacity style={homeStyles.iconCircle}>
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.iconCircle}
            onPress={() => router.navigate('/manage_user/ManageUser')}
          >
            {/* <Feather name="bell" size={24} color="black" /> */}
            <Feather name="users" size={24} color="black" />
            {/* <View style={homeStyles.redDot} /> */}
          </TouchableOpacity>
        </View>

        {/* Location */}
        <View style={homeStyles.locationContainer}>
          <Ionicons name="location-sharp" size={26} color="red" />
          <Text style={homeStyles.locationText}>Gampaha, Sri Lanka</Text>
        </View>
      </ImageBackground>

      {/* Weather Card */}
      <View style={homeStyles.weatherCard}>
        <View>
          <Text style={homeStyles.tempText}>23°C</Text>
          <Text style={homeStyles.cityText}>Gampaha, Sri Lanka</Text>
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
            <Text style={homeStyles.infoValue}>23.05°C</Text>
            <Text style={homeStyles.infoLabel}>Temperature</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <Feather name="wind" size={50} color="#00AEEF" />
            <Text style={homeStyles.infoValue}>50%</Text>
            <Text style={homeStyles.infoLabel}>Air Humidity</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <Ionicons name="water-outline" size={50} color="green" />
            <Text style={homeStyles.infoValue}>30%</Text>
            <Text style={homeStyles.infoLabel}>Soil Moisture</Text>
          </View>

          <View style={homeStyles.infoCard}>
            <MaterialCommunityIcons
              name="water-pump"
              size={50}
              color="#E14B32"
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
              <Switch
                style={{
                  borderWidth: 2,
                  borderColor: '#E14B32',
                  borderRadius: 50,
                }}
                trackColor={{ false: '#767577', true: '#E14B32' }}
                thumbColor={isEnabled ? '#f5dd4b' : "#E14B32"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

            <Text style={homeStyles.infoValue}>Auto Mode</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
