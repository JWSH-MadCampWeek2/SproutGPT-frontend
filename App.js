import { useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userId, setUserId] = useState("");

  return isLoggedIn ? (
    <Home />
  ) : (
    <Login
      loginSuccess={() => {
        setIsLoggedIn(true);
        console.log("login success");
        console.log(AsyncStorage.getAllKeys());
      }}
    />
  );
}

export default App;
