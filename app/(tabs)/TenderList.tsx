/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RecentTenderCard from "@/components/custom/TenderCards";

export default function TendersListModal() {
  const router = useRouter();

  const isDark = useColorScheme() === 'dark';
  const headerBg = '#1e4278';
  const iconPrimary = isDark ? '#cbd5e1' : '#334155';

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.EXPO_PUBLIC_API_URL || '';
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setLoading(true);
      axios.get(`${API_URL}/tenderData`)
        .then(res => {
          if (isActive) {
            setTenders(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
          }
        })
        .catch(() => {
          if (isActive) {
            setTenders([]);
            setLoading(false);
          }
        });
      return () => { isActive = false; };
    }, [API_URL])
  );

  const filteredTenders = useMemo(() => {
    let data = [...tenders];

    // Search filter
    if (search.trim()) {
      const lower = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title?.toLowerCase().includes(lower) ||
          t.address?.toLowerCase().includes(lower) ||
          t.category?.toLowerCase().includes(lower)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      data = data.filter((t) =>
        selectedTags.every((tag) => t.tags?.includes(tag))
      );
    }

    // Sort
    data.sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return data;
  }, [search, selectedTags, sortOrder, tenders]);

  // Collect all tags
  const allTags = Array.from(new Set(tenders.flatMap((t) => t.tags || [])));

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
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#1e4278" />
          </View>
        ) : (
          <FlatList
            data={filteredTenders}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16, flexGrow: 1 }}
            ListEmptyComponent={
              <Text className="text-center mt-10 text-slate-500 dark:text-slate-400">No tenders found</Text>
            }
            renderItem={({ item, index }) => (
              <View className="rounded-2xl shadow-md shadow-gray-300 dark:shadow-black/40 mb-4">
                <RecentTenderCard
                  index={index}
                  title={item.title}
                  tags={item.tags}
                  category={item.category}
                  address={item.address}
                  closingOn={item.closingOn}
                  amountText={item.amountText}
                />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}