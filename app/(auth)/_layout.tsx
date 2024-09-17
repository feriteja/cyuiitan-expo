import { Redirect, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { loading, isLogged, isUserReady } = useGlobalContext();
  const router = useRouter();

  if (!loading && isLogged && isUserReady) {
    return <Redirect href="/(main)/home" />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
