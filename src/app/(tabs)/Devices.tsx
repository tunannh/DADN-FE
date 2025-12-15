import { COLORS } from '@/constants/colors';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceBox from '@/components/Device-box';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
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
    marginTop: 20
  },
  menu: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  menuItem: {
    paddingVertical: 10,
    width: '50%',
    borderRadius: 12,
  },
  // search_bar: {
  //   marginTop: 20,
  //   marginBottom: 30,
  // },
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
  const [active, setActive] = useState<'log' | 'env'>('log');
  const router = useRouter();
  const { fetchDevices, actuatorDevices, sensorDevices } = useDevices();

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgColor, flex: 1 }}>
      <View style={styles.container}>
        <View><Text style={styles.title}>Devices</Text></View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              { backgroundColor: active === 'log' ? COLORS.buttonBackground : 'white' },
            ]}
            onPress={() => setActive('log')}
          >
            <Text style={{ color: active === 'log' ? 'white' : 'black', textAlign: 'center' }}>
              Actuator devices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              { backgroundColor: active === 'env' ? COLORS.buttonBackground : 'white' },
            ]}
            onPress={() => setActive('env')}
          >
            <Text style={{ color: active === 'env' ? 'white' : 'black', textAlign: 'center' }}>
              Sensor devices
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.search_bar}><SearchBar /></View> */}
      </View>

      {active === 'log' ? (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={styles.add}
            onPress={() => router.navigate('/device_actions/Add-device')}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 16 }}>Add device</Text>
          </TouchableOpacity>
          <View style={styles.device_box}>

            {actuatorDevices?.length === 0 ? (
              <Text>List of actuator devices is empty</Text>
            ) : (
              actuatorDevices?.map((device) => (
                <View key={device.device_id}>
                  <DeviceBox
                    deviceName={device.name}
                    deviceId={device.device_id}
                    status={device.status}
                    device_type={device.device_type}
                    model={device.model}
                    feed_key={device.feed_key}
                    icon={device.device_id === 4 ? (
                      <MaterialCommunityIcons name="water-pump" size={50} color={COLORS.pump_color} />
                    ) : device?.name?.toLowerCase().includes('fan') ? (
                      <MaterialCommunityIcons name="fan" size={50} color={COLORS.fan_color} />
                    ) : device?.name?.toLowerCase().includes('light') ? (
                      <Foundation name="lightbulb" size={50} color={COLORS.light_color} />
                    ) : null}
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.device_box}>

            {sensorDevices?.length === 0 ? (
              <Text>List of sensor devices is empty</Text>
            ) : (
              sensorDevices?.map((device) => (
                <View key={device.device_id}>
                  <DeviceBox
                    deviceName={device.name}
                    deviceId={device.device_id}
                    status={device.status}
                    device_type={device.device_type}
                    model={device.model}
                    feed_key={device.feed_key}
                    icon={device.device_id === 1 ? (
                      <MaterialCommunityIcons name="thermometer" size={50} color="#FF4D4D" />
                    ) : device.device_id === 2 ? (
                      <MaterialCommunityIcons name="weather-windy" size={50} color="#00AEEF" />
                    ) : device.device_id === 3 ? (
                      <MaterialCommunityIcons name="water-percent" size={50} color="brown" />
                    ) : null}
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}


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
