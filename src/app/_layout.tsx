import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="cadastro"></Stack.Screen>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
