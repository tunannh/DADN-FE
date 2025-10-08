import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const ViewData = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>View data</Text>
      </View>
    </SafeAreaView>
  )
}

export default ViewData

const styles = StyleSheet.create({})