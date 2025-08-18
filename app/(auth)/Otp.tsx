import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTP_LENGTH = 6;
const TIMER_SECONDS = 30;

function maskInput(input?: string) {
  if (!input) return '****';
  // Mask all but last 4 digits/letters
  const str = String(input);
  if (str.length <= 4) return '****' + str;
  return '****' + str.slice(-4);
}

const Otp = () => {
  const { input } = useLocalSearchParams();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const router = useRouter();
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text: string, idx: number) => {
    if (!/^\d*$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[idx] = text.slice(-1);
    setOtp(newOtp);

    // Move to next input if not last and input is not empty
    if (text && idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
    // If deleting, move to previous
    if (!text && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    if (otp.join('').length === OTP_LENGTH) {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Back Button */}
        <Pressable className="mt-4 mb-2 w-12 h-12 items-center justify-center border border-slate-200 p-2 rounded-full" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#1e4278" />
        </Pressable>

        {/* Title & Subtitle */}
        <Text className="text-2xl font-bold text-center mt-2 mb-2">OTP Verification</Text>
        <Text className="text-base text-slate-500 text-center mb-6">
          To login, please enter verification OTP we sent you on {maskInput(input as string)}
        </Text>

        {/* Illustration */}
        <View className="items-center mb-8 mt-10 justify-center">
          <Image
            source={require('../../assets/images/Login/otp-illustration.png')}
            style={{ resizeMode: 'contain' }}
          />
        </View>

        {/* OTP Inputs */}
        <Text className="text-base text-slate-500 mb-2 mt-12">Enter OTP</Text>
        <View className="flex-row justify-between mb-8">
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={ref => { inputs.current[idx] = ref; }}
              className="w-10 h-12 border-b border-slate-200 text-2xl text-center font-bold mx-1"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          className="w-full bg-[#1e4278] rounded-lg py-3 items-center mb-6"
          onPress={handleConfirm}
          disabled={otp.join('').length !== OTP_LENGTH}
        >
          <Text className="text-white text-lg font-bold">Confirm</Text>
        </TouchableOpacity>

        {/* Timer */}
        <Text className="text-center text-[#1e4278] text-lg font-semibold">
          {`00:${timer.toString().padStart(2, '0')}`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Otp;