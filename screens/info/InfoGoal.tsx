import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { localPort } from "../../utils/constants";
import { StartBtn } from "../../components/info/InfoBtn";

export default function InfoGoal({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const goalList = ["근육 증가", "체지방 감소", "현재 상태 유지"];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [goal, setGoal] = useState<string>("");

  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_goal", goal);
    navigation.navigate("InfoLoad", { user_id: route.params.user_id });
  };

  const sendUserGoal = async (userInfo: {
    user_id: string;
    difficulty: string;
    target: string[];
    exercise_goal: string;
  }) => {
    // request for update user info
    console.log(userInfo);
    await fetch(`${localPort}/goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // This useEffect will be triggered whenever the 'goal' state changes
    sendUserGoal({
      exercise_goal: goal,
      ...route.params,
    });
  }, [goal]); // Watch for changes in the 'goal' state

  return (
    <>
      <StyledUXContainer>
        <StyledTitle>운동 목표를 선택해주세요</StyledTitle>
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
      </StyledUXContainer>
      <StartBtn onPress={handleSubmit} />
    </>
  );
}

const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 200px;
`;

const StyledUXContainer = styled(View)`
  flex-direction: column;
`;
