// src/components/ThresholdCard.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { handleDecimalInput } from '@/utils/inputHelpers';

interface ThresholdCardProps {
  label: string;
  icon: any;
  color: string;
  value: string;
  unit: string;
  setValue: (val: string) => void;
  field: string;
  focusedField: string | null;
  setFocusedField: (val: string | null) => void;
}

export const ThresholdCard: React.FC<ThresholdCardProps> = ({
  label,
  icon,
  color,
  value,
  unit,
  setValue,
  field,
  focusedField,
  setFocusedField,
}) => {
  const isFocused = focusedField === field;

  return (
    <View style={styles.card}>
      {/* Bên trái */}
      <View style={styles.cardLeft}>
        <MaterialCommunityIcons name={icon} size={26} color={color} />
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Bên phải */}
      <View
        style={[
          styles.cardRight,
          isFocused && { backgroundColor: '#eaf9ee', borderColor: '#2E9B4E' },
        ]}
      >
        <TextInput
          style={[styles.input, { minWidth: 40 + value.length * 8 }]}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={(t) => handleDecimalInput(t, setValue)}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          placeholder="0"
          placeholderTextColor="#A0A0A0"
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};

interface AutoModeCardProps {
  autoMode: boolean;
  setAutoMode: (val: boolean) => void;
}

export const AutoModeCard: React.FC<AutoModeCardProps> = ({ autoMode, setAutoMode }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <MaterialCommunityIcons name="faucet-variant" size={26} color="#FF4D4D" />
        <Text style={styles.label}>AutoMode</Text>
      </View>
      <Switch
        value={autoMode}
        onValueChange={setAutoMode}
        trackColor={{ false: '#ccc', true: '#FF4D4D' }}
        thumbColor="#fff"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E6E6E6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 18,
    color: '#0D532E',
    fontWeight: '500',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f8f6',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#dcdcdc',
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: 90,
    justifyContent: 'center',
  },
  input: {
    flex: 0,
    fontSize: 18,
    color: '#0D532E',
    textAlign: 'right',
    marginRight: 4,
  },
  unit: {
    fontSize: 16,
    color: '#0D532E',
    opacity: 0.7,
  },
});
