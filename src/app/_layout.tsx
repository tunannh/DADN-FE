// import SafeScreen from "@/components/SafeScreen";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <SafeScreen>
//       <Slot />
//     </SafeScreen>
//   )
// }

import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bgColor,
        },
        headerTintColor: COLORS.titleColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Welcome Page",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: "Trang chủ",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Device-infor"
        options={{
          headerTitle: "Device Information",
        }}
      />
      <Stack.Screen
        name="Add-device"
        options={{
          headerTitle: "Add Device",
        }}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerTitle: "Setting",
        }}
      />
    </Stack>
  );

}

export default RootLayout;