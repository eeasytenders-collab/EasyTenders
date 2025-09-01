import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  // Demo data – swap with real user profile
  const user = {
    name: 'Sahil Chhabra',
    id: '#1254254',
    phone: '+91 3285458985',
    email: 'sahil@gmail.com',
    address: 'Mansarover, jaipur Rajasthan',
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-[#1e4278]' : 'bg-[#1e4278]'}`}>
      {/* Header */}
      <View className="px-4 pb-3">
              <View className="flex-row items-center py-5">
                <Pressable
                  onPress={() => router.replace('/(tabs)/Account')}
                  className="h-10 w-10 rounded-full items-center justify-center"
                  android_ripple={{ color: "#2a5aa0" }}
                >
                  <Image
                    source={require('../../assets/icons/back-arrow.png')}
                    className="h-4 w-6 object-cover"
                  />
                </Pressable>
                <Text className="text-white text-2xl font-semibold ml-2">Profile</Text>
              </View>
            </View>

      {/* White sheet */}
      <View className="flex-1 bg-[#f8fafc] dark:bg-slate-800 rounded-t-3xl">
        <View className="px-4 pt-4">
          <View className="rounded-2xl bg-white dark:bg-slate-700 shadow-black/40 shadow-sm overflow-hidden">
            {/* Header row inside card */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-16 w-16 rounded-2xl overflow-hidden bg-[#e2e8f0] items-center justify-center mr-4">
                <Image source={require('../../assets/icons/avatar.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />

              </View>
              <View className="flex-1">
                <Text className="text-[20px] font-semibold text-[#0f172a] dark:text-white">{user.name}</Text>
                <Text className="text-[#64748b] dark:text-slate-300 mt-1">{user.id}</Text>
              </View>
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Name row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#2563eb] items-center justify-center mr-4">
                <Ionicons name="person-outline" size={20} color="#ffffff" />
              </View>
              <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.name}</Text>
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Phone row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#f59e0b] items-center justify-center mr-4">
                <Ionicons name="call-outline" size={20} color="#ffffff" />
              </View>
              <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.phone}</Text>
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Email row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#6d28d9] items-center justify-center mr-4">
                <Ionicons name="mail-outline" size={20} color="#ffffff" />
              </View>
              <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.email}</Text>
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Address row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#16a34a] items-center justify-center mr-4">
                <Ionicons name="location-outline" size={20} color="#ffffff" />
              </View>
              <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.address}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}