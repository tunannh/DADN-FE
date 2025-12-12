import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Libraries
import { Formik } from 'formik';

// Styles & Constants
import { COLORS } from '@/constants/colors';
import { authStyles } from '@/assets/styles/auth.style';
import { SignInSchema } from '@/utils/validate.schema';

// Controller & Types
import { useSignInController } from '@/controllers/useSignInController';
import { SignInFormValues } from '@/types/auth';

const SignInScreen = () => {
  const router = useRouter(); // Chỉ dùng để navigate trang Sign Up (link text)
  
  const { 
    loading, 
    showPassword, 
    togglePasswordVisibility, 
    handleSignIn 
  } = useSignInController();

  const initialValues: SignInFormValues = { email: '', password: '' };

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
          {/* Header Image */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require('@/assets/imgAuth/undraw_lightbulb-moment_16av.svg')}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          {/* Formik Setup */}
          <Formik
            validationSchema={SignInSchema}
            initialValues={initialValues}
            onSubmit={handleSignIn}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={authStyles.formContainer}>

                {/* --- Email Input --- */}
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.labelInput}>Email</Text>
                  <TextInput
                    style={authStyles.textInput}
                    placeholder="Enter email"
                    placeholderTextColor="#A1A1A1"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={authStyles.errorText}>*{errors.email}</Text>
                  )}
                </View>

                {/* --- Password Input --- */}
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.labelInput}>Password</Text>
                  <TextInput
                    style={authStyles.textInput}
                    placeholder="Enter password"
                    placeholderTextColor="#A1A1A1"
                    secureTextEntry={!showPassword} // Dùng state từ Controller
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={authStyles.errorText}>*{errors.password}</Text>
                  )}
                  
                  {/* Eye Button */}
                  <TouchableOpacity
                    style={authStyles.eyeButton}
                    onPress={togglePasswordVisibility} // Gọi hàm từ Controller
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color={COLORS.textLight} // Sửa lỗi chính tả 'corlor' -> 'color'
                    />
                  </TouchableOpacity>
                </View>

                {/* --- Sign In Button --- */}
                <TouchableOpacity
                  style={[
                    authStyles.authButton,
                    loading && authStyles.buttonDisabled,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={authStyles.buttonText}>
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Text>
                </TouchableOpacity>

                {/* --- Sign Up Link --- */}
                <TouchableOpacity
                  style={authStyles.linkContainer}
                  onPress={() => router.push('/SignUp' as never)} // Đảm bảo đường dẫn đúng
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