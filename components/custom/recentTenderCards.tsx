import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

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
};

const Tag = ({ text }: { text: string }) => (
    <View className="px-5 py-2 rounded-full bg-[#ffd1c5] mr-3 mb-3">
        <Text className="text-[#e36c4c] font-medium text-sm">{text}</Text>
    </View>
);

const RecentTenderCard: React.FC<Props> = ({
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
}) => {
    return (
        <Pressable
            onPress={onPress}
            className="relative"
            android_ripple={{ color: '#e6edf7' }}
        >
            {/* Card */}
            <View
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                    // soft iOS/Android shadow
                    shadowColor: '#000',
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 4,
                }}
            >
                {/* left accent bar */}
                <View className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#123f79] rounded-l-2xl" />

                {/* content */}
                <View className="px-4 pt-4 pb-2">
                    {/* title + menu */}
                    <View className="flex-row items-start justify-between">
                        <Text className="text-[#123f79] font-semibold text-md pr-3">
                            {title}
                        </Text>

                        <Pressable
                            onPress={onMenuPress}
                            hitSlop={10}
                            className="w-9 h-9 rounded-xl border border-[#cbd5e1] items-center justify-center"
                        >
                            <Ionicons name="ellipsis-horizontal" size={18} color="#334155" />
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
                        <Text className="text-[#94a3b8] mr-2 text-sm">{categoryLabel}</Text>
                        <Text className="text-[#334155] font-semibold">{category}</Text>
                    </View>

                    {/* address */}
                    <View className="mt-2">
                        <Text className="text-[#94a3b8] text-sm">{addressLabel}</Text>
                        <Text className="text-[#475569] font-semibold mt-1">
                            {address}
                        </Text>
                    </View>
                </View>

                {/* footer bar */}
                <View className="bg-[#e8f1ff] px-4 py-3 flex-row items-center justify-between">
                    <View className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#123f79] rounded-lb-2xl" />

                    <View className="flex-row">
                        <Text className="text-[#475569]">{closingOnLabel} </Text>
                        <Text className="text-[#1e3a8a] font-semibold">{closingOn}</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-[#475569]">{amountLabel} </Text>
                        <Text className="text-[#1e3a8a] font-semibold">{amountText}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

export default RecentTenderCard;