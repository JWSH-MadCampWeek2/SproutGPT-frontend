import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, TextInput } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import { ConfirmBtn } from "../../components/info/InfoBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { localPort } from "../../utils/constants";
import BackButton from "../../components/BackButton";
import { LogoutBtn } from "../../components/exercise/Buttons";
import { GREEN_DEEP } from "../../utils/colors";

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
    <ImageBackground
      source={require("../../assets/sprout_background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <StyledBackButton onPress={onSettingBack} />
      <StyledLayout>
        <StyledContainer>
          <StyledSectionContainer>
            <StyledTitle>성별을 입력해주세요</StyledTitle>
            <ButtonGroup
              buttons={genderList}
              selectedIndex={selectedGender}
              containerStyle={{
                backgroundColor: "transparent",
                width: "90%",
                borderColor: "transparent",
              }}
              selectedButtonStyle={{
                backgroundColor: GREEN_DEEP,
                borderColor: "#FFFFFF",
              }}
              disabledSelectedStyle={{
                borderColor: "#FFFFFF",
                borderWidth: 10,
              }}
              buttonStyle={{
                borderRadius: 100,
              }}
              textStyle={{ color: "#fff", fontSize: 20 }}
              onPress={(value) => {
                setSelectedGender(value);
                setGender(genderList[value]);
              }}
            />
          </StyledSectionContainer>
          <StyledSectionContainer>
            <StyledTitle>나이를 입력해주세요</StyledTitle>
            <StyledInputContainer>
              <TextInput
                placeholder="만"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                style={{
                  paddingRight: 20,
                  fontSize: 24,
                  borderColor: "#FFFFFF",
                }}
                placeholderTextColor="#808080"
              />
              <StyledUnit>세</StyledUnit>
            </StyledInputContainer>
          </StyledSectionContainer>
          <StyledSectionContainer>
            <StyledTitle>키와 몸무게를 입력해주세요</StyledTitle>
            <StyledInputsContainer>
              <StyledInputContainer>
                <TextInput
                  placeholder="키를 입력해주세요"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                  placeholderTextColor="#808080"
                  style={{
                    paddingRight: 20,
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
                  placeholderTextColor="#808080"
                  style={{
                    paddingRight: 20,
                    fontSize: 24,
                    borderColor: "#FFFFFF",
                  }}
                />
                <StyledUnit>kg</StyledUnit>
              </StyledInputContainer>
            </StyledInputsContainer>
          </StyledSectionContainer>
        </StyledContainer>
        <StyledButtons>
          <ConfirmBtn
            onPress={() => {
              sendUserInfo({ user_id: userId, gender, age, height, weight });
              onSettingComplete();
            }}
          />
          <LogoutBtn />
        </StyledButtons>
      </StyledLayout>
    </ImageBackground>
  );
}

const StyledLayout = styled(View)`
  gap: 32px;
`;

const StyledButtons = styled(View)`
  flex-direction: column;
  gap: 4px;
`;

const StyledTitle = styled(Text)`
  font-family: Jalnan2;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
`;

const StyledContainer = styled(View)`
  gap: 32px;
  align-items: center;
`;

const StyledInputContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  flex-direction: row;
`;
const StyledUnit = styled(Text)`
  font-family: Jalnan2;
  font-size: 20px;
  font-style: normal;
  line-height: 28px;
  letter-spacing: 0.15px;
`;

const StyledInputsContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 46px;
`;

const StyledSectionContainer = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const StyledBackButton = styled(BackButton)`
  position: absolute;
  top: 100px;
`;

export default Setting;
