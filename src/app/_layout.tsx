import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";

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