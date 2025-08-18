import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [input, setInput] = useState('');
    const [whatsapp, setWhatsapp] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleGetOtp = () => {
        if (!input.trim()) {
            setError('Please enter your email or mobile number.');
            return;
        }
        setError('');
        router.push({
            pathname: '/(auth)/Otp',
            params: { input, whatsapp: whatsapp ? '1' : '0' },
        });
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Topmost illustration, outside SafeAreaView */}
            <Image
                source={require('../../assets/images/Login/login-bg.png')}
                style={[
                    StyleSheet.absoluteFillObject,
                    { width: '100%', height: 400, resizeMode: 'cover', zIndex: -1 }
                ]}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <View className='flex items-center justify-center h-full gap-y-2 px-6'>
                    <Image
                        source={require('../../assets/images/Login/login-logo.png')}
                        style={{ width: 220, height: 160, resizeMode: 'contain' }}
                        className='m-10'
                    />
                    <Text className='text-xl font-semibold mt-2'>Let&apos;s get started</Text>
                    <Text className='text-md text-slate-500 font-semibold mb-6 text-center'>Get Alerts for Latest Tenders on your Mobile</Text>

                    <View className="w-full m-10">
                        <Text className="text-base text-slate-500 mb-1">Email/Mobile Number</Text>
                        <TextInput
                            className="text-lg pb-4 font-semibold"
                            value={input}
                            onChangeText={text => {
                                setInput(text);
                                if (error) setError('');
                            }}
                            keyboardType="default"
                            autoCapitalize="none"
                            style={{ borderBottomWidth: 1, borderBottomColor: '#cbd5e1' }}
                        />
                        {error ? (
                            <Text className="text-red-500 text-sm mt-1">{error}</Text>
                        ) : null}
                    </View>

                    {/* Check button for WhatsApp alerts */}
                    <View className='w-full items-center justify-end -mb-28'>
                        <Pressable
                            className="flex-row justify-center items-center w-full mb-4 mt-8"
                            onPress={() => setWhatsapp(!whatsapp)}
                        >
                            <View
                                className={`flex w-6 h-6 rounded bg-[#1e4278] items-center justify-center mr-2`}
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

                        <TouchableOpacity
                            className="w-[90%] bg-[#1e4278] rounded-lg py-3 mt-2 items-center"
                            onPress={handleGetOtp}
                        >
                            <Text className="text-white text-lg font-bold">Get OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="w-fit mt-8 items-center"
                            onPress={() => setModalVisible(true)}
                        >
                            <Text className='text-sm text-[#1e4278] font-semibold'>
                                <Text>Terms & Conditions</Text> and <Text>Privacy Policy</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Modal for T&C and Privacy Policy */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 bg-black/40 justify-end">
                        <View className="bg-white rounded-t-2xl p-6 max-h-[80%]">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-lg font-bold text-[#1e4278]">Terms & Conditions and Privacy Policy</Text>
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={24} color="#1e4278" />
                                </Pressable>
                            </View>
                            <ScrollView className="mb-2">
                                <Text className="text-slate-700 text-base mb-2">
                                    {/* Replace this with your actual T&C and Privacy Policy */}
                                    Welcome to easyTender! By using our app, you agree to our Terms & Conditions and Privacy Policy.
                                    We respect your privacy and will never share your information without consent.
                                    For full details, please visit our website or contact support.
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                className="w-full bg-[#1e4278] rounded-lg py-2 mt-2 items-center"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-white text-base font-semibold">Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    )
}

export default Login