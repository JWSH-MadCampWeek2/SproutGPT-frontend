import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/Login";
import Exercise from "../screens/Exercise";
import Record from "../screens/Record";
import Rank from "../screens/Rank";
import KakaoLogin from "../components/KakaoLogin";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

// export function StackScreen() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export function BottomStack() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Exercise" component={Exercise} />
        <BottomTab.Screen name="Record" component={Record} />
        <BottomTab.Screen name="Rank" component={Rank} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
