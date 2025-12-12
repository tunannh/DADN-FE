import React from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageBackground } from 'expo-image';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Styles & Constants
import { homeStyles } from '@/assets/styles/home.style';
import { COLORS } from '@/constants/colors';

// Controller
import { useHomeController } from '@/controllers/useHomeController';

const Home = () => {
  // Lấy dữ liệu và hàm xử lý từ Controller
  const { 
    dashboardData,        
    handleToggleAutoMode, 
    navigateToManageUser, 
    navigateToSettings    
  } = useHomeController();

  return (
    <View style={homeStyles.container}>
      
      {/* --- PHẦN 1: HEADER & BACKGROUND --- */}
      <ImageBackground
        source={require('@/assets/images/bg-farm.jpg')} // Đảm bảo bạn có ảnh này
        style={homeStyles.imgBackground}
        imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
        contentFit="cover"
      >
        {/* Top Icons (Setting & User) */}
        <View style={homeStyles.topIcon}>
          <TouchableOpacity 
            style={homeStyles.iconCircle}
            onPress={navigateToSettings}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={homeStyles.iconCircle}
            onPress={navigateToManageUser}
            activeOpacity={0.7}
          >
            <Feather name="users" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Location Display */}
        <View style={homeStyles.locationContainer}>
          <Ionicons name="location-sharp" size={26} color="red" />
          <Text style={homeStyles.locationText}>
            {dashboardData.location}
          </Text>
        </View>
      </ImageBackground>

      {/* --- PHẦN 2: WEATHER CARD (Hardcoded từ Controller) --- */}
      <View style={homeStyles.weatherCard}>
        <View>
          {/* Nhiệt độ tổng quan (Làm tròn nếu là số) */}
          <Text style={homeStyles.tempText}>
            {typeof dashboardData.temperature === 'number' 
              ? Math.floor(dashboardData.temperature) 
              : dashboardData.temperature}
            °C
          </Text>
          
          {/* Trạng thái thời tiết (Hiện tại đang hardcode là 'Rainy' trong controller) */}
          <Text style={homeStyles.cityText}>
            {dashboardData.weatherCondition}
          </Text>
        </View>

        {/* Ảnh thời tiết tĩnh */}
        <Image
          source={require('@/assets/images/RainThunder.png')} // Đảm bảo bạn có ảnh này
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
      </View>

      {/* --- PHẦN 3: GRID SENSOR INFO --- */}
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 20 }} 
        showsVerticalScrollIndicator={false}
      >
        <View style={homeStyles.infoGrid}>
          
          {/* Card 1: Nhiệt độ môi trường */}
          <View style={homeStyles.infoCard}>
            {/* Icon với nền nhẹ */}
            <View style={{ 
                backgroundColor: '#FFEFEF', 
                padding: 10, 
                borderRadius: 50, 
                marginBottom: 5 
            }}>
              <Ionicons name="thermometer-outline" size={32} color="red" />
            </View>
            
            <Text style={homeStyles.infoValue}>
              {dashboardData.temperature}°C
            </Text>
            <Text style={homeStyles.infoLabel}>Temperature</Text>
          </View>

          {/* Card 2: Độ ẩm không khí */}
          <View style={homeStyles.infoCard}>
            <View style={{ 
                backgroundColor: '#E0F7FA', 
                padding: 10, 
                borderRadius: 50, 
                marginBottom: 5 
            }}>
              <Feather name="wind" size={32} color="#00AEEF" />
            </View>

            <Text style={homeStyles.infoValue}>
              {dashboardData.humidity}%
            </Text>
            <Text style={homeStyles.infoLabel}>Air Humidity</Text>
          </View>

          {/* Card 3: Độ ẩm đất */}
          <View style={homeStyles.infoCard}>
            <View style={{ 
                backgroundColor: '#E8F5E9', 
                padding: 10, 
                borderRadius: 50, 
                marginBottom: 5 
            }}>
              <Ionicons name="water-outline" size={32} color="green" />
            </View>

            <Text style={homeStyles.infoValue}>
              {dashboardData.soilMoisture}%
            </Text>
            <Text style={homeStyles.infoLabel}>Soil Moisture</Text>
          </View>

          {/* Card 4: Auto Mode Switch */}
          <View style={homeStyles.infoCard}>
            <View style={{ 
                backgroundColor: dashboardData.isAutoMode ? '#FFF3E0' : '#F5F5F5', 
                padding: 10, 
                borderRadius: 50, 
                marginBottom: 5 
            }}>
              <MaterialCommunityIcons
                name="water-pump"
                size={32}
                color={dashboardData.isAutoMode ? "#E14B32" : "#767577"}
              />
            </View>
            
            <View style={{ marginVertical: 5 }}>
               <Switch
                trackColor={{ false: '#767577', true: '#E14B32' }}
                thumbColor={dashboardData.isAutoMode ? '#FFFFFF' : "#f4f3f4"}
                // iOS background color prop
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleToggleAutoMode}
                value={dashboardData.isAutoMode}
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }} // Thu nhỏ switch một chút cho cân đối
              />
            </View>

            <Text style={[
                homeStyles.infoLabel, 
                { 
                  color: dashboardData.isAutoMode ? "#E14B32" : COLORS.textLight || '#888', 
                  fontWeight: dashboardData.isAutoMode ? 'bold' : 'normal' 
                }
            ]}>
                {dashboardData.isAutoMode ? "Auto ON" : "Manual"}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default Home;