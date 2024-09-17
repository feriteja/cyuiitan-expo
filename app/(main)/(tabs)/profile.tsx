import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { logout } from "@/lib/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function ProfileScreen() {
  const { setIsLogged, isLogged, setUser, user, setisUserReady } =
    useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsLogged(false);
      setisUserReady(false);
      router.replace("/(auth)/signin");
    } catch (error) {
      throw error;
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <View className="bg-white">
        <View className="items-center justify-center py-6">
          <Image
            source={{ uri: user?.photoURL! }}
            className="w-32 h-32 rounded-full"
            style={{ borderWidth: 2, borderColor: "gray" }}
          />
          <Text className="text-2xl font-bold mt-4">{user?.email}</Text>
          <Text className="text-gray-500 text-sm">{user?.phoneNumber}</Text>
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

        <TouchableOpacity
          onPress={() => console.log(isLogged)}
          className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200"
        >
          <Text className="text-lg">Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleLogout()}
          className="flex-row items-center justify-between py-4 px-4"
        >
          <Text className="text-lg text-red-500">Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="red" />
        </TouchableOpacity>
      </View>

      {/* Additional Info */}
      <View className="bg-white mt-2 p-4 shadow-sm">
        <Text className="text-gray-500">Username</Text>
        <Text className="text-lg mt-2">{user?.email}</Text>
        <View className="border-b border-gray-200 my-3" />
        <Text className="text-gray-500">Phone Number</Text>
        <Text className="text-lg mt-2">{user?.phoneNumber}</Text>
      </View>
    </ScrollView>
  );
}
