import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  FlatList, 
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

// Components & Store
import Input from "@/components/input"; // Đảm bảo component Input của bạn nhận props setValue
import { COLORS } from "@/constants/colors";
import { useDeviceStore } from "@/store/device-store";

// --- CONSTANTS ---
const DEVICE_TYPES = [
  { label: 'Sensor (Cảm biến)', value: 'sensor' },
  { label: 'Actuator (Thiết bị chấp hành)', value: 'actuator' }
];

const FEED_KEYS = [
  { label: 'Manual Watering (Tưới thủ công)', value: 'manual_watering' },
  { label: 'Humidity (Độ ẩm không khí)', value: 'humidity' },
  { label: 'Soil Moisture (Độ ẩm đất)', value: 'moisture' },
  { label: 'Temperature (Nhiệt độ)', value: 'temperature' }
];

const SENSOR_TYPES = [
  { label: 'Soil Moisture Sensor', value: 'soil_moisture' },
  { label: 'DHT11/22 (Humidity)', value: 'humidity' },
  { label: 'DHT11/22 (Temperature)', value: 'temperature' }
];

const ACTUATOR_TYPES = [
  { label: 'Water Pump (Máy bơm)', value: 'pump' },
  { label: 'Fan (Quạt)', value: 'fan' },
  { label: 'Light (Đèn)', value: 'light' }
];

// --- COMPONENT SELECT (DROPDOWN) ---
interface OptionItem { label: string; value: string; }
interface SelectInputProps {
  label: string;
  value: string;
  options: OptionItem[];
  onSelect: (val: string) => void;
  placeholder?: string;
}

const SelectInput = ({ label, value, options, onSelect, placeholder }: SelectInputProps) => {
  const [visible, setVisible] = useState(false);
  const selectedLabel = options.find(opt => opt.value === value)?.label;

  return (
    <View style={{ gap: 8 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.selectBox} 
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? COLORS.titleColor : '#A1A1A1', fontSize: 16 }}>
          {selectedLabel || placeholder || "Select..."}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#A1A1A1" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select {label}</Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                        styles.optionItem,
                        item.value === value && { backgroundColor: '#F0F8FF' }
                    ]}
                    onPress={() => {
                      onSelect(item.value);
                      setVisible(false);
                    }}
                  >
                    <Text style={[
                      styles.optionText, 
                      item.value === value && { color: COLORS.buttonBackground, fontWeight: 'bold' }
                    ]}>
                      {item.label}
                    </Text>
                    {item.value === value && (
                      <Ionicons name="checkmark-circle" size={22} color={COLORS.buttonBackground} />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// --- MAIN SCREEN ---
const AddDevice = () => {
    const router = useRouter();
    // Lấy hàm addDevice từ store (Bạn cần cập nhật store để có hàm này)
    const { addDevice } = useDeviceStore();

    const [name, setName] = useState<string>("");
    const [deviceType, setDeviceType] = useState<string>(""); 
    const [feedKey, setFeedKey] = useState<string>("");
    const [subType, setSubType] = useState<string>(""); 

    // Reset subType khi đổi loại thiết bị
    useEffect(() => {
        setSubType("");
    }, [deviceType]);

    const handleAddDevice = async () => {
        // 1. Validation
        if (!name.trim()) return alert("Please enter device name");
        if (!deviceType) return alert("Please select device type");
        if (!feedKey) return alert("Please select feed key");
        if (!subType) return alert(`Please select ${deviceType} type`);

        // 2. Construct Payload
        const newDevicePayload = {
            name: name,
            device_type: deviceType, // 'sensor' | 'actuator'
            feed_key: feedKey,
            // Nếu là sensor thì gửi sensor_type, ngược lại gửi rỗng
            sensor_type: deviceType === 'sensor' ? subType : "", 
            // Nếu là actuator thì gửi actuator_type, ngược lại gửi rỗng
            actuator_type: deviceType === 'actuator' ? subType : "",
            garden_id: 1 // Hardcode hoặc lấy từ user context
        };

        try {
            console.log("Adding Device:", newDevicePayload);
            // 3. Call Store Action
            await addDevice(newDevicePayload); 
            router.back();
        } catch (error) {
            alert("Failed to add device. Please try again.");
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.inputContainer}>
                    {/* Name */}
                    <Input
                        placeholder="Ex: Tomato Garden Pump"
                        label="Device Name"
                        value={name}
                        setValue={setName}
                    />

                    {/* Device Type */}
                    <SelectInput 
                        label="Device Type"
                        placeholder="Select Type"
                        value={deviceType}
                        options={DEVICE_TYPES}
                        onSelect={setDeviceType}
                    />

                    {/* Feed Key */}
                    <SelectInput 
                        label="Adafruit Feed Key"
                        placeholder="Select Feed Key"
                        value={feedKey}
                        options={FEED_KEYS}
                        onSelect={setFeedKey}
                    />

                    {/* Conditional Type */}
                    {deviceType === 'sensor' && (
                        <SelectInput 
                            label="Sensor Type"
                            placeholder="Select Sensor Model"
                            value={subType}
                            options={SENSOR_TYPES}
                            onSelect={setSubType}
                        />
                    )}

                    {deviceType === 'actuator' && (
                        <SelectInput 
                            label="Actuator Type"
                            placeholder="Select Actuator Type"
                            value={subType}
                            options={ACTUATOR_TYPES}
                            onSelect={setSubType}
                        />
                    )}
                </View>

                <TouchableOpacity
                    style={styles.btn_add}
                    onPress={handleAddDevice}
                    activeOpacity={0.8}
                >
                    <Text style={styles.addText}>Add Device</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1
    },
    inputContainer: {
        gap: 20
    },
    label: {
        marginLeft: 10, 
        color: COLORS.titleColor || '#000', 
        fontWeight: 'bold',
        fontSize: 16
    },
    btn_add: {
        backgroundColor: COLORS.buttonBackground,
        padding: 15,
        borderRadius: 30,
        marginTop: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center'
    },
    addText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    // --- Select Styles ---
    selectBox: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55 // Chiều cao cố định cho đều với Input
    },
    // --- Modal Styles ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        padding: 20,
        maxHeight: '60%',
        elevation: 10
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.titleColor
    },
    optionItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8
    },
    optionText: {
        fontSize: 16,
        color: '#333'
    }
});

export default AddDevice;