import { useGlobalContext } from "@/context/GlobalProvider";
import { login } from "@/lib/firebase";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

const signin = () => {
  const { user, setisUserReady } = useGlobalContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleLogin = async () => {
    try {
      await login(formData.email, formData.password);
      setisUserReady(true);
      router.replace("/(main)/home");
    } catch (error) {
      Alert.alert("gagal login");
      // console.log(error);
      throw error;
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-10">Cyuiitan</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        className="border border-gray-300 rounded-lg p-3 mb-4"
        onChangeText={(text) => handleChange("email", text)}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border border-gray-300 rounded-lg p-3 mb-6"
        onChangeText={(text) => handleChange("password", text)}
      />

      {/* Login Button */}
      <Pressable
        className="bg-blue-500 p-3 rounded-lg mb-4"
        onPress={handleLogin}
      >
        <Text className="text-center text-white font-bold">Logina</Text>
      </Pressable>

      {/* Register Button */}
      <Pressable
        className="border border-blue-500 p-3 rounded-lg mb-4"
        // onPress={handleRegister}
      >
        <Link className="text-center text-blue-500 font-bold" href="/signup">
          register
        </Link>
      </Pressable>

      {/* Forgot Password Button */}
      <Pressable
        className="border border-gray-300 p-3 rounded-lg"
        onPress={() => console.log(user)}
      >
        <Text className="text-center text-gray-500 font-bold">
          Forgot Password?
        </Text>
      </Pressable>
    </View>
  );
};

export default signin;
