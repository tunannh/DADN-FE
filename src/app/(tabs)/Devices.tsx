import { COLORS } from '@/constants/colors';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceBox from '@/components/Device-box';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import SearchBar from '@/components/Search-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useDeviceStore } from '@/store/device-store';
import { useDevices } from '@/utils/devices.context';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.titleColor,
    fontWeight: 'bold',
  },
  search_bar: {
    marginTop: 20,
    marginBottom: 30,
  },
  device_box: {
    gap: 20,
    paddingVertical: 12,
  },
  add: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 6,
    marginBottom: 12,
  }
})

const Devices = () => {
  const router = useRouter();
  const { devices } = useDevices();

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgColor, flex: 1 }}>
      <View style={styles.container}>
        <View><Text style={styles.title}>Devices</Text></View>
        <View style={styles.search_bar}><SearchBar /></View>
        <TouchableOpacity
          style={styles.add}
          onPress={() => router.navigate('/device_actions/Add-device')}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={{ color: 'white', fontSize: 16 }}>Add device</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.device_box}>

          {devices.length === 0 ? (
            <Text>Danh sách thiết bị trống</Text>
          ) : (
            devices.map((device) => (
              <View key={device.device_id}>
                <DeviceBox
                  deviceName={device.name}
                  deviceId={device.device_id.toString()}
                  status={device.status}
                  icon={device.name.toLowerCase().includes('pump') ? (
                    <MaterialCommunityIcons name="water-pump" size={50} color={COLORS.pump_color} />
                  ) : device.name.toLowerCase().includes('fan') ? (
                    <MaterialCommunityIcons name="fan" size={50} color={COLORS.fan_color} />
                  ) : device.name.toLowerCase().includes('light') ? (
                    <Foundation name="lightbulb" size={50} color={COLORS.light_color} />
                  ) : null}
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Devices;

{/* <DeviceBox
            deviceName='Pump'
            active={isPumpActive}
            toggle={setIsPumpActive}
            icon={<MaterialCommunityIcons name="water-pump" size={50} color={COLORS.pump_color} />}
          />
          <DeviceBox
            deviceName='Fan'
            active={isFanActive}
            toggle={setIsFanActive}
            icon={<MaterialCommunityIcons name="fan" size={50} color={COLORS.fan_color} />}
          />
          <DeviceBox
            deviceName='Lighting system'
            active={isLightActive}
            toggle={setIsLightActive}
            icon={<Foundation name="lightbulb" size={50} color={COLORS.light_color} />}
          /> */}
