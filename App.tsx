import React, { useState, useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { View } from "react-native";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // AsyncStorage.clear();

  useEffect(() => {
    const getData = async () => {
      const userIdVal = await AsyncStorage.getItem("user_id");
      if (userIdVal) {
        setIsLoggedIn(true);
      }
    };
    getData();
  }, []);

  const componentDidMount = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return false ? (
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

const StyledContainer = styled(View)`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
