import { HapticTab } from '@/components/HapticTab';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Platform } from 'react-native';
import * as SystemUI from 'expo-system-ui';


export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SystemUI.setBackgroundColorAsync('#1e4278');
    }
  }, []);
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff', // White icons when active
        tabBarInactiveTintColor: '#fff', // White icons when inactive
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#1e4278', // Tailwind blue-600
          borderTopWidth: 0,
          position: 'absolute',
          paddingBottom: Platform.OS === 'android' ? 32 : 0, // increased from 24 to 32
          height: Platform.OS === 'android' ? 72 : 80, // increase height on Android
        },
        tabBarLabelStyle: {
          marginTop: 6,
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Image
            source={require('../../assets/icons/home.png')}
            style={{ width: 24, height: 24, tintColor: color }}
          />,
        }}
      />
      <Tabs.Screen
        name="TenderResults"
        options={{
          title: 'Tender Results',
          tabBarIcon: ({ color }) => <Image
            source={require('../../assets/icons/tender-results.png')}
            style={{ width: 24, height: 24, tintColor: color }}
          />,
        }}
      />
      <Tabs.Screen
        name="Notices"
        options={{
          title: 'Notices',
          tabBarIcon: ({ color }) => <Image
            source={require('../../assets/icons/notices.png')}
            style={{ width: 24, height: 24, tintColor: color }}
          />,
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <Image
            source={require('../../assets/icons/account.png')}
            style={{ width: 24, height: 24, tintColor: color }}
          />,
        }}
      />
      <Tabs.Screen
        name="TenderList"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="Filter"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="TenderDetails"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="Profile"
        options={{ href: null, headerShown: false }}
      />
    </Tabs>
  );
}
