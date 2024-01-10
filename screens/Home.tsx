import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InfoLoad from "./info/InfoLoad";
import { BottomStack, InfoStack } from "../navigation/Navigation";

function Home() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    console.log("Component rendered!");

    const getData = async () => {
      const userGoalVal = await AsyncStorage.getItem("user_goal");
      console.log("user_goal value:", userGoalVal);

      // Simulate a delay of 1000 milliseconds (1 second)
      setTimeout(() => {
        if (userGoalVal) {
          setIsSignedUp(true);
        }
      }, 1000);
    };

    getData();
  }, []);

  console.log(`isSignedUp ?? : ${isSignedUp}`);

  return (
    <NavigationContainer>
      <InfoStack initialRouteName={isSignedUp ? "InfoLoad" : "InfoGender"} />
    </NavigationContainer>
  );
}

export default Home;
