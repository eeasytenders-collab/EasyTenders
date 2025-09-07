
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme
} from 'react-native';
import colors from '../../tailwindColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [input, setInput] = useState('');
    const [whatsapp, setWhatsapp] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleGetOtp = () => {
        if (!input.trim()) {
            setError('Please enter your email or mobile number.');
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!phoneRegex.test(input.trim()) && !emailRegex.test(input.trim())) {
            setError('Please enter a valid 10-digit mobile number or email address.');
            return;
        }
        setError('');
        router.push({
            pathname: '/(auth)/Otp',
            params: { input, whatsapp: whatsapp ? '1' : '0' },
        });
    };

    const bgColor = isDark ? colors.blueDark : colors.white;
        const mainText = isDark ? colors.white : colors.slate900;
    const subText = isDark ? colors.borderLight : colors.textMuted;
    const inputBorder = colors.borderLight;
    const errorText = colors.danger;

    // Use dark mode images if in dark mode
    const loginBg = isDark
        ? require('../../assets/images/Login/login-bg-dark.png')
        : require('../../assets/images/Login/login-bg.png');
    const loginLogo = isDark
        ? require('../../assets/images/Login/login-logo-dark.png')
        : require('../../assets/images/Login/login-logo.png');

    return (
        <View style={{ flex: 1, backgroundColor: bgColor }}>
            {/* Topmost illustration, outside SafeAreaView */}
            <Image
                source={loginBg}
                style={[
                    StyleSheet.absoluteFillObject,
                    { width: '100%', height: 400, resizeMode: 'cover', zIndex: 2 }
                ]}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className='flex items-center justify-center min-h-screen gap-y-2 px-6'>
                            <Image
                                source={loginLogo}
                                style={{ width: 220, height: 160, resizeMode: 'contain' }}
                                className='m-10'
                            />
                            <Text
                                className='text-xl font-semibold mt-2'
                                style={{ color: mainText }}
                            >
                                Let&apos;s get started
                            </Text>
                            <Text
                                className='text-md font-semibold mb-6 text-center'
                                style={{ color: subText }}
                            >
                                Get Alerts for Latest Tenders on your Mobile
                            </Text>

                            <View className="w-full m-10">
                                <Text
                                    className="text-base"
                                    style={{ color: subText }}
                                >
                                    Email/Mobile Number
                                </Text>
                                <TextInput
                                    className="text-md font-semibold"
                                    value={input}
                                    onChangeText={text => {
                                        const onlyDigits = /^[0-9]+$/.test(text);
                                        const emailRegex = /^[a-zA-Z0-9@._-]*$/; // allow only valid email characters while typing

                                        if (onlyDigits) {
                                            if (text.length <= 10) {
                                                setInput(text);
                                                if (error) setError('');
                                            }
                                        } else if (emailRegex.test(text)) {
                                            setInput(text);
                                            if (error) setError('');
                                        }
                                    }}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    placeholder="Enter your email or mobile"
                                    placeholderTextColor={isDark ? colors.borderLight : '#94a3b8'}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: inputBorder,
                                        color: mainText,
                                        backgroundColor: 'transparent',
                                        paddingVertical: 10,
                                        height: 48,
                                        textAlignVertical: 'center'
                                    }}
                                />
                                {error ? (
                                    <Text className="text-sm mt-1" style={{ color: errorText }}>{error}</Text>
                                ) : null}
                            </View>

                            {/* Check button for WhatsApp alerts */}
                            <View className='w-full items-center justify-end -mb-8'>
                                <Pressable
                                    className="flex-row justify-center items-center w-full mb-4 mt-8"
                                    onPress={() => setWhatsapp(!whatsapp)}
                                >
                                    <View
                                        className={`flex w-6 h-6 rounded bg-primary items-center justify-center mr-2`}
                                        style={{
                                            borderWidth: 0,
                                        }}
                                    >
                                        {whatsapp && (
                                            <Ionicons name="checkmark" size={18} color={colors.white} />
                                        )}
                                    </View>
                                    <Text className="text-base" style={{ color: subText }}>
                                        Also get alerts on Whatsapp
                                    </Text>
                                </Pressable>

                                <TouchableOpacity
                                    className="w-[90%] bg-primary rounded-lg py-3 mt-2 items-center"
                                    onPress={handleGetOtp}
                                >
                                    <Text className="text-lg font-bold" style={{ color: colors.white }}>
                                        Get OTP
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="w-fit mt-8 items-center"
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Text
                                        className='text-sm font-semibold'
                                        style={{ color: colors.primary }}
                                    >
                                        <Text className="underline">Terms & Conditions</Text> and <Text className="underline">Privacy Policy</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {/* Modal for T&C and Privacy Policy */}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 bg-black/40 justify-end">
                        <View className="rounded-t-2xl p-6 max-h-[80%]" style={{ backgroundColor: isDark ? colors.slate900 : colors.white }}>
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-lg font-bold" style={{ color: colors.primary }}>
                                    Terms & Conditions and Privacy Policy
                                </Text>
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={24} color={colors.primary} />
                                </Pressable>
                            </View>
                            <ScrollView className="mb-2">
                                <Text className="text-base mb-2" style={{ color: isDark ? colors.borderLight : colors.slate900 }}>
                                    {/* Replace this with your actual T&C and Privacy Policy */}
                                    Welcome to easyTender! By using our app, you agree to our Terms & Conditions and Privacy Policy.
                                    We respect your privacy and will never share your information without consent.
                                    For full details, please visit our website or contact support.
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                className="w-full bg-primary rounded-lg py-2 mt-2 items-center"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-base font-semibold" style={{ color: colors.white }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    )
}

export default Login