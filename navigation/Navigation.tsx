import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExerciseMain from "../screens/exercise/ExerciseMain";
import RecordMain from "../screens/record/RecordMain";
import RankMain from "../screens/rank/RankMain";
import InfoGender from "../screens/info/InfoGender";
import InfoBody from "../screens/info/InfoBody";
import InfoAge from "../screens/info/InfoAge";
import InfoPurpose from "../screens/info/InfoPurpose";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export function InfoStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InfoGender">
        <Stack.Screen name="InfoGender" component={InfoGender} />
        <Stack.Screen name="InfoAge" component={InfoAge} />
        <Stack.Screen name="InfoBody" component={InfoBody} />
        <Stack.Screen name="InfoPurpose" component={InfoPurpose} />
        <Stack.Screen name="BottomStack" component={BottomStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function BottomStack() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName="ExerciseMain">
        <BottomTab.Screen name="ExerciseMain" component={ExerciseMain} />
        <BottomTab.Screen name="RecordMain" component={RecordMain} />
        <BottomTab.Screen name="RankMain" component={RankMain} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
