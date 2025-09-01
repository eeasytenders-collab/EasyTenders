import RecentTenderCard from '@/components/custom/TenderCards';
import recentTenders from '@/data/recentTenders';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const whatsappNumber = '1234567890';
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const recent = React.useMemo(() => {
    return [...recentTenders]
      .sort((a, b) => new Date(b.closingOn).getTime() - new Date(a.closingOn).getTime())
      .slice(0, 5);
  }, []);
  return (
    <SafeAreaView className='flex-1 bg-[#1e4278]' >
      <StatusBar style={isDark ? 'light' : 'light'} />
      <View className='flex-1'>

        {/* Header / Logo */}
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

        {/* White body container */}
        <View className='rounded-2xl flex-1 bg-white dark:bg-black/60'>

          {/* Summary tiles */}
          <View className='flex flex-row flex-wrap justify-between gap-4 mb-10 mt-3 px-4 pt-4'>
            <View className='flex flex-row w-[47%] h-28 rounded-2xl bg-[#2cbbbb]'>
              <View className='w-1/2 items-center justify-center text-left h-full'>
                <Text className='text-white font-black text-5xl'>12</Text>
                <Text className='text-white'>Active</Text>
              </View>
              <View className='flex flex-row w-1/2 h-full items-center justify-start'>
                <View className='w-1/2' />
                <View className='h-1/2'>
                  <Image
                    source={require('../../assets/icons/right-arrow.png')}
                    className='h-7 w-7 object-contain'
                  />
                </View>
              </View>
            </View>

            <View className='flex flex-row w-[47%] h-28 rounded-2xl bg-[#fe7d50]'>
              <View className='w-1/2 items-center justify-center text-left h-full'>
                <Text className='text-white font-black text-5xl'>08</Text>
                <Text className='text-white'>Archived</Text>
              </View>
              <View className='flex flex-row w-1/2 h-full items-center justify-start'>
                <View className='w-1/2' />
                <View className='h-1/2'>
                  <Image
                    source={require('../../assets/icons/right-arrow.png')}
                    className='h-7 w-7 object-contain'
                  />
                </View>
              </View>
            </View>

            <View className='flex flex-row w-[47%] h-28 rounded-2xl bg-[#fa6989]'>
              <View className='w-1/2 items-center justify-center text-left h-full'>
                <Text className='text-white font-black text-5xl'>04</Text>
                <Text className='text-white'>Followed</Text>
              </View>
              <View className='flex flex-row w-1/2 h-full items-center justify-start'>
                <View className='w-1/2' />
                <View className='h-1/2'>
                  <Image
                    source={require('../../assets/icons/right-arrow.png')}
                    className='h-7 w-7 object-contain'
                  />
                </View>
              </View>
            </View>
          </View>
          <View className='items-center justify-center'>
            <Pressable onPress={() => router.push('/(tabs)/Filter')} className='border px-2 py-1 rounded-full flex flex-row items-center border-blue-900 dark:border-blue-300'>
              <Text className='text-sm text-slate-900 dark:text-slate-100'>Filters</Text>
            </Pressable>
          </View>
          {/* List */}
          <View className='flex-1'>
            <View className='flex flex-row justify-between items-center px-4'>
              <Text className='text-xl text-slate-900 dark:text-slate-100'>Recently Added Tenders</Text>
              <Pressable onPress={() => router.push('/(tabs)/TenderList')}>
                <Text className='text-sm underline text-blue-900 dark:text-blue-300'>See All</Text>
              </Pressable>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ paddingTop: 12, paddingBottom: 24, rowGap: 16 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              overScrollMode="always"    // Android
              bounces                     // iOS
            >
              <View className="gap-4 px-4">
                {recent.map((tender, index) => (
                  <View key={index} className='rounded-2xl shadow-black shadow-lg'>
                    <RecentTenderCard
                      index={index}
                      title={tender.title}
                      tags={tender.tags}
                      category={tender.category}
                      address={tender.address}
                      closingOn={tender.closingOn}
                      amountText={tender.amountText}
                      onMenuPress={() => { }}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;