import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
    </Stack.Navigator>
  );
}

export function BottomStack({ route }: { route: any }) {
  return (
    <BottomTab.Navigator initialRouteName="ExerciseMain">
      <BottomTab.Screen name="ExerciseMain" component={ExerciseMain} />
      <BottomTab.Screen name="GrassMain" component={GrassMain} />
      <BottomTab.Screen name="RankMain" component={RankMain} />
    </BottomTab.Navigator>
  );
}
