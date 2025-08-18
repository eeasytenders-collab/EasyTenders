import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [input, setInput] = useState('');
    const [whatsapp, setWhatsapp] = useState(false);

    return (
        <SafeAreaView>
            <View className='flex items-center justify-center h-full gap-y-2 px-6'>
                <View className='w-full flex items-center justify-center h-1/4'>
                    {/* <Ionicons name="placeholders" size={64} color="#25D366" /> */}
                </View>
                <Text className='text-5xl font-bold text-[#1e4278] mb-20'>easyTender</Text>
                <Text className='text-xl font-semibold'>Let&apos;s get started</Text>
                <Text className='text-md text-slate-500 font-semibold mb-6'>Get Alerts for Latest Tenders on your Mobile</Text>

                <View className="w-full mb-6 mt-10">
                    <Text className="text-base text-slate-500 mb-1">Email/Mobile Number</Text>
                    <TextInput
                        className="text-xl pb-1"
                        value={input}
                        onChangeText={setInput}
                        keyboardType="default"
                        autoCapitalize="none"
                        style={{ borderBottomWidth: 1, borderBottomColor: '#cbd5e1' }}
                    />
                </View>

                {/* Check button for WhatsApp alerts */}
                <Pressable
                    className="flex-row items-center w-full mb-4 mt-20"
                    onPress={() => setWhatsapp(!whatsapp)}
                >
                    <View
                        className={`w-6 h-6 rounded bg-[#1e4278] items-center justify-center mr-2`}
                        style={{
                            borderWidth: 0,
                        }}
                    >
                        {whatsapp && (
                            <Ionicons name="checkmark" size={18} color="#fff" />
                        )}
                    </View>
                    <Text className="text-base text-slate-500">Also get alerts on Whatsapp</Text>
                </Pressable>

                <Link
                    href="/(tabs)"
                    asChild
                >
                    <TouchableOpacity className="w-full bg-[#1e4278] rounded-lg py-3 mt-2 items-center">
                        <Text className="text-white text-lg font-bold">Get OTP</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default Login