import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import MainNavigator from "../navigator/MainNavigator";

const Stack = createNativeStackNavigator();

export default function index() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, otherwise false
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setLoading(false); // Mark loading as false regardless of the result
      }
    };

    checkToken();
  }, []);

  if (!loaded || loading) {
    return <></>;
  } else {
    return (
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
    );
  }
}