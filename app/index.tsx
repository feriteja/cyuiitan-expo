import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, monitorAuthState } from "@/lib/firebase";
import { useGlobalContext } from "@/context/GlobalProvider";

const SplashScreen = () => {
  const router = useRouter();
  const { loading, isLogged, user, isUserReady } = useGlobalContext();

  useEffect(() => {
    const checkUser = async () => {
      if (!!user && isLogged && isUserReady) {
        router.replace("/(main)/home");
      } else {
        router.replace("/(auth)/signin");
      }
    };

    const userTime = setTimeout(() => {
      checkUser();
    }, 2000);

    const unsubscribe = monitorAuthState();

    return () => {
      clearTimeout(userTime);
      unsubscribe();
    };
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
