import React from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notices = () => {
    const whatsappNumber = '1234567890';
    const dummyNotices = [
        {
            id: 1,
            title: 'Tender Opening Notice',
            date: '2024-06-01',
            description: 'The tender opening for project XYZ will be held on June 10, 2024.'
        },
        {
            id: 2,
            title: 'Bid Submission Deadline',
            date: '2024-06-05',
            description: 'All bids must be submitted by June 15, 2024, 5:00 PM.'
        },
        {
            id: 3,
            title: 'Pre-bid Meeting',
            date: '2024-06-03',
            description: 'A pre-bid meeting will be conducted on June 8, 2024, at 10:00 AM.'
        }
    ];

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
            {/* Main Content */}
            <ScrollView className="flex-1 rounded-t-2xl bg-[#f8fafc] dark:bg-slate-900 px-2 pt-4">
                <View className='mx-4 mt-4 '>
                    {dummyNotices.map(notice => (
                        <View key={notice.id} className="mb-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
                            <Text className="text-xl font-semibold text-gray-900 dark:text-white">{notice.title}</Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">{notice.date}</Text>
                            <Text className="text-gray-700 dark:text-gray-300">{notice.description}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notices