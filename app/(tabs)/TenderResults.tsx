import React from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TenderResults = () => {
    const whatsappNumber = '1234567890';

    return (
    <SafeAreaView className="flex-1 bg-[#1e4278]" edges={['top', 'left', 'right']}>
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
            {/* Dummy Card */}

            <View className='flex-1 rounded-t-2xl bg-[#f8fafc] dark:bg-slate-900'>
                <View className="pt-4">
                    <View className="mx-4 mt-4 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
                        <Text className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">
                            Tender Title
                        </Text>
                        <Text className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                            Construction of New Community Hall
                        </Text>
                        <Text className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">
                            Status
                        </Text>
                        <Text className="text-base font-medium text-green-600 dark:text-green-400 mb-4">
                            Awarded
                        </Text>
                        <Text className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">
                            Awarded To
                        </Text>
                        <Text className="text-base font-medium text-slate-700 dark:text-slate-300">
                            Acme Construction Ltd.
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TenderResults