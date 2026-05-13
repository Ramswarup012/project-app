import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="biometric" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />
        <Stack.Screen name="notification" options={{ headerShown: false }} />
        <Stack.Screen name="csheadshot" options={{ headerShown: false }} />
        <Stack.Screen name="lw" options={{ headerShown: false }} />
        <Stack.Screen name="lwhead" options={{ headerShown: false }} />
        <Stack.Screen name="brsurvival" options={{ headerShown: false }} />
        <Stack.Screen name="br" options={{ headerShown: false }} />
        <Stack.Screen name="csbody" options={{ headerShown: false }} />
        <Stack.Screen name="freemaches" options={{ headerShown: false }} />
        <Stack.Screen name="challenge" options={{ headerShown: false }} />
        <Stack.Screen name="earn" options={{ headerShown: false }} />
        <Stack.Screen name="leaderboard" options={{ headerShown: false }} />
        <Stack.Screen name="menu" options={{ headerShown: false }} /> 
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
