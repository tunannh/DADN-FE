// src/screens/SetThresholdScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, TextInput, TouchableOpacity, Modal } from 'react-native';
import { AutoModeCard } from '@/components/ThresholdCard';
import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getThresholdAPI, setThresholdAPI } from '@/utils/api';
import Toast from 'react-native-root-toast';

export default function SetThresholdScreen() {
  const [modal, setModal] = useState<"temp" | "air" | "soil" | null>(null)
  const [isFocusMin, setIsForcusMin] = useState<boolean>(false);
  const [isFocusMax, setIsForcusMax] = useState<boolean>(false);

  const [minTemp, setMinTemp] = useState<string>()
  const [maxTemp, setMaxTemp] = useState<string>()
  const [tempUpdateTime, setTempUpdateTime] = useState<string>("")
  const [tempId, setTempId] = useState<string>("")

  const [minAir, setMinAir] = useState<string>()
  const [maxAir, setMaxAir] = useState<string>()
  const [airUpdateTime, setAirUpdateTime] = useState<string>("")
  const [airId, setAirId] = useState<string>("")

  const [minSoil, setMinSoil] = useState<string>()
  const [maxSoil, setMaxSoil] = useState<string>()
  const [soilUpdateTime, setSoilUpdateTime] = useState<string>("")
  const [soilId, setSoilId] = useState<string>("")

  const [minValue, setMinValue] = useState<string>("0");
  const [maxValue, setMaxValue] = useState<string>("0");

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };
  useEffect(() => {
    const fetchThresholds = async () => {
      try {
        const response = await getThresholdAPI();
        if (response.data) {
          const thresholds = response.data;
          thresholds.map((item: any) => {
            if (item.type === "temperature") {
              setMinTemp(item.min_value.toString());
              setMaxTemp(item.max_value.toString());
              setTempUpdateTime(item.updated_at);
              setTempId(item.threshold_id);
            }
            if (item.type === "humidity") {
              setMinAir(item.min_value.toString());
              setMaxAir(item.max_value.toString());
              setAirUpdateTime(item.updated_at);
              setAirId(item.threshold_id);
            }
            if (item.type === "moisture") {
              setMinSoil(item.min_value.toString());
              setMaxSoil(item.max_value.toString());
              setSoilUpdateTime(item.updated_at);
              setSoilId(item.threshold_id);
            }
          })
        }
      } catch (error) {
        console.log("Error fetching thresholds:", error);
      }
    };
    fetchThresholds();
  }, []);

  const toastShow = (message: string, color: string) => {
    Toast.show(message, {
      duration: 2500,
      animation: true,
      backgroundColor: color,
      opacity: 1,
      position: -90,
    });
  }
  const handleSetThreshold = async (type: string, id: string) => {
    if (!minValue || !maxValue) {
      toastShow('Update failed. Please enter both min and max values', '#E13F33');
      return;
    }
    if (parseFloat(minValue.replace(',', '.')) > parseFloat(maxValue.replace(',', '.'))) {
      toastShow('Update failed. Min value must be less than max value', '#E13F33');
      return;
    }
    if (type === "temp") {
      try {
        const response = await setThresholdAPI(id, parseFloat(minValue.replace(',', '.')), parseFloat(maxValue.replace(',', '.')));
        if (response.data) {
          setMinTemp(minValue.replace(',', '.'));
          setMaxTemp(maxValue.replace(',', '.'));
          toastShow("Temperature threshold updated successfully", "#04B20C");
        }
        else {
          toastShow('Failed to update temperature threshold', '#E13F33');
        }
      } catch (error) {
        console.log("Error setting temperature threshold:", error);
      }
    }
    else if (type === "air") {
      try {
        const response = await setThresholdAPI(id, parseFloat(minValue.replace(',', '.')), parseFloat(maxValue.replace(',', '.')));
        if (response.data) {
          setMinAir(minValue.replace(',', '.'));
          setMaxAir(maxValue.replace(',', '.'));
          toastShow("Air humidity threshold updated successfully", "#04B20C");
        }
        else {
          toastShow('Failed to update air humidity threshold', '#E13F33');
        }
      } catch (error) {
        console.log("Error setting air humidity threshold:", error);
      }
    }
    else {
      try {
        const response = await setThresholdAPI(id, parseFloat(minValue.replace(',', '.')), parseFloat(maxValue.replace(',', '.')));
        if (response.data) {
          setMinSoil(minValue.replace(',', '.'));
          setMaxSoil(maxValue.replace(',', '.'));
          toastShow("Soil moisture threshold updated successfully", "#04B20C");
        }
        else {
          toastShow('Failed to update soil moisture threshold', '#E13F33');
        }
      } catch (error) {
        console.log("Error setting soil moisture threshold:", error);
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Set Threshold</Text>

        {/* <View style={styles.containerSearch}>
          <EvilIcons name="search" size={30} color={COLORS.textColor} />
          <TextInput style={styles.inputSearch} placeholder="Search" autoCapitalize="none" />
        </View> */}
        <View style={{ marginBottom: 10 }}><AutoModeCard /></View>
        <View style={styles.card}>
          {/* <Text style={styles.updateTime}>Last update: {formatDateTime(tempUpdateTime)}</Text> */}
          {/* Bên trái */}
          <View style={styles.cardLeft}>
            <MaterialCommunityIcons name="thermometer" size={32} color="#FF4D4D" />
            <Text style={styles.label}>Temperature</Text>
          </View>

          {/* Bên phải */}
          <View style={styles.cardRight}>
            <View style={styles.valuewrap}>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "#0D532E" }}>Min</Text>
              <View style={styles.value}><Text>{minTemp ? `${minTemp}°C` : 'N/A'}</Text></View>
            </View>

            <View style={styles.valuewrap}>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "#0D532E" }}>Max</Text>
              <View style={styles.value}><Text>{maxTemp ? `${maxTemp}°C` : 'N/A'}</Text></View>
            </View>

            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => { setModal("temp"); setMinValue(minTemp || "0"); setMaxValue(maxTemp || "0") }}>
              <Text style={{ color: "#0D532E", fontWeight: "600" }}>Edit</Text>
              <FontAwesome6 name="edit" size={24} color="#0D532E" />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.card}>
          {/* <Text style={styles.updateTime}>Last update: {formatDateTime(airUpdateTime)}</Text> */}
          {/* Bên trái */}
          <View style={styles.cardLeft}>
            <MaterialCommunityIcons name="weather-windy" size={32} color="#00AEEF" />
            <Text style={styles.label}>Air humidity</Text>
          </View>

          {/* Bên phải */}
          <View style={styles.cardRight}>
            <View style={styles.valuewrap}>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "#0D532E" }}>Min</Text>
              <View style={styles.value}><Text>{minAir ? `${minAir}%` : 'N/A'}</Text></View>
            </View>

            <View style={styles.valuewrap}>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "#0D532E" }}>Max</Text>
              <View style={styles.value}><Text>{maxAir ? `${maxAir}%` : 'N/A'}</Text></View>
            </View>

            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => { setModal("air"); setMinValue(minAir || "0"); setMaxValue(maxAir || "0") }}>
              <Text style={{ color: "#0D532E", fontWeight: "600" }}>Edit</Text>
              <FontAwesome6 name="edit" size={24} color="#0D532E" />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.card}>
          {/* <Text style={styles.updateTime}>Last update: {formatDateTime(soilUpdateTime)}</Text> */}
          {/* Bên trái  00B26A*/}
          <View style={styles.cardLeft}>
            <MaterialCommunityIcons name="water-percent" size={32} color="brown" />
            <Text style={styles.label}>Soil moisture</Text>
          </View>

          {/* Bên phải */}
          <View style={styles.cardRight}>
            <View style={styles.valuewrap}>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "#0D532E" }}>Min</Text>
              <View style={styles.value}><Text>{minSoil ? `${minSoil}%` : 'N/A'}</Text></View>
            </View>

            <View style={styles.valuewrap}>
              <Text style={{ fontWeight: "600", fontSize: 15, color: "#0D532E" }}>Max</Text>
              <View style={styles.value}><Text>{maxSoil ? `${maxSoil}%` : 'N/A'}</Text></View>
            </View>

            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => { setModal("soil"); setMinValue(minSoil || "0"); setMaxValue(maxSoil || "0") }}>
              <Text style={{ color: "#0D532E", fontWeight: "600" }}>Edit</Text>
              <FontAwesome6 name="edit" size={24} color="#0D532E" />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      <Modal
        visible={modal ? true : false}
        transparent
        animationType="fade"
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)"
        }}>
          <View style={{ backgroundColor: COLORS.bgColor, padding: 20, borderRadius: 10, width: "50%" }}>
            <View style={{ alignSelf: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Min value:</Text>
                <TextInput style={[styles.input, { marginLeft: 8, borderColor: isFocusMin ? COLORS.primary : COLORS.borderColor }]}
                  onFocus={() => setIsForcusMin(true)}
                  onBlur={() => setIsForcusMin(false)}
                  value={minValue}
                  onChangeText={setMinValue}
                  keyboardType='decimal-pad'
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
                <Text>Max value:</Text>
                <TextInput style={[styles.input, { borderColor: isFocusMax ? COLORS.primary : COLORS.borderColor }]}
                  keyboardType='decimal-pad'
                  onFocus={() => setIsForcusMax(true)}
                  onBlur={() => setIsForcusMax(false)}
                  value={maxValue}
                  onChangeText={setMaxValue}
                />
              </View>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "flex-end", gap: 20 }}>
              <TouchableOpacity
                style={{ paddingVertical: 8, backgroundColor: '#A8A8A8', borderRadius: 5, width: 60 }}
                onPress={() => setModal(null)}>
                <Text style={{ color: "white", alignSelf: "center" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ paddingVertical: 8, width: 60, backgroundColor: COLORS.buttonBackground, borderRadius: 5, opacity: 0.89 }}
                onPress={() => {
                  if (modal === "temp") handleSetThreshold("temp", tempId)
                  else if (modal === "air") handleSetThreshold("air", airId)
                  else handleSetThreshold("soil", soilId)
                  setModal(null);
                }}>
                <Text style={{ color: "white", alignSelf: "center" }}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.titleColor,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    //   ...Platform.select({
    //     ios: {
    //       shadowColor: '#000',
    //       shadowOpacity: 0.05,
    //       shadowOffset: { width: 0, height: 2 },
    //       shadowRadius: 3,
    //     },
    //     android: { elevation: 2 },
    //   }
    // ),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  updateTime: {
    position: 'absolute',
    top: -20,
    left: 200,
    fontStyle: 'italic',
    color: '#888',
    fontSize: 12,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#abd6b055",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10
  },
  valuewrap: {
    alignItems: "center",
    gap: 3
  },
  value: {
    backgroundColor: '#F0F4F7',
    borderRadius: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#D1D9E2',
    width: 45,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    width: 55,
    height: 40,
    marginLeft: 5
  }
});
