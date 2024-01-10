import React, { useState } from "react";
import { Text, View, ImageBackground, TextInput, Alert } from "react-native";
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
      <ImageBackground
        source={require("../../assets/sprout_background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledUXContainer>
          <StyledTitle>키와 몸무게를 입력해주세요</StyledTitle>
          <StyledInputsContainer>
            <StyledInputContainer>
              <TextInput
                placeholder="키를 입력해주세요"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                style={{
                  paddingRight: 50,
                  fontSize: 24,
                  borderColor: "#FFFFFF",
                }}
              />
              <StyledUnit>cm</StyledUnit>
            </StyledInputContainer>
            <StyledInputContainer>
              <TextInput
                placeholder="몸무게를 입력해주세요"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                style={{
                  paddingRight: 50,
                  fontSize: 24,
                  borderColor: "#FFFFFF",
                }}
              />
              <StyledUnit>kg</StyledUnit>
            </StyledInputContainer>
          </StyledInputsContainer>
        </StyledUXContainer>
        <StyledBtnContainer>
          <NextBtn onPress={onSubmit} />
        </StyledBtnContainer>
      </ImageBackground>
    </>
  );
}

const StyledUnit = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-family: Jalnan2;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 28px;
  letter-spacing: 0.15px;
`;
const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-family: Jalnan2;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
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

const StyledBtnContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 300px;
`;
