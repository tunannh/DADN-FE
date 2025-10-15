import SafeScreen from '@/components/SafeScreen';
import { Stack } from 'expo-router';
import React from 'react';

const AuthRoutesLayout = () => {
  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  );
};

export default AuthRoutesLayout;
