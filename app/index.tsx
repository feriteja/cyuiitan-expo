import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";

const SplashScreen = () => {
  const router = useRouter();
  const { loading, isLogged } = useGlobalContext();

  useEffect(() => {
    const checkUser = async () => {
      if (isLogged) {
        // User is logged in, navigate to home
        router.replace("/(main)/");
      } else {
        // No user is logged in, navigate to sign-in
        router.replace("/(auth)/signin");
      }
    };

    // Simulate a brief delay to display splash screen
    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default SplashScreen;
