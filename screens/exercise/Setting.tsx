import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import { ConfirmBtn } from "../../components/info/InfoBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { localPort } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import { LogoutBtn } from "../../components/exercise/Buttons";

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

  try {
    await AsyncStorage.setItem("user_gender", userInfo.gender);
    await AsyncStorage.setItem("user_age", userInfo.age);
    await AsyncStorage.setItem("user_height", userInfo.height);
    await AsyncStorage.setItem("user_weight", userInfo.weight);
  } catch (error) {
    console.error("Error storing user info to AsyncStorage:", error);
    // Handle the error, e.g., show an error message to the user
  }
}

function Setting({
  onSettingComplete,
  onSettingBack,
  id,
  userGender,
  userAge,
  userHeight,
  userWeight,
}: {
  onSettingComplete: () => void;
  onSettingBack: () => void;
  id: string;
  userGender: string;
  userAge: string;
  userHeight: string;
  userWeight: string;
}) {
  const [userId, setUserId] = useState(id);
  // gender
  const genderList = ["남자", "여자"];
  const [selectedGender, setSelectedGender] = useState(0);
  const [gender, setGender] = useState(userGender);
  // age
  const [age, setAge] = useState(userAge);
  // body
  const [height, setHeight] = useState(userHeight);
  const [weight, setWeight] = useState(userWeight);

  return (
    <StyledContainer>
      <>
        <BackButton onPress={onSettingBack} />
        <StyledTitle>성별을 입력해주세요</StyledTitle>
        <ButtonGroup
          buttons={genderList}
          selectedIndex={selectedGender}
          containerStyle={{ margin: 16 }}
          onPress={(value) => {
            setSelectedGender(value);
            setGender(genderList[value]);
          }}
        />
      </>
      <>
        <StyledTitle>나이를 입력해주세요</StyledTitle>
        <StyledInputContainer>
          <TextInput
            placeholder="만"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            placeholderTextColor="#808080"
          />
          <StyledUnit>세</StyledUnit>
        </StyledInputContainer>
      </>

      <StyledTitle>키와 몸무게를 입력해주세요</StyledTitle>
      <StyledInputsContainer>
        <StyledInputContainer>
          <TextInput
            placeholder="키를 입력해주세요"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholderTextColor="#808080"
          />
          <StyledUnit>cm</StyledUnit>
        </StyledInputContainer>
        <StyledInputContainer>
          <TextInput
            placeholder="몸무게를 입력해주세요"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholderTextColor="#808080"
          />
          <StyledUnit>kg</StyledUnit>
        </StyledInputContainer>
      </StyledInputsContainer>

      <ConfirmBtn
        onPress={() => {
          sendUserInfo({ user_id: userId, gender, age, height, weight });
          onSettingComplete();
        }}
      />
      <LogoutBtn />
    </StyledContainer>
  );
}

const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
`;

const StyledContainer = styled(View)`
  margin-top: 60px;
  margin-left: 16px;
  margin-right: 16px;
`;

const StyledInputContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  flex-direction: row;
`;
const StyledUnit = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0.15px;
`;

const StyledInputsContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 46px;
`;

export default Setting;
