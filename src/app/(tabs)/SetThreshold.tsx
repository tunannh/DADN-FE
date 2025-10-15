// src/screens/SetThresholdScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ThresholdCard, AutoModeCard } from '@/components/ThresholdCard';


export default function SetThresholdScreen() {
  const [autoMode, setAutoMode] = useState(false);
  const [temperature, setTemperature] = useState('23.05');
  const [humidity, setHumidity] = useState('30');
  const [soil, setSoil] = useState('50');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Set Threshold</Text>

      <AutoModeCard autoMode={autoMode} setAutoMode={setAutoMode} />

      <ThresholdCard
        field="temp"
        label="Temperature"
        icon="thermometer"
        color="#FF4D4D"
        value={temperature}
        setValue={setTemperature}
        unit="°C"
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />

      <ThresholdCard
        field="humidity"
        label="Air humidity"
        icon="weather-windy"
        color="#00AEEF"
        value={humidity}
        setValue={setHumidity}
        unit="%"
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />

      <ThresholdCard
        field="soil"
        label="Soil moisture"
        icon="water-percent"
        color="#00B26A"
        value={soil}
        setValue={setSoil}
        unit="%"
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAF7',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0D532E',
    textAlign: 'center',
    marginBottom: 26,
  },
});
