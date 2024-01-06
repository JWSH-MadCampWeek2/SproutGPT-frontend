import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import Navigation, { BottomStack } from "./navigation/Navigation";
import Exercise from "./screens/Exercise";

import Login from "./screens/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? (
    <BottomStack />
  ) : (
    <Login setIsLoggedIn={() => setIsLoggedIn(true)} />
  );
}

export default App;
