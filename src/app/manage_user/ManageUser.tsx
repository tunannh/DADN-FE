import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';

const ManageUser = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([
    { id: '1', name: 'Alexander', userId: '1234567' },
    { id: '2', name: 'Benjamin', userId: '7654321' },
    { id: '3', name: 'Charlotte', userId: '9876543' },
  ]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setUsers(users.filter(u => u.id !== id)),
        },
      ]
    );
  };

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.userId.includes(search)
  );

  return (
    <SafeAreaView style={manageUserStyles.container}>
      {/* Search */}
      <View style={manageUserStyles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#777"
          style={manageUserStyles.searchIcon}
        />
        <TextInput
          style={manageUserStyles.searchInput}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity
        style={manageUserStyles.add}
        onPress={() => alert("add user")}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={{ color: 'white', fontSize: 16 }}>Add user</Text>
      </TouchableOpacity>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={manageUserStyles.card}>
            <View style={manageUserStyles.userInfo}>
              <View style={manageUserStyles.avatarBox}>
                <Ionicons name="person-outline" size={32} color="#333" />
              </View>
              <View>
                <Text style={manageUserStyles.name}>{item.name}</Text>
                <Text style={manageUserStyles.userId}>ID: {item.userId}</Text>
              </View>
            </View>

            <View style={manageUserStyles.actions}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#B00020" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.navigate('/(tabs)/Profile')}
              >
                <Ionicons name="chevron-forward" size={22} color="#215C2A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ManageUser;

const manageUserStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    marginTop: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
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
    gap: 6,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 30,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#215C2A',
  },
  userId: {
    fontSize: 14,
    color: '#215C2A',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});
