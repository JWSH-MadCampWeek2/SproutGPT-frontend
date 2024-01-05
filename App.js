import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigation from "./navigation/Navigation";

import Login from "./screens/Login";

function App() {
  return (
    <Navigation>
      <Login />
    </Navigation>
  );
}

export default App;
