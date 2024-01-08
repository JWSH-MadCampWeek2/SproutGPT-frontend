import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { localPort } from "../../utils/constants";
import { StartBtn } from "../../components/info/InfoBtn";

async function sendUserGoal(userInfo: {
  user_id: string;
  difficulty: string;
  target: string[];
  exercise_goal: string;
}) {
  console.log(userInfo);
  await fetch(`${localPort}/goal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  await fetch(`${localPort}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: "3258378056" }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received recommend data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default function InfoGoal({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [goal, setGoal] = useState<string>("");
  const goalList = ["근육 증가", "체지방 감소", "현재 상태 유지"];
  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_id", goal);
  };

  return (
    <>
      <Text style={Styles.HomeText}>운동 목표를 선택해주세요</Text>
      <ButtonGroup
        buttons={goalList}
        vertical
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
          setGoal(goalList[value]);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <StartBtn
        onPress={() => {
          handleSubmit();
          sendUserGoal({
            exercise_goal: goal,
            ...route.params,
          });
          navigation.navigate("BottomStack");
        }}
      />
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
