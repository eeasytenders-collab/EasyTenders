import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getStatusColor = (status: string) => {
    if (!status) return '#64748b';
    const s = status.toLowerCase();
    if (s === 'awarded') return '#22c55e'; // green
    if (s === 'in progress') return '#eab308'; // yellow
    if (s === 'pending') return '#ef4444'; // red
    return '#64748b';
};

const TenderResults = () => {
    const whatsappNumber = '1234567890';
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.EXPO_PUBLIC_API_URL || '';
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setLoading(true);
            axios.get(`${API_URL}/tenderResults`)
                .then(res => {
                    if (isActive) {
                        setResults(Array.isArray(res.data) ? res.data : []);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    if (isActive) {
                        setResults([]);
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
            {/* Tender Results List */}
            <View className='flex-1 rounded-t-2xl bg-bgLight dark:bg-slate-900'>
                {loading ? (
                    <View className="flex-1 items-center justify-center py-10">
                        <ActivityIndicator size="large" color="#1e4278" />
                    </View>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item, idx) => (item.id ? item.id.toString() : idx.toString())}
                        contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
                        ListEmptyComponent={
                            <Text className="text-center text-gray-500 dark:text-gray-400 mt-10">No tender results found</Text>
                        }
                        renderItem={({ item }) => (
                            <View className="mx-4 mt-4 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
                                <Text className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                    Tender Title - <Text className="text-lg font-semibold text-slate-500 dark:text-slate-400 mb-4">{item.title}</Text>
                                </Text>
                                <Text className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                    Status - <Text
                                        className="text-lg font-semibold mb-4"
                                        style={{ color: getStatusColor(item.status) }}
                                    >
                                        {item.status}
                                    </Text>
                                </Text>
                                <Text className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                                    Awarded To - <Text className="text-lg font-semibold text-slate-500 dark:text-slate-400 mb-4">{item.awardedTo}</Text>
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}

export default TenderResults