import { COLORS } from "@/constants/colors";
import DeviceProvider from "@/utils/devices.context";
import AutoStatusProvider from "@/utils/useAutoStatus.context";
import { Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";


const RootLayout = () => {
  return (
    <AutoStatusProvider>
      <RootSiblingParent>
        <DeviceProvider>
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
                headerTitle: "Root Page",
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
              name="(admin)"
              options={{
                headerTitle: "Admin Panel",
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
              name="notification/notification"
              options={{
                headerTitle: "Notification",
              }}
            />
          </Stack>
        </DeviceProvider>
      </RootSiblingParent>
    </AutoStatusProvider>
  );

}

export default RootLayout;