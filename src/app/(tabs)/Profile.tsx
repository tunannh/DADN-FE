import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeScreen from '@/components/SafeScreen';

const Profile = () => {
  const navigation = useNavigation();

  // 🧩 useState cho thông tin người dùng
  const [name, setName] = useState('Albert Furo');
  const [email, setEmail] = useState('Sample@gmail.com');
  const [phone, setPhone] = useState('0383 462 324');

  // 🧩 Trạng thái cho chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile information saved successfully!');
    // Có thể gọi API lưu thông tin tại đây
  };

  const [avatar, setAvatar] = useState<string | null>(
    require('@/assets/images/avatar.png') as any
  );

  const handlePickAvatar = async () => {
    // Xin quyền truy cập ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Denied',
        'You need to allow access to your photos.'
      );
      return;
    }

    // Mở thư viện
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <SafeScreen style={profileStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={profileStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={profileStyles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={profileStyles.header}>
            {/* <TouchableOpacity style={profileStyles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity> */}
            <Text style={profileStyles.title}>Profile</Text>

            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Ionicons
                name={isEditing ? 'close' : 'create-outline'}
                size={26}
                color={COLORS.primary || '#215C2A'}
              />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={profileStyles.avatarContainer}>
            <TouchableOpacity
              onPress={isEditing ? handlePickAvatar : undefined}
            >
              <Image
                source={typeof avatar === 'string' ? { uri: avatar } : avatar}
                style={profileStyles.avatar}
              />
              {isEditing && (
                <View style={profileStyles.cameraIcon}>
                  <Ionicons name="create-outline" size={22} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={profileStyles.form}>
            <Text style={profileStyles.label}>Name</Text>
            <TextInput
              style={profileStyles.input}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />

            <Text style={profileStyles.label}>Email</Text>
            <TextInput
              style={profileStyles.input}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={profileStyles.label}>Phone Number</Text>
            <TextInput
              style={profileStyles.input}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              keyboardType="phone-pad"
            />

            {isEditing && (
              <TouchableOpacity style={profileStyles.saveButton} onPress={handleSave}>
                <Text style={profileStyles.saveText}>Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
};

export default Profile;

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#215C2A',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#215C2A',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#215C2A',
    borderRadius: 20,
    padding: 6,
  },

  form: {
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 18,
  },
  saveButton: {
    backgroundColor: '#215C2A',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
