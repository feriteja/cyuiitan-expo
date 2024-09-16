// app/(main)/home.tsx
import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

const chats = [
  {
    id: "1",
    name: "John Doe",
    message: "Hey, how are you?",
    time: "10:30 AM",
    avatar: "https://i.pravatar.cc/300", // Replace with actual user avatars
  },
  {
    id: "2",
    name: "Jane Smith",
    message: "Are we meeting today?",
    time: "9:45 AM",
    avatar: "https://i.pravatar.cc/301",
  },
  // Add more chat data as needed
];

const home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#8526c8] py-4 px-5 flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">Cyuiitan</Text>
        <View className="flex-row space-x-4">
          <Pressable>
            <Feather name="search" size={24} color="white" />
          </Pressable>
          <Pressable>
            <MaterialIcons name="more-vert" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push("/(main)/chat/idllol")}
            className="flex-row items-center p-4 border-b border-gray-200"
          >
            <Image
              source={{ uri: item.avatar }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-400 text-sm">{item.time}</Text>
              </View>
              <Text className="text-gray-600">{item.message}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default home;
