import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CITIES = ['Sri Ganganagar', 'Ajmer', 'Jaipur', 'Jodhpur'];
const CATEGORIES = ['Goods', 'Services', 'Works'] as const;

const SUBCATS: Record<(typeof CATEGORIES)[number], string[]> = {
    Goods: [
        'Computers, Laptops, Servers',
        'Office Machines, Printers',
        'Furniture, Appliances',
        'Automobiles',
        'Laboratory and scientific equipment',
    ],
    Services: ['IT Services', 'AMC & Maintenance', 'Consultancy', 'Catering Services'],
    Works: ['Civil Construction', 'Road Works', 'Electrical Works', 'Water & Irrigation'],
};

export default function Filter() {
    const router = useRouter();

    const [city, setCity] = useState(CITIES[0]);
    const [budget, setBudget] = useState<number>(500000); // Rs.
    const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Goods');
    const [selected, setSelected] = useState<Record<string, boolean>>({ 'Computers, Laptops, Servers': true });

    const minBudget = 50000;
    const maxBudget = 2000000;

    const visibleSubcats = useMemo(() => SUBCATS[cat], [cat]);

    const toggleSubcat = (name: string) => {
        setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const reset = () => {
        setCity(CITIES[0]);
        setBudget(500000);
        setCat('Goods');
        setSelected({});
    };

    const apply = () => {
        // TODO: wire in query/list params
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e4278]">
            {/* Top Bar */}
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
                    <Text className="text-white text-2xl font-semibold ml-2">Filter</Text>
                </View>
            </View>

            {/* Sheet */}
            <View className="flex-1 bg-white rounded-t-3xl">
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    <View className="px-4 pt-5 pb-24">
                        {/* Title Row */}
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-[22px] font-semibold text-[#0f172a]">Select Your Interest</Text>
                            <Pressable>
                                <Text className="text-[#1e4278]">See All</Text>
                            </Pressable>
                        </View>

                        {/* Location */}
                        <Text className="text-[#0f172a] text-lg font-semibold mb-2">Location</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
                            <View className="flex-row gap-3">
                                {CITIES.map((c) => {
                                    const active = city === c;
                                    return (
                                        <Pressable
                                            key={c}
                                            onPress={() => setCity(c)}
                                            className={`px-4 h-12 rounded-xl border items-center justify-center ${active ? 'bg-[#1e4278] border-[#1e4278]' : 'bg-white border-[#e2e8f0]'
                                                }`}
                                        >
                                            <Text className={active ? 'text-white' : 'text-gray-600'}>{c}</Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </ScrollView>

                        {/* Budget */}
                        <Text className="text-[#0f172a] text-lg font-semibold mb-2">Budget</Text>
                        <View className="px-1">
                            <Slider
                                value={budget}
                                onValueChange={(v) => setBudget(Array.isArray(v) ? v[0] : v)}
                                minimumValue={minBudget}
                                maximumValue={maxBudget}
                                step={10000}
                                minimumTrackTintColor="#1e4278"
                                maximumTrackTintColor="#e2e8f0"
                                thumbTintColor="#1e4278"
                                style={{ height: 40 }}
                            />
                            <View className="flex-row justify-between mt-1">
                                <Text className="text-gray-500">Rs. {minBudget.toLocaleString('en-IN')}</Text>
                                <Text className="text-[#1e4278] font-semibold">Rs. {Math.round(budget).toLocaleString('en-IN')}</Text>
                            </View>
                        </View>

                        {/* Category */}
                        <Text className="text-[#0f172a] text-lg font-semibold mt-5 mb-2">Category</Text>
                        <View className="flex-row gap-3 mb-2">
                            {CATEGORIES.map((c) => {
                                const active = c === cat;
                                return (
                                    <Pressable
                                        key={c}
                                        onPress={() => setCat(c)}
                                        className={`px-5 h-11 rounded-xl border items-center justify-center ${active ? 'bg-[#1e4278] border-[#1e4278]' : 'bg-white border-[#e2e8f0]'
                                            }`}
                                    >
                                        <Text className={active ? 'text-white' : 'text-gray-600'}>{c}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        {/* Subcategories */}
                        <View className="mt-2">
                            {visibleSubcats.map((label) => {
                                const active = !!selected[label];
                                return (
                                    <Pressable
                                        key={label}
                                        onPress={() => toggleSubcat(label)}
                                        className="py-4 flex-row items-center justify-between border-b border-[#eef2f6]"
                                    >
                                        <Text className="text-[17px] text-[#0f172a]">{label}</Text>
                                        <View
                                            className={`h-6 w-6 rounded-full border-2 items-center justify-center ${active ? 'border-[#1e4278]' : 'border-[#94a3b8]'
                                                }`}
                                        >
                                            {active && <View className="h-3.5 w-3.5 rounded-full bg-[#1e4278]" />}
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>

                        {/* Actions */}
                        <View className="mt-8">
                            <Pressable
                                onPress={apply}
                                className="h-14 rounded-2xl bg-[#1e4278] items-center justify-center"
                                android_ripple={{ color: '#2a5aa0' }}
                            >
                                <Text className="text-white text-lg font-semibold">Apply Filter</Text>
                            </Pressable>
                            <Pressable onPress={reset} className="mt-4 items-center">
                                <Text className="text-[#1e4278] text-base">Reset Filter</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}