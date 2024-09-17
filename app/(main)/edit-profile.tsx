import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const [avatar, setAvatar] = useState("https://example.com/avatar.jpg");
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("+123 456 7890");
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      //   setAvatar(result.assets());
    }
  };

  const handleSave = () => {
    // Handle saving profile updates
    console.log("Profile updated:", { avatar, name, phone });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="bg-white py-4 px-4 border-b border-gray-200">
          <Text className="text-xl font-bold">Edit Profile</Text>
        </View>

        {/* Profile Image */}
        <View className="items-center bg-white py-6">
          <TouchableOpacity onPress={pickImage} className="mb-4">
            <Image
              source={{ uri: avatar }}
              className="w-32 h-32 rounded-full"
              style={{ borderWidth: 2, borderColor: "gray" }}
            />
            <Ionicons
              name="camera"
              size={24}
              color="gray"
              style={{ position: "absolute", bottom: 0, right: 0 }}
            />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Change Photo</Text>
        </View>

        {/* Form Inputs */}
        <View className="bg-white p-4">
          <Text className="text-gray-500">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="bg-gray-200 rounded-full px-4 py-2 mt-1"
            placeholder="username"
          />
          <Text className="text-gray-500 mt-4">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="bg-gray-200 rounded-full px-4 py-2 mt-1"
            placeholder="Enter your name"
          />

          <Text className="text-gray-500 mt-4">Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            className="bg-gray-200 rounded-full px-4 py-2 mt-1"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        {/* Save Button */}
        <View className="bg-white p-4 mt-4">
          <Button title="Save Changes" onPress={handleSave} color="#007bff" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
