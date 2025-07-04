import { Stack } from 'expo-router/stack';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="connect-accounts" />
      <Stack.Screen name="voice-setup" />
      <Stack.Screen name="permissions" />
    </Stack>
  );
}