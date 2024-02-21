import React from "react";
import FollowUp from "../screens/FollowUp";
import Profile from "../screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import MenuScreen from "../screens/MenuScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#05be71",
      }}
    >
      <Tab.Screen
        name="Home"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Follow Up"
        component={FollowUp}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="people-arrows" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
