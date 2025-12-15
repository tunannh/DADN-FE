import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabsLayout = () => {
    const getIcon = (routeName: string, focused: boolean, size: number) => {
        if (routeName === 'ManageUser') {
            return <MaterialCommunityIcons name={focused ? 'account-group' : 'account-group-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
        };
        if (routeName === 'ProfileAdmin') {
            return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={focused ? COLORS.buttonBackground : "#707B81"} />;
        };

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
                name="ManageUser"
                options={{
                    title: 'Manage Users',
                }}
            />
            <Tabs.Screen
                name="ProfileAdmin"
                options={{
                    title: 'Profile',
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
