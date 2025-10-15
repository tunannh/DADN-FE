import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SafeScreen from '@/components/SafeScreen';

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
    <SafeScreen style={manageUserStyles.container}>
      {/* Header */}
      <View style={manageUserStyles.header}>
        <TouchableOpacity
          style={manageUserStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#000" />
        </TouchableOpacity>

        <Text style={manageUserStyles.title}>Manage User</Text>

        <TouchableOpacity
          onPress={() => Alert.alert('Add User', 'Chức năng thêm user')}
        >
          <Ionicons name="add" size={28} color="#000" />
        </TouchableOpacity>
      </View>

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
                onPress={() => navigation.navigate('Profile' as never)}
              >
                <Ionicons name="chevron-forward" size={22} color="#215C2A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeScreen>
  );
};

export default ManageUser;

const manageUserStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 22,
    fontWeight: '700',
    color: '#215C2A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
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
