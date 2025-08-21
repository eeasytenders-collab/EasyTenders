/* eslint-disable @typescript-eslint/no-unused-vars */
// app/modals/tendersList.tsx
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import RecentTenderCard from "@/components/custom/recentTenderCards";
import recentTenders from "@/data/recentTenders";

export default function TendersListModal() {
  const router = useRouter();

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
    <SafeAreaView className="flex-1 bg-[#1e4278]">
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
              className="h-4 w-6 object-cover"
            />
          </Pressable>
          <Text className="text-white text-2xl font-semibold ml-2">Tender List</Text>
        </View>
      </View>

      {/* White Sheet */}
      <View className="flex-1 rounded-t-2xl bg-white">
        {/* Sort + Search */}
        <View className="px-4 pt-4">
          <View className="flex-row items-center justify-between mb-3">
            <View />
            <View className="flex-row items-center">
              <Text className="text-gray-500 mr-2">Sort by:</Text>
              <Pressable
                onPress={() => setSortOrder((p) => (p === "asc" ? "desc" : "asc"))}
                className="h-10 w-10 rounded-xl border border-gray-300 items-center justify-center"
                android_ripple={{ color: "#e6edf7" }}
              >
                <Ionicons name="options-outline" size={20} color="#334155" />
              </Pressable>
            </View>
          </View>

          {/* Search box */}
          <View className="mb-4">
            <View className="flex-row items-center border border-gray-300 rounded-2xl px-4 h-12">
              <Ionicons name="search-outline" size={18} color="#94a3b8" />
              <TextInput
                placeholder="Search…"
                placeholderTextColor="#94a3b8"
                value={search}
                onChangeText={setSearch}
                className="flex-1 ml-2 text-base"
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
              filteredTenders.map((tender, index) => (
                <View key={index} className="rounded-2xl shadow-md shadow-gray-300">
                  <RecentTenderCard
                    title={tender.title}
                    tags={tender.tags}
                    category={tender.category}
                    address={tender.address}
                    closingOn={tender.closingOn}
                    amountText={tender.amountText}
                  />
                </View>
              ))
            ) : (
              <Text className="text-center text-gray-500 mt-10">No tenders found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}