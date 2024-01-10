import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"; // or any other icon library you are using

import ExerciseMain from "../screens/exercise/ExerciseMain";
import GrassMain from "../screens/grass/GrassMain";
import RankMain from "../screens/rank/RankMain";
import InfoGender from "../screens/info/InfoGender";
import InfoBody from "../screens/info/InfoBody";
import InfoAge from "../screens/info/InfoAge";
import InfoGoal from "../screens/info/InfoGoal";
import InfoLevel from "../screens/info/InfoLevel";
import InfoTarget from "../screens/info/InfoTarget";
import InfoLoad from "../screens/info/InfoLoad";
import App from "../App";

import { GREEN_MAIN, GREEN_DEEP } from "../utils/colors";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export function InfoStack({ initialRouteName }: { initialRouteName: string }) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="InfoGender" component={InfoGender} />
      <Stack.Screen name="InfoAge" component={InfoAge} />
      <Stack.Screen name="InfoBody" component={InfoBody} />

      <Stack.Screen name="InfoLevel" component={InfoLevel} />
      <Stack.Screen name="InfoTarget" component={InfoTarget} />
      <Stack.Screen name="InfoGoal" component={InfoGoal} />

      <Stack.Screen name="InfoLoad" component={InfoLoad} />
      <Stack.Screen name="BottomStack" component={BottomStack} />
      <Stack.Screen name="App" component={App} />
    </Stack.Navigator>
  );
}

export function BottomStack({ route }: { route?: any }) {
  return (
    <BottomTab.Navigator
      initialRouteName="Exercise"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: GREEN_MAIN,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Exercise") {
            // Set the icon for ExerciseMain
            iconName = "dumbbell";
          } else if (route.name === "History") {
            // Set the icon for GrassMain
            iconName = "history";
          } else if (route.name === "Ranking") {
            // Set the icon for RankMain
            iconName = "trophy";
          }

          // Use any icon library or image here
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="Exercise" component={ExerciseMain} />
      <BottomTab.Screen name="History" component={GrassMain} />
      <BottomTab.Screen name="Ranking" component={RankMain} />
    </BottomTab.Navigator>
  );
}
