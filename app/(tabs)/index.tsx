import RecentTenderCard from '@/components/custom/recentTenderCards';
import recentTenders from '@/data/recentTenders';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView className='bg-[#1e4278] flex-1'>
      <StatusBar style="light" />
      <View className='flex-1'>

        {/* Header / Logo */}
        <View className='flex px-4'>
          <Image
            source={require('../../assets/images/Main/logo.png')}
            style={{ width: 160, height: 40, resizeMode: 'contain' }}
            className='mt-4 mb-8'
          />
        </View>

        {/* White body container */}
        <View className='rounded-2xl bg-white flex-1'>

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

          {/* List */}
          <View className='flex-1'>
            <View className='flex flex-row justify-between items-center px-4'>
              <Text className='text-xl'>Recently Added Tenders</Text>
              <Pressable onPress={() => router.push('/modals/tenderList')}>
                <Text className='text-sm text-blue-900 underline'>See All</Text>
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
                {recentTenders.map((tender, index) => (
                  <View key={index} className='rounded-2xl shadow-black shadow-lg'>
                    <RecentTenderCard
                      title={tender.title}
                      tags={tender.tags}
                      category={tender.category}
                      address={tender.address}
                      closingOn={tender.closingOn}
                      amountText={tender.amountText}
                      onPress={() => { }}
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