import { COLORS } from '@/constants/colors';
import React, { useState } from 'react'
import { Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import LogData from '@/components/LogData';
import EnvData from '@/components/EnvData';


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
    paddingVertical: 8,
    width: '50%',
    borderRadius: 12,
  },
  timeRange: {
    flexDirection: 'row',
    gap: "10%",
    marginBottom: 20,
  },
  timeRangeItem: {
    width: '45%',
    gap: 5
  },
  inputBox: {
    width: "100%",
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    borderRadius: 10
  },
  dateFormat: {
    color: COLORS.textColor, textAlign: 'center', fontSize: 16
  },
  data: {
    paddingVertical: 20
  }
})

const ViewData = () => {
  const [active, setActive] = useState<'log' | 'env'>('log');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'start' | 'end'>('start');

  const handleShowPicker = (type: 'start' | 'end') => {
    setMode(type);
    setShowPicker(true);
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      if (mode === 'start') setStartDate(selectedDate);
      else setEndDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgColor, flex: 1 }}>
      <View style={styles.container}>
        <View><Text style={styles.title}>Data</Text></View>
        <View style={styles.menu}>
          <Pressable
            style={[
              styles.menuItem,
              { backgroundColor: active === 'log' ? COLORS.buttonBackground : 'white' },
            ]}
            onPress={() => setActive('log')}
          >
            <Text style={{ color: active === 'log' ? 'white' : 'black', textAlign: 'center' }}>
              Log
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.menuItem,
              { backgroundColor: active === 'env' ? COLORS.buttonBackground : 'white' },
            ]}
            onPress={() => setActive('env')}
          >
            <Text style={{ color: active === 'env' ? 'white' : 'black', textAlign: 'center' }}>
              Environment
            </Text>
          </Pressable>
        </View>

        <View style={styles.timeRange}>
          <View style={styles.timeRangeItem}>
            <Text style={{ color: COLORS.textColor, fontSize: 18 }}>Start time</Text>
            <TouchableOpacity style={styles.inputBox} onPress={() => handleShowPicker('start')}>
              <Text style={styles.dateFormat}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timeRangeItem}>
            <Text style={{ color: COLORS.textColor, fontSize: 18 }}>End time</Text>
            <TouchableOpacity style={styles.inputBox} onPress={() => handleShowPicker('end')}>
              <Text style={styles.dateFormat}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {active === 'log' ? (
          <View style={styles.data}><LogData /></View>
        ) : (
          <View style={styles.data}><EnvData /></View>
        )}
      </ScrollView>


      {showPicker && (
        <DateTimePicker
          value={mode === 'start' ? startDate : endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}


    </SafeAreaView>
  )
}

export default ViewData
