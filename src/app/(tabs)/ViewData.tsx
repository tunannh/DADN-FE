import { COLORS } from '@/constants/colors';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.titleColor,
    fontWeight: 'bold'
  },
  menu: {

  },
  timeRange: {

  }, data: {

  }
})
const ViewData = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Data</Text>
        <View style={styles.menu}>


        </View>

        <View style={styles.timeRange}>


        </View>

        <View style={styles.data}>


        </View>
      </View>
    </SafeAreaView>
  )
}

export default ViewData
