import TenderCard from '@/components/custom/TenderCards';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, Pressable, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const whatsappNumber = '1234567890';
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';

  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.EXPO_PUBLIC_API_URL || '';
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setLoading(true);
      axios.get(`${API_URL}/tenderData`)
        .then(res => {
          if (isActive) {
            setTenders(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
          }
        })
        .catch((err) => {
          // console.log(err);
          if (isActive) {
            setTenders([]);
            setLoading(false);
          }
        });
      return () => { isActive = false; };
    }, [API_URL])
  );

  const recent = useMemo(() => {
    return [...tenders]
      .sort((a, b) => new Date(b.closingOn).getTime() - new Date(a.closingOn).getTime())
      .slice(0, 5);
  }, [tenders]);

  return (
    <SafeAreaView className='flex-1 bg-primary' edges={['top', 'left', 'right']}>
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
        <View className={`rounded-t-2xl flex-1 bg-white dark:bg-black/60`}>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#1e4278" />
            </View>
          ) : (
            <FlatList
              data={recent}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={{}}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                  {/* Summary tiles */}
                  <View className='flex flex-row flex-wrap justify-between gap-4 mb-10 mt-3 px-4 pt-4'>
                    <View className='flex flex-row w-[47%] h-28 rounded-2xl bg-accent'>
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

                    <View className='flex flex-row w-[47%] h-28 rounded-2xl bg-warning'>
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

                    <View className='flex flex-row w-[47%] h-28 rounded-2xl bg-danger'>
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
                  <View className='items-end justify-center px-2'>
                    <Pressable onPress={() => router.push('/(tabs)/Filter')} className='border px-2 py-1 rounded-full flex flex-row items-center border-primary dark:border-white'>
                      <Text className='text-sm text-slate-900 dark:text-slate-100'>Filters</Text>
                    </Pressable>
                  </View>
                  {/* List Title */}
                  <View className='flex flex-row justify-between items-center px-4 mt-4'>
                    <Text className='text-xl text-slate-900 dark:text-slate-100 mb-4'>Recently Added Tenders</Text>
                    <Pressable onPress={() => router.push('/(tabs)/TenderList')}>
                      <Text className='text-sm underline text-primary dark:text-white'>See All</Text>
                    </Pressable>
                  </View>
                </>
              }
              renderItem={({ item, index }) => (
                <View className='rounded-t-2xl shadow-black shadow-lg px-4 pb-4'>
                  <TenderCard
                    index={index}
                    title={item.title}
                    tags={item.tags}
                    category={item.category}
                    address={item.address}
                    closingOn={item.closingOn}
                    amountText={item.amountText}
                    onMenuPress={() => { }}
                  />
                </View>
              )}
              ListEmptyComponent={
                <Text className="text-center mt-10 text-slate-500 dark:text-slate-400">No tenders found</Text>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;