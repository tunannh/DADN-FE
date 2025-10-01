import SafeScreen from "@/src/components/SafeScreen";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  )
}
