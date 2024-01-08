import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import { ConfirmBtn } from "../../components/info/InfoBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

function Setting({ onSettingComplete }: { onSettingComplete: () => void }) {
  // gender
  const genderList = ["남자", "여자"];
  const [selectedGender, setSelectedGender] = useState(0);
  const [gender, setGender] = useState("남자");

  // age
  const [age, setAge] = useState("");

  // body
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <StyledContainer>
      <>
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

      <ConfirmBtn onPress={onSettingComplete} />
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
