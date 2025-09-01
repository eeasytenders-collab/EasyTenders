import recentTenders from '@/data/recentTenders';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, Share, Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TenderDetails() {
  const router = useRouter();
  const params = useLocalSearchParams<{ i?: string }>();
  const isDark = useColorScheme() === 'dark';
  const headerBg = isDark ? '#1e4278' : '#1e4278';
  const iconColor = isDark ? '#cbd5e1' : '#0f172a';
  const tabs: ('Overview' | 'AOC Doc' | 'Bidders')[] = ['Overview', 'AOC Doc', 'Bidders'];
  const [active, setActive] = useState<'Overview' | 'AOC Doc' | 'Bidders'>('AOC Doc');
  const [followed, setFollowed] = useState(false);
  const idx = Number(params.i ?? '-1');
  const tender = Number.isInteger(idx) && idx >= 0 && idx < recentTenders.length ? recentTenders[idx] : null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this tender: ${tender?.title}\nClosing On: ${tender?.closingOn}\n\nDownload details here!`,
      });
    } catch (error) {
      console.error('Error sharing tender:', error);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Enquiry: ${tender?.title}`);
    const body = encodeURIComponent(`Hi team,\n\nI have a question about this tender:\n${tender?.title}\nClosing On: ${tender?.closingOn}\n\nThanks`);
    Linking.openURL(`mailto:support@easytenders.app?subject=${subject}&body=${body}`).catch(() => {
      Alert.alert('Email not available', 'Unable to open the email app on this device.');
    });
  };

  const handleFollow = () => {
    setFollowed((prev) => {
      const next = !prev;
      Alert.alert(next ? 'Added to Followed' : 'Removed from Followed', tender?.title);
      return next;
    });
  };

  const handleDownload = async () => {
    Alert.alert('Download', 'Starting download for AOC document...');
    // TODO: integrate real download via expo-file-system when a real URL is available
  };

  if (!tender) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-lg text-gray-700 mb-4">Tender not found.</Text>
        <Pressable onPress={() => router.back()} className="px-4 py-2 rounded-xl bg-[#1e4278]">
          <Text className="text-white">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  // Demo extras — replace with real values when available
  const aocDocs = 'Not Available';
  const contractDate = '25 July 2025';
  const contractPeriod = '150 Days';
  const contractAmount = 'INR 10,46,65,710';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: headerBg }}>
      {/* App Bar */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center py-5">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 rounded-full items-center justify-center"
            android_ripple={{ color: "#2a5aa0" }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              className="h-4 w-6 object-cover"
            />
          </Pressable>
          <Text className="text-white text-2xl font-semibold ml-2">Tender Details</Text>
        </View>
      </View>

      {/* White Sheet */}
      <View className="flex-1 rounded-t-3xl bg-white dark:bg-slate-900">
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <View className="px-4 pt-5">
            {/* Title */}
            <Text className="text-xl font-semibold text-slate-900 dark:text-slate-100">{tender.title}</Text>

            {/* Tags */}
            <View className="flex-row flex-wrap mt-4 gap-3">
              {tender.tags?.map((tg, i) => (
                <View key={i} className="px-4 py-2 rounded-full bg-[#ffd1c5] dark:bg-orange-900/40">
                  <Text className="text-[#e36c4c] dark:text-orange-300 font-medium">{tg}</Text>
                </View>
              ))}
            </View>

            {/* Fields */}
            <View className="mt-6 gap-5">
              <View>
                <Text className="text-slate-400 dark:text-slate-400">Category:</Text>
                <Text className="text-slate-800 dark:text-slate-100 font-semibold mt-1">{tender.category || '—'}</Text>
              </View>

              <View>
                <Text className="text-slate-400 dark:text-slate-400">Address:</Text>
                <Text className="text-slate-800 dark:text-slate-100 font-semibold mt-1">{tender.address || '—'}</Text>
              </View>

              <View>
                <Text className="text-slate-400 dark:text-slate-400">AOC Documents :</Text>
                <Text className="text-[#ea580c] font-semibold mt-1">{aocDocs}</Text>
              </View>

              <View className="flex-row justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-slate-400 dark:text-slate-400">Contract Date :</Text>
                  <Text className="text-slate-800 dark:text-slate-100 font-semibold mt-1">{contractDate}</Text>
                </View>
                <View className="items-end flex-1">
                  <Text className="text-slate-400 dark:text-slate-400">Contract Period</Text>
                  <Text className="text-green-600 font-semibold mt-1">{contractPeriod}</Text>
                </View>
              </View>

              <View className="mt-2 rounded-xl px-4 py-3 flex-row justify-between bg-slate-100 dark:bg-slate-700">
                <Text className="text-slate-600 dark:text-slate-300">Contract Amount :</Text>
                <Text className="text-slate-900 dark:text-slate-100 font-bold">{contractAmount}</Text>
              </View>
            </View>

            {/* Action Row */}
            <View className="mt-6 flex-row justify-around">
              <Pressable onPress={handleEmail} className="items-center">
                <View className="h-12 w-12 rounded-2xl border items-center justify-center border-slate-300 dark:border-slate-600">
                  <Ionicons name="mail-outline" size={22} color={iconColor} />
                </View>
                <Text className="mt-2 text-slate-800 dark:text-slate-200">Email</Text>
              </Pressable>
              <Pressable onPress={handleShare} className="items-center">
                <View className="h-12 w-12 rounded-2xl border items-center justify-center border-slate-300 dark:border-slate-600">
                  <Ionicons name="share-social-outline" size={22} color={iconColor} />
                </View>
                <Text className="mt-2 text-slate-800 dark:text-slate-200">Share</Text>
              </Pressable>
              <Pressable onPress={handleFollow} className="items-center">
                <View className="h-12 w-12 rounded-2xl border items-center justify-center border-slate-300 dark:border-slate-600">
                  <Ionicons name={followed ? 'heart' : 'heart-outline'} size={22} color={followed ? '#ef4444' : iconColor} />
                </View>
                <Text className="mt-2 text-slate-800 dark:text-slate-200">{followed ? 'Following' : 'Follow'}</Text>
              </Pressable>
              <Pressable onPress={handleDownload} className="items-center">
                <View className="h-12 w-12 rounded-2xl border items-center justify-center border-slate-300 dark:border-slate-600">
                  <Ionicons name="download-outline" size={22} color={iconColor} />
                </View>
                <Text className="mt-2 text-slate-800 dark:text-slate-200">Download</Text>
              </Pressable>
            </View>

            {/* Tabs */}
            <View className="mt-6 rounded-2xl border border-[#e2e8f0] overflow-hidden flex-row">
              {tabs.map((t) => {
                const isActive = t === active;
                return (
                  <Pressable key={t} onPress={() => setActive(t)} className={`flex-1 h-12 items-center justify-center ${isActive ? 'bg-[#1e4278]' : 'bg-white dark:bg-slate-800'}`}>
                    <Text className={isActive ? 'text-white font-semibold' : 'text-slate-800 dark:text-slate-200'}>{t}</Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Tab Content */}
            {active === 'AOC Doc' && (
              <View className="mt-4">
                {[1, 2].map((n) => (
                  <View key={n} className="py-4 border-b border-[#eef2f6] flex-row items-start justify-between">
                    <View className="flex-1 pr-4">
                      <View className="flex-row items-center">
                        <Ionicons name="document-text-outline" size={18} color="#ea580c" />
                        <Text className="ml-2 text-[#ea580c] font-semibold">Documents-{n}</Text>
                      </View>
                      <Text className="mt-2 text-slate-600 dark:text-slate-300">24.8Kb, Tender_Details_2025_FCL.html</Text>
                    </View>
                    <Pressable onPress={handleDownload} className="h-8 w-8 rounded-full items-center justify-center border border-[#ea580c]">
                      <Ionicons name="cloud-download-outline" size={18} color="#ea580c" />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            {active === 'Overview' && (
              <View className="mt-4">
                <Text className="text-slate-600 dark:text-slate-300">Closing On : <Text className="text-slate-900 dark:text-slate-100 font-semibold">{tender.closingOn}</Text></Text>
                <Text className="text-slate-600 dark:text-slate-300 mt-2">Tender Amt. : <Text className="text-slate-900 dark:text-slate-100 font-semibold">{tender.amountText ?? 'Refer Doc'}</Text></Text>
              </View>
            )}

            {active === 'Bidders' && (
              <View className="mt-4">
                <Text className="text-gray-600">Bidders list coming soon…</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}