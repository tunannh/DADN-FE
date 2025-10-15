import { Redirect, router } from "expo-router";
import { Button, StyleSheet, Text, View, ImageBackground } from "react-native";
import smartfarm_bg from "@/assets/bg-image/smartfarm-bg.png"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 310,
    gap: 20
  },
  app_name: {
    fontSize: 46,
    color: "white",
    textAlign: 'center'
  }
})
const WelcomePage = () => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={smartfarm_bg}
    >
      <View style={styles.container}>
        <Text style={styles.app_name}>Smart farm</Text>
        <Button title={"Vào trang chủ"} onPress={() => router.navigate("/(tabs)/Home")} />
        <Button title={"Sign in"} onPress={() => router.navigate("/(auth)/SignIn")} />
        <Button title={"Sign up"} onPress={() => router.navigate("/(auth)/SignUp")} />
      </View>
    </ImageBackground>
  )
}

export default WelcomePage;