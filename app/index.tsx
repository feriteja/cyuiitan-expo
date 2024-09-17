import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, monitorAuthState } from "@/lib/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";

const SplashScreen = () => {
  const router = useRouter();
  const { loading, isLogged, user } = useGlobalContext();

  useEffect(() => {
    const unsubscribe = monitorAuthState();

    const checkUser = async () => {
      if (isLogged) {
        router.replace("/(main)/home");
      } else if (!!user && !isLogged) {
        router.replace("/(auth)/addUsername");
      } else {
        router.replace("/(auth)/signin");
      }

      return () => unsubscribe();
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
