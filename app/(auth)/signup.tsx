import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, useNavigation } from "expo-router";
import { styled } from "nativewind";
import { register } from "@/lib/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const signup = () => {
  const { setUser } = useGlobalContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleRegister = async () => {
    // Handle register logic here
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      router.replace({
        pathname: "/(auth)/addUsername",
      });
    } catch (error) {
      Alert.alert("Failed to register");
      throw error;
    }
  };

  return (
    <StyledView className="flex-1 justify-center px-6 bg-white">
      <StyledText className="text-3xl font-bold text-center mb-10">
        Register
      </StyledText>

      {/* Email Input */}
      <StyledTextInput
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Password Input */}
      <StyledTextInput
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Confirm Password Input */}
      <StyledTextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      {/* Register Button */}
      <StyledTouchableOpacity
        className="bg-blue-500 p-3 rounded-lg mb-4"
        onPress={handleRegister}
      >
        <StyledText className="text-center text-white font-bold">
          Register
        </StyledText>
      </StyledTouchableOpacity>

      {/* Back to Login Button */}
      <StyledTouchableOpacity
        className="border border-blue-500 p-3 rounded-lg"
        onPress={() => router.back()}
      >
        <StyledText className="text-center text-blue-500 font-bold">
          Back to Login
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default signup;
