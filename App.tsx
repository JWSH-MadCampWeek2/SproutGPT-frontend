import React, { useState, useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { View } from "react-native";
import * as Font from "expo-font";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Jalnan2: require("./assets/font/Jalnan2.otf"),
      });
      setIsFontLoaded(true);
    };
    loadFont();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const userIdVal = await AsyncStorage.getItem("user_id");
      if (userIdVal) {
        setIsLoggedIn(true);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (isFontLoaded) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    // Font is still loading, you can render a loading screen or component here
    return <View />;
  }

  return isLoggedIn ? (
    <Home />
  ) : (
    <Login
      loginSuccess={() => {
        setIsLoggedIn(true);
        console.log("login success");
      }}
    />
  );
}

export default App;
