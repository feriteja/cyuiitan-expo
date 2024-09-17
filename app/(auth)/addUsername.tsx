import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import { updateUsername } from "@/lib/firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const AddUsernameScreen = () => {
  const { user, setisUserReady, isUserReady, isLogged } = useGlobalContext();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAddUsername = async () => {
    try {
      if (!username.trim()) {
        setError("Username cannot be empty");
        return;
      }

      setLoading(true);
      await updateUsername(user!.uid, username.trim().toLowerCase());

      setisUserReady(true);

      router.replace("/(main)/home");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Username already exists, please choose another one");
      throw error;
    }
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Text
        onPress={() => console.log(isUserReady, isLogged)}
        className="text-2xl font-bold text-gray-800 mb-4"
      >
        Set Your Username
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        className="w-full bg-gray-100 px-4 py-3 rounded-md text-gray-800"
      />

      {error ? (
        <Text className="text-red-500 text-sm mt-2">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={() => handleAddUsername()}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-md bg-blue-500 ${
          loading ? "opacity-50" : "opacity-100"
        } flex justify-center items-center`}
      >
        <Text className="text-white text-lg font-semibold">
          {loading ? "Submitting..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUsernameScreen;
