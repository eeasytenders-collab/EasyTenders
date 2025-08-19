import { HapticTab } from '@/components/HapticTab';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';


export default function TabLayout() {
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
        },
        tabBarLabelStyle: {
          marginTop: 6, // Add gap between icon and label
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
    </Tabs>
  );
}
