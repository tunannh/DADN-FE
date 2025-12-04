import { authStyles } from '@/assets/styles/auth.style';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { registerAPI } from '@/utils/api';
import Toast from "react-native-root-toast";

const SignUp = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      let toast = Toast.show('Please fill all the fields', {
        duration: 2000,
        animation: true,
        backgroundColor: '#ECB90D',
        opacity: 1,
        position: -60,
      })
      return;
    }

    if (password.length < 6) {
      let toast = Toast.show('Password must be at least 6 characters', {
        duration: 2000,
        animation: true,
        backgroundColor: '#ECB90D',
        opacity: 1,
        position: -60,
      })
      return;
    }

    // setLoading(true);

    try {
      const response = await registerAPI(email, name, password);
      if (response.data) { // response.status === 200
        let toast = Toast.show('Account created successfully', {
          duration: 2000,
          animation: true,
          backgroundColor: '#04B20C',
          opacity: 1,
          position: -60,
        })
        router.replace('/(auth)/SignIn');
      }
      else { // email already exists
        let toast = Toast.show('Email is invalid or already exists', {
          duration: 2000,
          animation: true,
          backgroundColor: '#E13F33',
          opacity: 1,
          position: -60,
        })
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
    // setTimeout(() => {
    //   try {
    //     console.log('Name', name);
    //     console.log('Email', email);
    //     console.log('Password', password);
    //   } catch (err: any) {
    //     Alert.alert('Error', err.errors?.[0]?.message || 'Sign Up failed');
    //     console.error(JSON.stringify(err, null, 2));
    //   } finally {
    //     setLoading(false);
    //     console.log('Sign Up Successful');
    //   }
    // }, 3000);
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={authStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Container */}
          <View style={authStyles.imageContainerSignUp}>
            <Image
              source={require('@/assets/imgAuth/transferwise-80.svg')}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={[authStyles.title, { marginTop: 90 }]}>Create Account</Text>

          <View style={authStyles.formContainer}>
            {/* Name Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
            </View>

            {/* Email Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
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

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                authStyles.authButton,
              ]}
              onPress={handleSignUp}
            >
              <Text style={authStyles.buttonText}>
                Sign up
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.back()}
            >
              <Text style={authStyles.linkText}>
                Already have an account?{' '}
                <Text style={authStyles.link}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
