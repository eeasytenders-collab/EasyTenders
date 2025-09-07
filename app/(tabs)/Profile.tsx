import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, useColorScheme, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';


  // Profile state
  const [user, setUser] = useState({
    name: '',
    id: '',
    phone: '',
    email: '',
    address: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(user);

  // Path to profile.json
  const profilePath = `${FileSystem.documentDirectory ?? ''}profile.json`;

  // Load profile.json on mount
  useEffect(() => {
    (async () => {
      try {
        // Try app/profile.json first (for dev), then fallback to FileSystem
        let data;
        try {
          data = require('../profile.json');
        } catch {
          // fallback to FileSystem
          const file = await FileSystem.readAsStringAsync(profilePath);
          data = JSON.parse(file);
        }
        setUser(data);
        setEditUser(data);
      } catch {
        // fallback default
        setUser({
          name: 'Sahil Chhabra',
          id: '#1254254',
          phone: '+91 3285458985',
          email: 'sahil@gmail.com',
          address: 'Mansarover, jaipur Rajasthan',
        });
      }
      setLoading(false);
    })();
  }, [profilePath]);

  // Save profile.json
  const saveProfile = async (data: typeof user) => {
    setUser(data);
    setEditUser(data);
    setEditing(false);
    // Save to FileSystem
    try {
      await FileSystem.writeAsStringAsync(profilePath, JSON.stringify(data, null, 2));
    } catch {}
  };

  if (loading) return <SafeAreaView className={`flex-1 ${isDark ? 'bg-[#1e4278]' : 'bg-[#1e4278]'}`}><Text className="text-white text-center mt-10">Loading...</Text></SafeAreaView>;

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-[#1e4278]' : 'bg-[#1e4278]'}`}>
      {/* Header */}
      <View className="px-4 pb-3">
        <View className="flex-row items-center py-5">
          <Pressable
            onPress={() => router.replace('/(tabs)/Account')}
            className="h-10 w-10 rounded-full items-center justify-center"
            android_ripple={{ color: "#2a5aa0" }}
          >
            <Image
              source={require('../../assets/icons/back-arrow.png')}
              className="h-4 w-6 object-cover"
            />
          </Pressable>
          <Text className="text-white text-2xl font-semibold ml-2">Profile</Text>
        </View>
      </View>

      {/* White sheet */}
      <View className="flex-1 bg-[#f8fafc] dark:bg-slate-800 rounded-t-3xl">
        <View className="px-4 pt-4">
          <View className="rounded-2xl bg-white dark:bg-slate-700 shadow-black/40 shadow-sm overflow-hidden">
            {/* Edit button */}
            <View className="flex-row justify-end px-4 pt-4">
              <Pressable onPress={() => setEditing(e => !e)} className="px-3 py-1 rounded-lg bg-[#1e4278]">
                <Text className="text-white font-semibold">{editing ? 'Cancel' : 'Edit'}</Text>
              </Pressable>
            </View>
            {/* Header row inside card */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-16 w-16 rounded-2xl overflow-hidden bg-[#e2e8f0] items-center justify-center mr-4">
                <Image source={require('../../assets/icons/avatar.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
              </View>
              <View className="flex-1">
                {editing ? (
                  <>
                    <TextInput
                      className="text-[20px] font-semibold text-[#0f172a] dark:text-white mb-1"
                      value={editUser.name}
                      onChangeText={t => setEditUser(u => ({ ...u, name: t }))}
                      placeholder="Name"
                    />
                    <TextInput
                      className="text-[#64748b] dark:text-slate-300 mt-1"
                      value={editUser.id}
                      onChangeText={t => setEditUser(u => ({ ...u, id: t }))}
                      placeholder="ID"
                    />
                  </>
                ) : (
                  <>
                    <Text className="text-[20px] font-semibold text-[#0f172a] dark:text-white">{user.name}</Text>
                    <Text className="text-[#64748b] dark:text-slate-300 mt-1">{user.id}</Text>
                  </>
                )}
              </View>
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Name row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#2563eb] items-center justify-center mr-4">
                <Ionicons name="person-outline" size={20} color="#ffffff" />
              </View>
              {editing ? (
                <TextInput
                  className="text-[17px] text-[#64748b] dark:text-slate-300"
                  value={editUser.name}
                  onChangeText={t => setEditUser(u => ({ ...u, name: t }))}
                  placeholder="Name"
                />
              ) : (
                <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.name}</Text>
              )}
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Phone row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#f59e0b] items-center justify-center mr-4">
                <Ionicons name="call-outline" size={20} color="#ffffff" />
              </View>
              {editing ? (
                <TextInput
                  className="text-[17px] text-[#64748b] dark:text-slate-300"
                  value={editUser.phone}
                  onChangeText={t => setEditUser(u => ({ ...u, phone: t }))}
                  placeholder="Phone"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.phone}</Text>
              )}
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Email row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#6d28d9] items-center justify-center mr-4">
                <Ionicons name="mail-outline" size={20} color="#ffffff" />
              </View>
              {editing ? (
                <TextInput
                  className="text-[17px] text-[#64748b] dark:text-slate-300"
                  value={editUser.email}
                  onChangeText={t => setEditUser(u => ({ ...u, email: t }))}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.email}</Text>
              )}
            </View>

            <View className="h-px bg-[#eef2f7] dark:bg-slate-600" />

            {/* Address row */}
            <View className="flex-row items-center px-4 py-4">
              <View className="h-12 w-12 rounded-2xl bg-[#16a34a] items-center justify-center mr-4">
                <Ionicons name="location-outline" size={20} color="#ffffff" />
              </View>
              {editing ? (
                <TextInput
                  className="text-[17px] text-[#64748b] dark:text-slate-300"
                  value={editUser.address}
                  onChangeText={t => setEditUser(u => ({ ...u, address: t }))}
                  placeholder="Address"
                />
              ) : (
                <Text className="text-[17px] text-[#64748b] dark:text-slate-300">{user.address}</Text>
              )}
            </View>
            {/* Save button */}
            {editing && (
              <View className="px-4 pb-4">
                <Pressable onPress={() => saveProfile(editUser)} className="h-12 rounded-xl bg-[#1e4278] items-center justify-center mt-2">
                  <Text className="text-white font-semibold text-lg">Save</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}