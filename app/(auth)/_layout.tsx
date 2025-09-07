import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../../global.css";

import { useColorScheme } from '@/hooks/useColorScheme';
import colors from '../../tailwindColors';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colorScheme === 'dark' ? colors.slate900 : colors.white },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="Otp" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'light'} />
    </ThemeProvider>
  );
}