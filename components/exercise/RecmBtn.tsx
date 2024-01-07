import React from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export function RetryBtn() {
  const navigation = useNavigation();
  const onRetry = () => {
    console.log("onRetry Clicked");
    navigation.navigate(
      "InfoLoad" as never,
      { user_id: "3258378056" } as never
    ); // TODO: modify dummy data
  };
  return <StyledBtn title="다른 운동을 추천해주세요" onPress={onRetry} />;
}

export function ChangeGoalBtn() {
  const navigation = useNavigation();
  const onChangeGoal = () => {
    console.log("onChangeGoal Clicked");
    navigation.navigate("InfoLevel" as never); // TODO: attach user_id
  };
  return <StyledBtn title="운동 목표를 바꾸고 싶어요" onPress={onChangeGoal} />;
}

const StyledBtn = styled(Button)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 8px;
  margin-left: 12px;
  margin-right: 12px;
  border-color: blue;
  border-radius: 100%;
`;
