import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Link, router, useNavigation } from "expo-router";
import { styled } from "nativewind";
import { login } from "@/lib/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";

const signin = () => {
  const { setUser, setIsLogged, user } = useGlobalContext();
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
      const user = await login(formData.email, formData.password);
      setUser(user);
      setIsLogged(true);
      router.replace("/(main)/home");
    } catch (error) {
      Alert.alert("gagal login");
      // console.log(error);
      throw error;
    }
  };

  const handleRegister = () => {
    // navigation.navigate();
  };

  const handleForgotPassword = () => {
    // navigation.navigate('ForgotPassword');
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
