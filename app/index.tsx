import { Redirect } from "expo-router";

export default function Index() {
  const isSignedIn = true; // thử false để test

  if (!isSignedIn) {
    return <Redirect href="/(auth)/SignIn" />;
  }

  return <Redirect href="/(tabs)/Home" />;
}