import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  const getIcon = (routeName: string, focused: boolean, size: number) => {
    if (routeName === 'Home') {
      return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
    };
    if (routeName === 'Devices') {
      return <Ionicons name={focused ? 'hardware-chip' : 'hardware-chip-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
    };
    if (routeName === 'Profile') {
      return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
    };
    if (routeName === 'SetThreshold') {
      return <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
    };
    if (routeName === 'ViewData') {
      return <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
    }
  }
  return (

    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          return getIcon(route.name, focused, size);
        },
        tabBarActiveTintColor: COLORS.buttonBackground,
        // tabBarInactiveTintColor: '#D0D0D0',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="Devices"
        options={{
          title: 'Devices',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="SetThreshold"
        options={{
          title: 'Threshold',
        }}
      />
      <Tabs.Screen
        name="ViewData"
        options={{
          title: 'Data',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
