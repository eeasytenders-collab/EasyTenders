import { Ionicons } from '@expo/vector-icons'; // Only for chevron-forward
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account() {
  const whatsappNumber = '1234567890';
  const router = useRouter();

  const handleSignOut = () => {
    // Clear any stored session here (dummy placeholder)
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1e4278]">
      {/* Header */}
      <View className='flex flex-row items-center justify-between px-4 mt-4 mb-8'>
                <Image
                  source={require('../../assets/images/Main/logo.png')}
                  style={{ width: 160, height: 40, resizeMode: 'contain' }}
                />
                <Pressable
                  className="p-2 rounded-xl bg-white/10"
                  onPress={() => {
                    Linking.openURL(`https://wa.me/${whatsappNumber}?text=Hello%20from%20EasyTenders`);
                  }}
                >
                  <Image
                    source={require('../../assets/icons/whatsapp-logo.png')}
                    style={{ width: 28, height: 28, resizeMode: 'contain' }}
                  />
                </Pressable>
              </View>

      {/* Sheet */}
      <View className="flex-1 bg-[#f8fafc] rounded-t-3xl">
        <View className="px-4 pt-4">
          {/* Profile Card */}
          <View className="rounded-2xl bg-white shadow-gray-200 shadow-md">
            <View className="flex-row items-center px-4 py-4">
              <View className="h-16 w-16 mr-4 rounded-2xl overflow-hidden bg-[#e2e8f0] items-center justify-center">
                {/* replace with real avatar if available */}
                <Image source={require('../../assets/icons/avatar.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
              </View>
              <View className="flex-1">
                <Text className="text-[20px] font-semibold text-[#0f172a]">Sahil Chhabra</Text>
                <Text className="text-[#64748b] mt-1">sahil@gmail.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#64748b" />
            </View>
            <View className="h-px bg-[#eef2f7]" />
            <Pressable onPress={() => {}} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-[#0ea5e9]">
                <Image source={require('../../assets/icons/lock-closed-outline.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-[#0f172a]">Update Password</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Lists */}
        <View className="px-4 mt-4">
          <View className="rounded-2xl bg-white shadow-black shadow-md">
            <Pressable onPress={() => {}} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-[#7c3aed]">
                <Image source={require('../../assets/icons/blocked.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-[#0f172a]">Blocklist</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
            <View className="h-px bg-[#eef2f7]" />
            <Pressable onPress={() => {}} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-[#0ea5e9]">
                <Image source={require('../../assets/icons/moon-outline.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-[#0f172a]">Dark Mode</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="rounded-2xl bg-white shadow-black shadow-md">
            <Pressable onPress={() => {}} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-[#16a34a]">
                <Image source={require('../../assets/icons/contact-us.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-[#0f172a]">Contact Us</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="rounded-2xl bg-white shadow-black shadow-md">
            <Pressable onPress={handleSignOut} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-[#ef4444]">
                <Image source={require('../../assets/icons/sign-out.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-[#0f172a]">Sign out</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}