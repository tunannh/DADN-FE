import { COLORS } from '@/constants/colors';
import { authStyles } from '@/assets/styles/auth.style';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  // ActivityIndicator,
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
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginAPI(email, password);
      if (response.data) { // response.status === 200
        await AsyncStorage.setItem('access_token', response.data.access_token);
        // set_access_token(response.data.access_token);

        if (response.data.role === 'admin') {
          router.replace('/(admin)/ManageUser');
        } else {
          router.replace('/(tabs)/Home');
        }
      }
      else { // email or password incorrect
        Alert.alert('Sign in failed', 'Email or password is incorrect.');
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
                    style={[authStyles.textInput, { borderColor: isFocusEmail ? COLORS.primary : COLORS.borderColor }]}
                    placeholder="Enter email"
                    // value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"

                    onChangeText={handleChange('email')}
                    onFocus={() => setIsFocusEmail(true)}
                    onBlur={() => { handleBlur('email'); setIsFocusEmail(false) }}
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
                    style={[authStyles.textInput, { borderColor: isFocusPassword ? COLORS.primary : COLORS.borderColor }]}
                    placeholder="Enter password"
                    // value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    onFocus={() => setIsFocusPassword(true)}
                    onBlur={() => { handleBlur('password'); setIsFocusPassword(false) }}
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
                {/* <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={() => router.push('SignUp' as never)}
                >
                  <Text style={authStyles.linkText}>
                    Don&apos;t have an account?{' '}
                    <Text style={authStyles.link}>Sign up</Text>
                  </Text>
                </TouchableOpacity> */}

              </View>
            )}
          </Formik>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignInScreen;
