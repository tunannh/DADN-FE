import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { Formik } from 'formik';
import { SignUpSchema } from '@/utils/validate.schema';
import { deleteUserAPI, getUsersAPI, registerAPI } from '@/utils/api';
import Toast from 'react-native-root-toast';

const ManageUser = () => {
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [users, setUsers] = useState<{ user_id: number, garden_id: number, name: string, email: string, role: string }[]>([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const toastShow = (message: string, color: string) => {
    Toast.show(message, {
      duration: 2500,
      animation: true,
      backgroundColor: color,
      opacity: 1,
      position: -90,
    })
  }
  const [idtoDelete, setIdtoDelete] = useState<string>("");
  const [roletoDelete, setRoletodelete] = useState<string>("");
  const handleDelete = async (user_id: string, role: string) => {
    if (role === 'admin') {
      toastShow('Cannot delete admin user!', '#E13F33');
      return;
    }
    try {
      const response = await deleteUserAPI(user_id);
      if (response.data) {
        setUsers(prev =>
          prev.filter(u => u.user_id.toString() !== user_id)
        );
        toastShow('Delete user successfully!', '#04B20C');
      }
      else {
        toastShow('Delete user failed!', '#E13F33');
      }
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateAccount = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await registerAPI(name, email, password);
      if (response.data) { // response.status === 200
        toastShow('Create user successfully!', '#04B20C');
        setUsers(prev => [...prev, response.data]);
      }
      else { // email already exists
        toastShow('Create user failed! Email is invalid or already exists.', '#E13F33');
      }
    } catch (error) {
      console.log('Registration Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersAPI();
        if (response.data) {
          setUsers(response.data);
          setFilteredUsers(response.data);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredUsers(
      users.filter(u =>
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        u.user_id.toString().includes(keyword) ||
        u.role.toLowerCase().includes(keyword)
      )
    );
  }, [search, users]);
  const hashId = (input: number) =>
    Math.abs((input * 2654435761) % 1000);
  return (
    <SafeAreaView style={manageUserStyles.container}>
      {/* title */}
      <View><Text style={manageUserStyles.title}>Manage users</Text></View>
      {/* Search */}
      <View style={manageUserStyles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#777"
          style={manageUserStyles.searchIcon}
        />
        <TextInput
          style={[manageUserStyles.searchInput, { borderColor: searchFocused ? COLORS.primary : COLORS.borderColor }]}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </View>

      <TouchableOpacity
        style={manageUserStyles.add}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={{ color: 'white', fontSize: 16 }}>Create user</Text>
      </TouchableOpacity>

      {/* User List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.user_id.toString()}
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
                <Text style={manageUserStyles.userId}>ID: {hashId(item.user_id)}</Text>
                <Text style={manageUserStyles.userId}>{item.email}</Text>
              </View>
            </View>

            <View style={manageUserStyles.role}><Text style={manageUserStyles.roleText}>{item.role}</Text></View>

            <View style={manageUserStyles.actions}>
              <TouchableOpacity onPress={() => { setModalVisibleDelete(true), setIdtoDelete(item.user_id.toString()); setRoletodelete(item.role); }}>
                <Ionicons name="trash-outline" size={22} color="#B00020" />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => router.navigate('/(tabs)/Profile')}
              >
                <Ionicons name="chevron-forward" size={22} color="#215C2A" />
              </TouchableOpacity> */}
            </View>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}>
          <View style={authStyles.formContainer}>
            <Formik
              validationSchema={SignUpSchema}
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={values => handleCreateAccount(values.name, values.email, values.password)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View>
                  {/* Name Input */}
                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.labelInput}>Name</Text>
                    <TextInput
                      style={[authStyles.textInput, { borderColor: nameFocus ? COLORS.primary : COLORS.borderColor }]}
                      placeholder="Enter name"
                      onChangeText={handleChange('name')}
                      value={values.name}
                      autoCapitalize="none"
                      onFocus={() => setNameFocus(true)}
                      onBlur={() => { setNameFocus(false); handleBlur('name'); }}
                    />
                    {errors.name && (
                      <Text style={authStyles.errorText}>
                        *{errors.name}
                      </Text>
                    )}
                  </View>

                  {/* Email Input */}
                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.labelInput}>Email</Text>
                    <TextInput
                      style={[authStyles.textInput, { borderColor: emailFocus ? COLORS.primary : COLORS.borderColor }]}
                      placeholder="Enter email"
                      onChangeText={handleChange('email')}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => { setEmailFocus(false); handleBlur('email'); }}
                    />
                    {errors.email && (
                      <Text style={authStyles.errorText}>
                        *{errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Password Input */}
                  <View style={authStyles.inputContainer}>
                    <Text style={authStyles.labelInput}>Password</Text>
                    <TextInput
                      style={[authStyles.textInput, { borderColor: passwordFocus ? COLORS.primary : COLORS.borderColor }]}
                      placeholder="Enter password"
                      onChangeText={handleChange('password')}
                      value={values.password}
                      secureTextEntry={!showPassword}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => { setPasswordFocus(false); handleBlur('password'); }}
                      autoCapitalize="none"
                    />
                    {errors.password && (
                      <Text style={authStyles.errorText}>
                        *{errors.password}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={authStyles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flexDirection: "row", alignSelf: "flex-end", gap: 20, marginTop: 10 }}>
                    <TouchableOpacity
                      style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#A8A8A8', borderRadius: 5 }}
                      onPress={() => setModalVisible(false)}>
                      <Text style={{ color: "white" }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: COLORS.buttonBackground, borderRadius: 5, opacity: 0.89 }}
                      onPress={() => {
                        handleSubmit();
                        if (values.name && values.email && values.password) setModalVisible(false);
                      }}
                      disabled={loading}
                    >
                      <Text style={{ color: "white" }}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalVisibleDelete}
        transparent
        animationType="fade"
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)"
        }}>
          <View style={{ backgroundColor: COLORS.bgColor, padding: 20, borderRadius: 10 }}>
            <Text style={{ marginBottom: 20, fontSize: 16 }}>This action will delete this user. Continue?</Text>

            <View style={{ flexDirection: "row", alignSelf: "flex-end", gap: 20 }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#A8A8A8', borderRadius: 5 }}
                onPress={() => setModalVisibleDelete(false)}>
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#E32928', borderRadius: 5, opacity: 0.89 }}
                onPress={() => { handleDelete(idtoDelete, roletoDelete); setModalVisibleDelete(false); }}>
                <Text style={{ color: "white" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ManageUser;

const authStyles = StyleSheet.create({
  formContainer: {
    backgroundColor: COLORS.bgColor,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 25,
    position: 'relative',
  },
  labelInput: {
    fontSize: 18,
    color: COLORS.titleColor,
    fontWeight: '600',
    marginBottom: 6,
  },
  errorText: {
    position: 'absolute',
    bottom: -16,
    left: 10,
    fontSize: 12,
    color: 'red',
  },
  textInput: {
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    backgroundColor: COLORS.bgColor,
    // borderColor: COLORS.borderColor,
    borderRadius: 15
  },
  eyeButton: {
    position: 'absolute',
    right: 5,
    top: 45,
    padding: 4,
  },
  authButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
});

const manageUserStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    marginTop: 0,
  },
  role: {
    paddingVertical: 4,
    borderWidth: 1.2,
    borderColor: '#2fb352ff',
    borderRadius: 8,
    position: 'absolute',
    top: 33,
    right: 65,
    width: 74,
    alignItems: 'center',
  },
  roleText: {
    color: '#2fb352ff',
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: COLORS.titleColor,
    fontWeight: 'bold',
    marginBottom: 30,
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
    paddingVertical: 12,
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
