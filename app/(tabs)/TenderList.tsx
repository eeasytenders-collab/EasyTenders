/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import RecentTenderCard from "@/components/custom/TenderCards";
import recentTenders from "@/data/recentTenders";

export default function TendersListModal() {
  const router = useRouter();

  const isDark = useColorScheme() === 'dark';
  const headerBg = isDark ? '#1e4278' : '#1e4278';
  const iconPrimary = isDark ? '#cbd5e1' : '#334155';

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredTenders = useMemo(() => {
    let data = [...recentTenders];

    // Search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          t.address.toLowerCase().includes(lower) ||
          t.category.toLowerCase().includes(lower)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      data = data.filter((t) =>
        selectedTags.every((tag) => t.tags.includes(tag))
      );
    }

    // Sort
    data.sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return data;
  }, [search, selectedTags, sortOrder]);

  // Collect all tags
  const allTags = Array.from(new Set(recentTenders.flatMap((t) => t.tags)));

  return (
    <SafeAreaView className="flex-1" edges={['top', 'left', 'right']} style={{ backgroundColor: headerBg }}>
      {/* Top AppBar */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center py-5">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 rounded-full items-center justify-center"
            android_ripple={{ color: "#2a5aa0" }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              className="h-4 w-6"
              style={{ tintColor: '#ffffff', resizeMode: 'contain' }}
            />
          </Pressable>
          <Text className="text-white text-2xl font-semibold ml-2">Tender List</Text>
        </View>
      </View>

      {/* White Sheet */}
      <View className="flex-1 rounded-t-2xl bg-white dark:bg-slate-900">
        {/* Sort + Search */}
        <View className="px-4 pt-4">
          <View className="flex-row items-center justify-between mb-3">
            <View />
            <View className="flex-row items-center">
              <Text className="mr-2 text-slate-500 dark:text-slate-400">Sort by:</Text>
              <Pressable
                onPress={() => setSortOrder((p) => (p === 'asc' ? 'desc' : 'asc'))}
                className="h-10 w-10 rounded-xl border items-center justify-center border-slate-300 dark:border-slate-600"
                android_ripple={{ color: '#e6edf7' }}
              >
                <Ionicons name="options-outline" size={20} color={iconPrimary} />
              </Pressable>
            </View>
          </View>

          {/* Search box */}
          <View className="mb-4">
            <View className="flex-row items-center rounded-2xl px-4 h-12 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
              <Ionicons name="search-outline" size={18} color="#94a3b8" />
              <TextInput
                placeholder="Search…"
                placeholderTextColor={isDark ? '#94a3b8' : '#94a3b8'}
                value={search}
                onChangeText={setSearch}
                className="flex-1 ml-2 text-base"
                style={{ color: isDark ? '#e5e7eb' : '#0f172a' }}
              />
            </View>
          </View>
        </View>

        {/* List */}
        <ScrollView
          className="flex-1 pt-2"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-4 px-4">
            {filteredTenders.length > 0 ? (
              filteredTenders.map((tender, index) => {
                const sourceIndex = recentTenders.indexOf(tender);
                const idx = sourceIndex !== -1 ? sourceIndex : index;
                return (
                  <View key={`${tender.title}-${idx}`} className="rounded-2xl shadow-md shadow-gray-300 dark:shadow-black/40">
                    <RecentTenderCard
                      index={idx}
                      title={tender.title}
                      tags={tender.tags}
                      category={tender.category}
                      address={tender.address}
                      closingOn={tender.closingOn}
                      amountText={tender.amountText}
                    />
                  </View>
                );
              })
            ) : (
              <Text className="text-center mt-10 text-slate-500 dark:text-slate-400">No tenders found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}