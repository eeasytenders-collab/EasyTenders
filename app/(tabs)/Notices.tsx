import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notices = () => {
    const whatsappNumber = '1234567890';
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.EXPO_PUBLIC_API_URL || '';
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            axios.get(`${API_URL}/notices`)
                .then(res => {
                    if (isActive) {
                        setNotices(Array.isArray(res.data) ? res.data : []);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    if (isActive) {
                        setNotices([]);
                        setLoading(false);
                    }
                });
            return () => { isActive = false; };
        }, [API_URL])
    );

    return (
        <SafeAreaView className="flex-1 bg-primary" edges={['top', 'left', 'right']}>
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
            {/* Main Content */}
            <ScrollView className="flex-1 rounded-t-2xl bg-bgLight dark:bg-slate-900 px-2 pt-4">
                <View className='mx-4 mt-4 '>
                    {loading ? (
                        <View className="flex-1 items-center justify-center py-10">
                            <ActivityIndicator size="large" color="#1e4278" />
                        </View>
                    ) : notices.length > 0 ? (
                        notices.map((notice, idx) => (
                            <View key={notice.id || idx} className="mb-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
                                <Text className="text-xl font-semibold text-gray-900 dark:text-white">{notice.title}</Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">{notice.date}</Text>
                                <Text className="text-gray-700 dark:text-gray-300">{notice.description}</Text>
                            </View>
                        ))
                    ) : (
                        <Text className="text-center text-gray-500 dark:text-gray-400 mt-10">No notices found</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notices