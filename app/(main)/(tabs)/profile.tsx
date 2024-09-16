import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileScreen() {
  const user = {
    name: "John Doe",
    phone: "+123 456 7890",
    avatar: "https://example.com/avatar.jpg",
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <View className="bg-white">
        <View className="items-center justify-center py-6">
          <Image
            source={{ uri: user.avatar }}
            className="w-32 h-32 rounded-full"
            style={{ borderWidth: 2, borderColor: "gray" }}
          />
          <Text className="text-2xl font-bold mt-4">{user.name}</Text>
          <Text className="text-gray-500 text-sm">{user.phone}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="bg-white mt-2 shadow-sm">
        <TouchableOpacity
          onPress={() => router.push("/(main)/edit-profile")}
          className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200"
        >
          <Text className="text-lg">Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200">
          <Text className="text-lg">Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between py-4 px-4">
          <Text className="text-lg text-red-500">Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="red" />
        </TouchableOpacity>
      </View>

      {/* Additional Info */}
      <View className="bg-white mt-2 p-4 shadow-sm">
        <Text className="text-gray-500">Username</Text>
        <Text className="text-lg mt-2">{user.name}</Text>
        <View className="border-b border-gray-200 my-3" />
        <Text className="text-gray-500">Phone Number</Text>
        <Text className="text-lg mt-2">{user.phone}</Text>
      </View>
    </ScrollView>
  );
}
