// app/(main)/chat.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useLocalSearchParams } from "expo-router";

// Example chat data
const chatMessages = [
  { id: "1", text: "Hello!", sender: "other", timestamp: "10:30 AM" },
  {
    id: "2",
    text: "Hi, how are you?",
    sender: "current",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    text: "I’m good, thanks!",
    sender: "other",
    timestamp: "10:33 AM",
  },
  {
    id: "4",
    text: "That’s great to hear!",
    sender: "current",
    timestamp: "10:35 AM",
  },
  // Add more messages as needed
];

const ChatScreen = () => {
  const currentUser = "current"; // Identifier for the current user
  const { chatId } = useLocalSearchParams();

  console.log({ chatId });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView className="flex-1 bg-white">
        <View className="bg-[#8526c8]  px-2 py-2 flex-row items-center">
          <Entypo
            onPress={() => router.back()}
            name="chevron-left"
            size={32}
            color="white"
          />
          <Text className="text-white text-lg">{chatId}</Text>
        </View>
        {/* Chat Messages List */}
        <FlatList
          data={chatMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              className={`mb-4 px-4 py-2 mx-4 rounded-lg ${
                item.sender === currentUser
                  ? "bg-[#8526c8] self-end"
                  : "bg-gray-200 self-start"
              }`}
              style={{ maxWidth: "75%" }}
            >
              <Text
                className={
                  item.sender === currentUser ? "text-white" : "text-black"
                }
              >
                {item.text}
              </Text>
              <Text
                className={`mt-1 text-xs ${
                  item.sender === currentUser
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                {item.timestamp}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        />

        {/* Input Area */}
        <View className="flex-row items-center border-t border-gray-300 px-3 py-2 bg-gray-100">
          <TextInput
            placeholder="Type a message"
            multiline
            blurOnSubmit={false}
            returnKeyType="default" // Ensures "Enter" adds a new line
            className="flex-1 bg-white rounded-md px-4 py-2 mr-3"
            style={{ elevation: 1, maxHeight: 100 }}
          />
          <TouchableOpacity>
            <Feather name="send" size={24} color="#075E54" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
