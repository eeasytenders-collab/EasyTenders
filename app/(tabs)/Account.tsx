import { Ionicons } from '@expo/vector-icons'; // Only for chevron-forward
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import colors from '../../tailwindColors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Account() {
  const whatsappNumber = '1234567890';
  const router = useRouter();

  // const isDark = useColorScheme() === 'dark';
  const headerBg = colors.primary;

  const handleSignOut = () => {
    // Clear any stored session here (dummy placeholder)
    router.replace('/(auth)');
  };

  return (
  <SafeAreaView className="flex-1" style={{ backgroundColor: headerBg }} edges={['top', 'left', 'right']}>
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
  <View className="flex-1 rounded-t-3xl bg-bgLight dark:bg-slate-900">
        <View className="px-4 pt-4">
          {/* Profile Card */}
          <Pressable onPress={() => router.push('/(tabs)/Profile')} className="rounded-2xl bg-white dark:bg-slate-800 shadow-gray-200 dark:shadow-black/40 shadow-md">
            <View className="flex-row items-center px-4 py-4">
              <View className="h-16 w-16 mr-4 rounded-2xl overflow-hidden bg-cardBg items-center justify-center">
                <Image source={require('../../assets/icons/avatar.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
              </View>
              <View className="flex-1">
                <Text className="text-[20px] font-semibold text-slate-900 dark:text-slate-100">Sahil Chhabra</Text>
                <Text className="mt-1 text-slate-500 dark:text-slate-400">sahil@gmail.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
            </View>
            <View className="h-px bg-slate-200 dark:bg-slate-700" />
            <Pressable onPress={() => { }} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-orange-500 ">
                <Image source={require('../../assets/icons/lock-closed-outline.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-slate-900 dark:text-slate-100">Update Password</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </Pressable>
        </View>

        {/* Lists */}
        <View className="px-4 mt-4">
          <View className="rounded-2xl bg-white dark:bg-slate-800 shadow-black dark:shadow-black/40 shadow-md">
            <Pressable onPress={() => { }} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-purple">
                <Image source={require('../../assets/icons/blocked.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-slate-900 dark:text-slate-100">Blocklist</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
            <View className="h-px bg-slate-200 dark:bg-slate-700" />
            <Pressable onPress={() => { }} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-black">
                <Image source={require('../../assets/icons/moon-outline.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-slate-900 dark:text-slate-100">Dark Mode</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="rounded-2xl bg-white dark:bg-slate-800 shadow-black dark:shadow-black/40 shadow-md">
            <Pressable onPress={() => { }} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-green">
                <Image source={require('../../assets/icons/contact-us.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-slate-900 dark:text-slate-100">Contact Us</Text>
              <View className="ml-auto">
                <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
              </View>
            </Pressable>
          </View>
        </View>

        <View className="px-4 mt-4">
          <View className="rounded-2xl bg-white dark:bg-slate-800 shadow-black dark:shadow-black/40 shadow-md">
            <Pressable onPress={handleSignOut} className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl items-center justify-center mr-4 bg-red-600">
                <Image source={require('../../assets/icons/sign-out.png')} style={{ width: 22, height: 22, tintColor: 'white' }} />
              </View>
              <Text className="text-[17px] text-slate-900 dark:text-slate-100">Sign out</Text>
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