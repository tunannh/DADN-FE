import { router } from "expo-router";
import { useEffect } from "react";
import { getProfileAPI } from "@/utils/api";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const RootPage = () => {

  useEffect(() => {
    async function prepare() {
      try {
        const response = await getProfileAPI();
        if (response.data) {
          const role = response.data.role;
          if (role === 'admin') router.replace("/(admin)/ManageUser");
          else if (role === 'gardener') router.replace("/(tabs)/Home");
          else router.replace("/(auth)/Welcome");
        }
        else {
          router.replace("/(auth)/Welcome");
        }
      } catch (error) {
        router.replace("/(auth)/Welcome");
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);
  return (
    <>
    </>
  )
}

export default RootPage;