import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
    return (
        <SafeAreaView className='bg-[#1e4278] h-full'>
            <View className='h-full'>
                <View className='flex px-4'>
                    <Image
                        source={require('../../assets/images/Main/logo.png')}
                        style={{ width: 160, height: 40, resizeMode: 'contain' }}
                        className='mt-4 mb-8'
                    />
                </View>
                <View className='rounded-2xl bg-white h-full p-4'>
                    <Text className='text-base'>Welcome to the Home Screen</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home