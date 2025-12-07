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
import { useUserTokenContext } from '@/utils/userToken.context';

const SignInScreen = () => {
  const router = useRouter();
  const { set_access_token, set_token_type } = useUserTokenContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  const toastShow = (message: string, color: string) => {
    Toast.show(message, {
      duration: 2000,
      animation: true,
      backgroundColor: color,
      opacity: 1,
      position: -60,
    })
  }
  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginAPI(email, password);
      if (response.data) { // response.status === 200
        toastShow('Signed in successfully', '#04B20C');

        set_access_token(response.data.access_token);
        set_token_type(response.data.token_type);

        setTimeout(() => {
          router.replace('/(tabs)/Home');
        }, 300);
      }
      else { // email or password incorrect
        toastShow('Sign In failed! Email or password is incorrect.', '#E13F33');
      }
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
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
