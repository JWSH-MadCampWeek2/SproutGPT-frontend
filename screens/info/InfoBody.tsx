import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";
import { localPort } from "../../utils/constants";

async function sendUserInfo(userInfo: {
  user_id: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
}) {
  console.log(userInfo);
  await fetch(`${localPort}/info`, {
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
}

export default function InfoBody({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const onSubmit = async () => {
    if (height == "") {
      Alert.alert(
        "안내",
        "키를 입력해주세요",
        [{ text: "확인", onPress: () => {}, style: "cancel" }],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    } else if (weight == "") {
      Alert.alert(
        "안내",
        "몸무게를 입력해주세요",
        [{ text: "확인", onPress: () => {}, style: "cancel" }],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    } else {
      sendUserInfo({
        ...route.params,
        height: height,
        weight: weight,
      });
      await AsyncStorage.setItem("user_height", height);
      await AsyncStorage.setItem("user_weight", weight);
      navigation.navigate("InfoLevel" as never, {
        user_id: route.params.user_id,
      });
    }
  };

  return (
    <>
      <StyledUXContainer>
        <StyledTitle>키와 몸무게를 입력해주세요</StyledTitle>
        <StyledInputsContainer>
          <StyledInputContainer>
            <TextInput
              placeholder="키를 입력해주세요"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <StyledUnit>cm</StyledUnit>
          </StyledInputContainer>
          <StyledInputContainer>
            <TextInput
              placeholder="몸무게를 입력해주세요"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <StyledUnit>kg</StyledUnit>
          </StyledInputContainer>
        </StyledInputsContainer>
      </StyledUXContainer>

      <NextBtn onPress={onSubmit} />
    </>
  );
}

const StyledUnit = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0.15px;
`;
const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 200px;
`;
const StyledInputContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  flex-direction: row;
`;

const StyledInputsContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 46px;
`;

const StyledUXContainer = styled(View)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 39px;
`;
