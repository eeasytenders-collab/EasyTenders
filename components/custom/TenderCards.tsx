import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View, useColorScheme, Platform } from 'react-native';
import colors from '../../tailwindColors';

type Props = {
    title: string;
    tags: string[];              // e.g. ["Works", "Civil & Construction"]
    categoryLabel?: string;      // e.g. "Category:"
    category?: string;           // e.g. "Single Door"
    addressLabel?: string;       // e.g. "Address:"
    address?: string;            // e.g. "Flat No 3, Apartment Sejan, New Delhi 302001"
    closingOnLabel?: string;     // e.g. "Closing On :"
    closingOn?: string;          // e.g. "31 July 2025"
    amountLabel?: string;        // e.g. "Tender Amt. :"
    amountText?: string;         // e.g. "Refer Doc"
    onPress?: () => void;
    onMenuPress?: () => void;
    index?: number;
};

const Tag = ({ text }: { text: string }) => {
    const isDark = useColorScheme() === 'dark';
    return (
        <View
            className="px-5 py-2 rounded-full mr-3 mb-3"
            style={{ backgroundColor: isDark ? 'rgba(251, 146, 60, 0.15)' : colors.tagBg }}
        >
            <Text
                className="font-medium text-sm"
                style={{ color: isDark ? '#fdba74' : colors.tagText }}
            >
                {text}
            </Text>
        </View>
    );
};

const TenderCard: React.FC<Props> = ({
    title,
    tags,
    categoryLabel = 'Category:',
    category = '',
    addressLabel = 'Address:',
    address = '',
    closingOnLabel = 'Closing On :',
    closingOn = '',
    amountLabel = 'Tender Amt. :',
    amountText = '',
    onPress,
    onMenuPress,
    index,
}) => {
    const router = useRouter();
    const isDark = useColorScheme() === 'dark';
    const iconColor = isDark ? colors.borderLight : colors.border;
    const accentBarColor = isDark ? '#1e293b' : colors.accentDark; // dark: slate-800, light: accentDark
    const handlePress = onPress ?? (() => {
        if (typeof index === 'number') {
            router.push({ pathname: '/(tabs)/TenderDetails', params: { i: String(index) } });
        }
    });
    return (
        <Pressable
            onPress={handlePress}
            className="relative"
            android_ripple={{ color: colors.rippleAlt }}
        >
            <View
                className="bg-bgLight dark:bg-black/60"
                style={
                    Platform.OS === 'android'
                        ? { elevation: 4, borderRadius: 16 }
                        : {
                            borderRadius: 16,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 8,
                        }
                }
            >
                <View className="bg-white dark:bg-slate-800" style={{ borderRadius: 16, overflow: 'hidden' }}>
                    {/* left accent bar */}
                    <View className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: accentBarColor, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }} />

                    {/* content */}
                    <View className="px-4 pt-4 pb-2">
                        {/* title + menu */}
                        <View className="flex-row items-start justify-between">
                            <Text className="text-slate-900 dark:text-slate-100 font-semibold text-md pr-3">
                                {title}
                            </Text>

                            <Pressable
                                onPress={onMenuPress}
                                hitSlop={10}
                                className="w-9 h-9 rounded-xl border border-slate-300 dark:border-slate-600 items-center justify-center"
                            >
                                <Ionicons name="ellipsis-horizontal" size={18} color={iconColor} />
                            </Pressable>
                        </View>

                        {/* tags */}
                        <View className="flex-row flex-wrap">
                            {tags.map((t, i) => (
                                <Tag key={`${t}-${i}`} text={t} />
                            ))}
                        </View>

                        {/* category */}
                        <View className="mt-2 flex-row">
                            <Text className="text-slate-400 dark:text-slate-400 mr-2 text-sm">{categoryLabel}</Text>
                            <Text className="text-slate-700 dark:text-slate-100 font-semibold">{category}</Text>
                        </View>

                        {/* address */}
                        <View className="mt-2">
                            <Text className="text-slate-400 dark:text-slate-400 text-sm">{addressLabel}</Text>
                            <Text className="text-slate-700 dark:text-slate-100 font-semibold mt-1">
                                {address}
                            </Text>
                        </View>
                    </View>

                    {/* footer bar */}
                    <View className="px-4 py-3 flex-row items-center justify-between bg-slate-100 dark:bg-slate-700">
                        <View className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: accentBarColor, borderBottomLeftRadius: 16 }} />
                        <View className="flex-row items-center">
                            <Text className="text-slate-600 dark:text-slate-300 text-sm">{closingOnLabel} </Text>
                            <Text className="text-slate-900 dark:text-slate-100 font-semibold text-xs">{closingOn}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-slate-600 dark:text-slate-300 text-sm">{amountLabel} </Text>
                            <Text className="text-slate-900 dark:text-slate-100 font-semibold text-xs">{amountText}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default TenderCard;