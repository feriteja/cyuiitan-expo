import { Redirect, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const MainLayout = () => {
  const { loading, isLogged, isUserReady } = useGlobalContext();
  const router = useRouter();

  if (!isLogged && !loading && !isUserReady) {
    return <Redirect href="/(auth)/signin" />;
  } else if (isLogged && !loading && !isUserReady) {
    return <Redirect href="/(auth)/addUsername" />;
  }

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
