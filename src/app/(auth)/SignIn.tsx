import { COLORS } from '@/constants/colors';
import { authStyles } from '@/assets/styles/auth.style';
// import { useAuth } from '@/src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import Toast from "react-native-root-toast";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { loginAPI } from '@/utils/api';
import { Formik } from 'formik';
import { SignInSchema } from '@/utils/validate.schema';

const SignInScreen = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginAPI(email, password);
      if (response.data) { // response.status === 200
        let toast = Toast.show('Signed in successfully', {
          duration: 2000,
          animation: true,
          backgroundColor: '#04B20C',
          opacity: 0.9,
          position: -60,
        })
        router.replace('/(tabs)/Home');
      }
      else { // email or password incorrect
        let toast = Toast.show('Email or password is incorrect', {
          duration: 2000,
          animation: true,
          backgroundColor: '#E13F33',
          opacity: 0.9,
          position: -60,
        })
      }
    } catch (error) {
      console.error('Registration Error:', error);
    } finally {
      setLoading(false);
    }

    // setTimeout(() => {
    //   try {
    //     console.log('Email', email);
    //     console.log('Password', password);
    //   } catch (err: any) {
    //     Alert.alert('Error', err.errors?.[0]?.message || 'Sign in failed');
    //     console.error(JSON.stringify(err, null, 2));
    //   } finally {
    //     setLoading(false);
    //     console.log('Sign In Successful');
    //     // login();
    //   }
    // }, 3000);
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require('@/assets/imgAuth/undraw_lightbulb-moment_16av.svg')}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* Form Container */}
          <Formik
            validationSchema={SignInSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => handleSignIn(values.email, values.password)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={authStyles.formContainer}>

                {/* Email Input */}
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.labelInput}>Email</Text>

                  <TextInput
                    style={authStyles.textInput}
                    placeholder="Enter email"
                    // value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"

                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {errors.email && (
                    <Text style={authStyles.errorText}>
                      *{errors.email}
                    </Text>
                  )}
                </View>

                {/* Password */}
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.labelInput}>Password</Text>
                  <TextInput
                    style={authStyles.textInput}
                    placeholder="Enter password"
                    // value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"

                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  {errors.password && (
                    <Text style={authStyles.errorText}>
                      *{errors.password}
                    </Text>
                  )}
                  {/* Show Password */}
                  <TouchableOpacity
                    style={authStyles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      corlor={COLORS.textLight}
                    />
                  </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                  style={[
                    authStyles.authButton,
                    loading && authStyles.buttonDisabled,
                  ]}
                  onPress={handleSubmit as any}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={authStyles.buttonText}>
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Text>
                  {/* {loading && (<ActivityIndicator />)} */}
                </TouchableOpacity>

                {/* Sign Up Link */}
                <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={() => router.push('SignUp' as never)}
                >
                  <Text style={authStyles.linkText}>
                    Don&apos;t have an account?{' '}
                    <Text style={authStyles.link}>Sign up</Text>
                  </Text>
                </TouchableOpacity>

              </View>
            )}
          </Formik>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;
