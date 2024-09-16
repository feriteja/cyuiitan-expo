import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePostScreen() {
  const [content, setContent] = useState("");

  const handlePost = () => {
    // Handle posting the new content
    console.log("Post content:", content);
    // Clear content after posting (if needed)
    setContent("");
  };

  return (
    <SafeAreaView className={`flex-1 `}>
      <ScrollView className={``}>
        {/* Header */}
        <View className="bg-[#8526c8]  px-2 py-2 flex-row items-center">
          <Entypo
            onPress={() => router.back()}
            name="chevron-left"
            size={32}
            color="white"
          />
          <Text className="text-white text-lg">Create New Post</Text>
        </View>

        {/* Post Content */}
        <View className={`bg-white p-4 rounded-lg shadow-sm mb-4`}>
          <TextInput
            value={content}
            onChangeText={setContent}
            className={`rounded-lg p-4 bg-white  text-base text-gray-200`}
            placeholder="What's on your mind?"
            multiline
            numberOfLines={6}
            style={{ elevation: 3 }}
          />
        </View>

        {/* Post Button */}
        <View className={`p-4`}>
          <Button title="Post" onPress={handlePost} color="#007bff" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
