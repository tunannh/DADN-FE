import { COLORS } from '@/constants/colors';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceBox from '@/components/Device-box';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import SearchBar from '@/components/Search-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

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
    marginBottom: 20,
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
    gap: 6
  }
})

const Devices = () => {
  const [isPumpActive, setIsPumpActive] = useState<boolean>(false)
  const [isFanActive, setIsFanActive] = useState<boolean>(false)
  const [isLightActive, setIsLightActive] = useState<boolean>(false)

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgColor, flex: 1 }}>
      <View style={styles.container}>
        <View><Text style={styles.title}>Devices</Text></View>
        <View style={styles.search_bar}><SearchBar /></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.device_box}>
          <TouchableOpacity
            style={styles.add}
            onPress={() => router.navigate('/Add-device')}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={{ color: 'white', fontSize: 16 }}>Add device</Text>
          </TouchableOpacity>

          <DeviceBox
            device_name='Pump'
            active={isPumpActive}
            icon={<MaterialCommunityIcons name="water-pump" size={50} color={COLORS.pump_color} />}
            onPress={() => setIsPumpActive(!isPumpActive)}
          />
          <DeviceBox
            device_name='Fan'
            active={isFanActive}
            icon={<MaterialCommunityIcons name="fan" size={50} color={COLORS.fan_color} />}
            onPress={() => setIsFanActive(!isFanActive)}
          />
          <DeviceBox
            device_name='Lighting system'
            active={isLightActive}
            icon={<Foundation name="lightbulb" size={50} color={COLORS.light_color} />}
            onPress={() => setIsLightActive(!isLightActive)}
          />
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Devices;
