// import SafeScreen from "@/components/SafeScreen";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <SafeScreen>
//       <Slot />
//     </SafeScreen>
//   )
// }

import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
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
    </Stack>
  );

}

export default RootLayout;