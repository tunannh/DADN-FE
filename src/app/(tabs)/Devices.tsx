import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components & Constants
import { COLORS } from '@/constants/colors';
import DeviceBox from '@/components/Device-box';

// Controller
import { useDevicesController } from '@/controllers/useDevicesController';

const Devices = () => {
  const { 
    devices, 
    isLoading,
    getDeviceConfig, 
    handleDelete 
  } = useDevicesController();

  // Hiển thị loading
  if (isLoading && devices.length === 0) {
     return (
        <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
           <ActivityIndicator size="large" color={COLORS.buttonBackground} />
        </SafeAreaView>
     )
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgColor, flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Devices</Text>
      </View>

      {/* Danh sách thiết bị */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.device_list}>
          {devices.map((device) => {
            const icon = getDeviceConfig(device.feed_key);
            const isSensor = device.device_type === 'sensor';

            return (
              <DeviceBox
                key={device.device_id}
                deviceId={device.device_id}
                deviceName={device.name}
                isActive={device.status === 'active'}
                // Luôn set isSensor=true để disable nút bấm trạng thái 
                // (vì API toggle không có, nên ta chặn người dùng bấm)
                isSensor={true} 
                icon={icon}
                onDelete={() => handleDelete(device.device_id)}
                // Không truyền onToggle nữa
              />
            );
          })}

          {!isLoading && devices.length === 0 && (
            <Text style={styles.emptyText}>
              No devices found.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 20
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.bgColor,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: COLORS.titleColor,
    fontWeight: 'bold',
  },
  device_list: {
    paddingVertical: 12,
  },
  emptyText: {
    textAlign: 'center', 
    color: '#888', 
    marginTop: 40, 
    fontSize: 16
  }
})

export default Devices;