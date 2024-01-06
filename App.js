import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import Navigation, { BottomStack, InfoStack } from "./navigation/Navigation";
import Login from "./screens/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);

  return isLoggedIn ? (
    <InfoStack />
  ) : (
    // <BottomStack />
    <Login
      // TODO: setIsLoggedIn(true) doesn't wait for request code generation
      loginSuccess={() => {
        setIsLoggedIn(true);
        console.log("login success");
      }}
    />
  );

  // return isLoggedIn && isSignedUp ? (<BottomStack />) : {isLoggedIn ? () : ()}

  // )
}

export default App;
