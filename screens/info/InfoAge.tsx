import React, { useState } from "react";
import { Text, TextInput, View, Alert } from "react-native";
import { NextBtn } from "../../components/info/InfoBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

export default function InfoAge({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [age, setAge] = useState("");
  const onSubmit = async () => {
    if (age !== "") {
      await AsyncStorage.setItem("user_age", age);
      navigation.navigate("InfoBody" as never, {
        age: age,
        ...route.params,
      });
    } else {
      Alert.alert(
        "안내",
        "나이를 입력해주세요",
        [{ text: "확인", onPress: () => {}, style: "cancel" }],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    }
  };
  return (
    <>
      <StyledUXContainer>
        <StyledTitle>나이를 입력해주세요</StyledTitle>
        <StyledInputContainer>
          <StyledInput
            placeholder="만"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <StyledUnit>세</StyledUnit>
        </StyledInputContainer>
      </StyledUXContainer>

      <NextBtn onPress={onSubmit} />
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

const StyledInput = styled(TextInput)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const StyledUnit = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.15px;
`;

const StyledInputContainer = styled(View)`
  display: flex;
  width: 104px;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
`;

const StyledUXContainer = styled(View)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 69px;
`;
