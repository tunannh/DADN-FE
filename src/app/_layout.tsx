import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message'; // <-- Import mới

const RootLayout = () => {
  return (
    <>
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
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        {/* Các màn hình khác giữ nguyên */}
        <Stack.Screen
          name="device_actions/Device-infor"
          options={{ headerTitle: "Device Information" }}
        />
        <Stack.Screen
          name="device_actions/Add-device"
          options={{ headerTitle: "Add Device" }}
        />
        <Stack.Screen
          name="setting/setting"
          options={{ headerTitle: "Setting" }}
        />
        <Stack.Screen
          name="manage_user/ManageUser"
          options={{ headerTitle: "Manage User" }}
        />
      </Stack>

      {/* Đặt Toast ở đây để nó luôn nằm trên cùng */}
      <Toast />
    </>
  );
}

export default RootLayout;