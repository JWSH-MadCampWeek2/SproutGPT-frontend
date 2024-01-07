import { useState } from "react";
import { InfoStack } from "./navigation/Navigation";
import Login from "./screens/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userId, setUserId] = useState("");

  return isLoggedIn ? (
    <InfoStack />
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
