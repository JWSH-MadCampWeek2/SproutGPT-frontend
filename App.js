import { useState, useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
