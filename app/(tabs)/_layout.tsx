import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="TenderResults"
        options={{
          title: 'Tender Results',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="text-account" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Notices"
        options={{
          title: 'Notices',
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={28} color={color}/>,
        }}
      />
    </Tabs>
  );
}
