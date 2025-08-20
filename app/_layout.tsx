import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';
import "../global.css";

import { useColorScheme } from '@/hooks/useColorScheme';

import * as SplashScreen from 'expo-splash-screen';
import CustomSplash from '../components/custom/SplashScreen';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [showCustomSplash, setShowCustomSplash] = React.useState(true);

  React.useEffect(() => {
    const hideNative = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, 0);
    const timer = setTimeout(() => setShowCustomSplash(false), 3000);
    return () => {
      clearTimeout(hideNative);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="flex-1">
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modals/tenderList"
            options={{ headerShown: false, presentation: 'fullScreenModal' }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        {showCustomSplash && (
          <View className="absolute inset-0 z-50">
            <CustomSplash />
          </View>
        )}
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
