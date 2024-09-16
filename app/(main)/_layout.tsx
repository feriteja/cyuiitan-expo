import { Redirect, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const MainLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  const colorScheme = useColorScheme();

  if (!loading && !isLogged) return <Redirect href="/(auth)/signin" />;
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="chat/[chatId]"
          options={{ presentation: "modal", title: "Chat" }}
        />
        <Stack.Screen name="post" />
        <Stack.Screen name="edit-profile" />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default MainLayout;
