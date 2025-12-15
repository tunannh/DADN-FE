import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAutoStatus } from '@/utils/useAutoStatus.context';
import { changeAutoStatus } from '@/utils/api';
import Toast from 'react-native-root-toast';


export const AutoModeCard = () => {
  const toastShow = (message: string, color: string) => {
    Toast.show(message, {
      duration: 2000,
      animation: true,
      backgroundColor: color,
      opacity: 1,
      position: -82
    })
  }
  const { enabled, set_enabled } = useAutoStatus();
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <MaterialCommunityIcons name="faucet-variant" size={26} color="#FF4D4D" />
        <Text style={styles.label}>AutoMode</Text>
      </View>
      <TouchableOpacity
        style={{ marginRight: 12 }}
        onPress={async () => {
          try {
            // Call API to toggle auto status
            const response = await changeAutoStatus(!enabled);
            if (response.data) {
              set_enabled(response.data.enabled);
              toastShow(`Auto mode ${response.data.enabled ? 'on' : 'off'}`, response.data.enabled ? '#04B20C' : '#e19833ff');
            }
            else {
              toastShow('Failed to change auto mode', '#E13F33');
            }
          } catch (error) {
            console.error("Error toggling auto status:", error);
          }
        }}
      >
        {enabled === true ? (
          <Fontisto name="toggle-on" size={38} color="#08d012ff" />
        ) : (
          <Fontisto name="toggle-off" size={38} color="#CC1800" />
        )}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 25,
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
