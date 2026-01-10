/**
 * Auth Layout
 */

import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/stores/auth';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  // Redirect to main app if already authenticated
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
