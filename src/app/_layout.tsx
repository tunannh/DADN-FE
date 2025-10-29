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
        name="device_actions/Device-infor"
        options={{
          headerTitle: "Device Information",
        }}
      />
      <Stack.Screen
        name="device_actions/Add-device"
        options={{
          headerTitle: "Add Device",
        }}
      />
      <Stack.Screen
        name="setting/setting"
        options={{
          headerTitle: "Setting",
        }}
      />
      <Stack.Screen
        name="manage_user/ManageUser"
        options={{
          headerTitle: "Manage User",
        }}
      />
    </Stack>
  );

}

export default RootLayout;