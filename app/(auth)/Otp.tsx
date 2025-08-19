import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTP_LENGTH = 6;
const TIMER_SECONDS = 30;

function maskInput(input?: string) {
  if (!input) return '****';
  const str = String(input);
  if (str.length <= 4) return '****' + str;
  return '****' + str.slice(-4);
}

const Otp = () => {
  const { input } = useLocalSearchParams();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [error, setError] = useState('');
  const router = useRouter();
  const inputs = useRef<(TextInput | null)[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isOtpComplete = otp.every(d => d !== '');

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
    setError('');

    if (text && idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
    if (!text && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const joined = otp.join('');
    if (joined.length !== OTP_LENGTH || otp.some(d => d === '')) {
      setError('Please enter the complete 6-digit OTP.');
      // focus first empty input if any
      const emptyIdx = otp.findIndex(d => d === '');
      if (emptyIdx !== -1) {
        inputs.current[emptyIdx]?.focus();
      }
      return;
    }
    setError('');
    router.replace('/(tabs)');
  };

  const bgColor = isDark ? '#4d74ae' : '#fff';
  const textColor = isDark ? '#fff' : '#1e293b';
  const subTextColor = isDark ? '#cbd5e1' : '#64748b';
  const borderColor = isDark ? '#334155' : '#cbd5e1';
  const buttonBg = '#1e4278';
  const errorText = '#ef4444';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: bgColor }}>
      <View className="flex-1 px-6" style={{ backgroundColor: bgColor }}>
        {/* Back Button */}
        <Pressable
          className="mt-4 mb-2 w-12 h-12 items-center justify-center border p-2 rounded-full"
          style={{ borderColor: borderColor }}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={buttonBg} />
        </Pressable>

        {/* Title & Subtitle */}
        <Text className="text-2xl font-bold text-center mt-2 mb-2" style={{ color: textColor }}>
          OTP Verification
        </Text>
        <Text className="text-base text-center mb-6" style={{ color: subTextColor }}>
          To login, please enter verification OTP we sent you on {maskInput(input as string)}
        </Text>

        {/* Illustration */}
        <View className="items-center mb-8 mt-10 justify-center">
          <Image
            source={require('../../assets/images/Login/otp-illustration.png')}
            style={{ resizeMode: 'contain', opacity: isDark ? 0.7 : 1 }}
          />
        </View>

        {/* OTP Inputs */}
        <Text className="text-base mb-2 mt-12" style={{ color: subTextColor }}>
          Enter OTP
        </Text>
        <View className="flex-row justify-between mb-2">
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={ref => { inputs.current[idx] = ref; }}
              className="w-10 h-12 text-2xl text-center font-bold mx-1"
              style={{
                borderBottomWidth: 2,
                borderBottomColor: borderColor,
                color: textColor,
                backgroundColor: isDark ? '#4d74ae' : '#fff',
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, idx)}
              autoFocus={idx === 0}
              placeholder="•"
              placeholderTextColor={isDark ? "#fff" : "#94a3b8"}
            />
          ))}
        </View>
        {error ? (
          <Text className="text-sm mt-1 mb-2 text-center" style={{ color: errorText }}>{error}</Text>
        ) : null}

        {/* Confirm Button */}
        <TouchableOpacity
          className="w-full rounded-lg py-3 items-center mb-6 mt-10"
          style={{ backgroundColor: buttonBg, opacity: isOtpComplete ? 1 : 0.6 }}
          onPress={handleConfirm}
        >
          <Text className="text-lg font-bold" style={{ color: "#fff" }}>Confirm OTP</Text>
        </TouchableOpacity>

        {/* Timer */}
        <Text className="text-center text-lg font-semibold" style={{ color: buttonBg }}>
          {`00:${timer.toString().padStart(2, '0')}`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Otp;