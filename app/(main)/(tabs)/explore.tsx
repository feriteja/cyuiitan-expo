import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const router = useRouter();

  // Sample friend status updates
  const stories = [
    { id: 1, author: "Alice", avatar: "https://example.com/avatar1.jpg" },
    { id: 2, author: "Bob", avatar: "https://example.com/avatar2.jpg" },
    { id: 3, author: "Charlie", avatar: "https://example.com/avatar3.jpg" },
  ];

  // Sample friend posts
  const posts = [
    {
      id: 1,
      author: "Alice",
      content: "Had a great day hiking today!",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 2,
      author: "Bob",
      content: "Just finished reading a great book.",
      avatar: "https://example.com/avatar2.jpg",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Story/Status Section */}
      <View className="  bg-white p-2 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.push("/(main)/post")}>
          <View
            style={{ elevation: 3 }}
            className="h-16 rounded-lg p-3 bg-[#ebeaea] justify-center flex-row "
          >
            <View className="flex-1 justify-center">
              <Text className="text-lg text-gray-500">
                What's on your mind?
              </Text>
            </View>
            <Text className="text-2xl text-gray-500">+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Posts Section */}
      <ScrollView className="p-2 ">
        {posts.map((post) => (
          <View
            key={post.id}
            className="flex-row items-start bg-white border-b rounded-md mt-1 border-gray-200 py-4"
          >
            <Image
              source={{ uri: post.avatar }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View>
              <Text className="font-semibold">{post.author}</Text>
              <Text className="text-gray-600">{post.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
