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
import { Formik } from 'formik';
import { SignUpSchema } from '@/utils/validate.schema';

const SignUp = () => {
  const router = useRouter();

  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const toastShow = (message: string, color: string) => {
    Toast.show(message, {
      duration: 2000,
      animation: true,
      backgroundColor: color,
      opacity: 1,
      position: -60,
    })
  }
  const handleSignUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await registerAPI(name, email, password);
      if (response.data) { // response.status === 200
        toastShow('Account created successfully! Please sign in.', '#04B20C');
        setTimeout(() => {
          router.replace('/(auth)/SignIn');
        }, 1000);

      }
      else { // email already exists
        toastShow('Sign Up failed! Email is invalid or already exists.', '#E13F33');
      }
    } catch (error) {
      console.error('Registration Error:', error);
    } finally {
      setLoading(false);
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

          <Text style={authStyles.title}>Create Account</Text>

          <Formik
            validationSchema={SignUpSchema}
            initialValues={{ name: '', email: '', password: '' }}
            onSubmit={values => handleSignUp(values.name, values.email, values.password)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={authStyles.formContainer}>

                {/* Name Input */}
                <View style={authStyles.inputContainer}>
                  <Text style={authStyles.labelInput}>Name</Text>
                  <TextInput
                    style={authStyles.textInput}
                    placeholder="Enter name"
                    onChangeText={handleChange('name')}
                    value={values.name}
                    autoCapitalize="none"
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
                    style={authStyles.textInput}
                    placeholder="Enter email"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                    style={authStyles.textInput}
                    placeholder="Enter password"
                    onChangeText={handleChange('password')}
                    value={values.password}
                    secureTextEntry={!showPassword}
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

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[
                    authStyles.authButton,
                  ]}
                  onPress={handleSubmit as any}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Text style={authStyles.buttonText}>
                    {loading ? 'Signing up...' : 'Sign up'}
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
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
