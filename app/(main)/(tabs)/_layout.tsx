import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

const MainTabLayout = () => {
  const TabIcon = ({ color, name, focused, icon, size }: any) => {
    return (
      <View className="flex items-center justify-center gap-1">
        <Ionicons color={color} name={icon} size={size} />
        <Text
          className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
          style={{ color: color }}
        >
          {name}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Tabs initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                size={20}
                icon={focused ? "home" : "home-outline"}
                color={focused ? "blue" : "gray"}
              />
            ),
            title: "",
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Search"
                size={20}
                icon={focused ? "search" : "search-outline"}
                color={focused ? "blue" : "gray"}
              />
            ),
            title: "",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="User"
                size={20}
                icon={focused ? "person" : "person-outline"}
                color={focused ? "blue" : "gray"}
              />
            ),
            title: "",
          }}
        />
      </Tabs>
    </>
  );
};

export default MainTabLayout;
