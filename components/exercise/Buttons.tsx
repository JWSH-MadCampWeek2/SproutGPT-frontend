import React from "react";
import { Button } from "@rneui/themed";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GREEN_DEEP, GREEN_MAIN } from "../../utils/colors";

export function RetryBtn() {
  const navigation = useNavigation();
  const onRetry = () => {
    console.log("onRetry Clicked");
    navigation.navigate("InfoLoad" as never);
  };
  return (
    <StyledBtn
      title="다른 운동을 추천해주세요"
      radius={"lg"}
      onPress={onRetry}
      color={GREEN_MAIN}
    />
  );
}

export function ChangeGoalBtn() {
  const navigation = useNavigation();
  const onChangeGoal = () => {
    console.log("onChangeGoal Clicked");
    navigation.navigate("InfoLevel");
  };
  return (
    <StyledBtn
      radius={"lg"}
      title="운동 목표를 바꾸고 싶어요"
      onPress={onChangeGoal}
      color={GREEN_MAIN}
    />
  );
}

export function SubmitBtn() {
  const onChangeGoal = () => {
    console.log("onChangeGoal Clicked");
  };
  return (
    <StyledBtn
      radius={"lg"}
      title="오늘의 운동 완료"
      onPress={onChangeGoal}
      color={GREEN_MAIN}
    />
  );
}
export function LogoutBtn() {
  const navigation = useNavigation();
  const onLogout = () => {
    AsyncStorage.clear();
    navigation.navigate("App");
  };
  return (
    <Button
      title={"로그아웃"}
      color={GREEN_DEEP}
      onPress={onLogout}
      style={{ marginHorizontal: 16, height: 48 }}
      radius="lg"
    />
  );
}

const StyledBtn = styled(Button)`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 8px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 100%;
`;
