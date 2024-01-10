import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";

export default function InfoGender({ navigation }: { navigation: any }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [gender, setGender] = useState("남자");
  const genderList = ["남자", "여자"];
  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("user_gender", gender);
    } catch (error) {
      console.error("Error storing user gender:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  useEffect(() => {
    const getData = async () => {
      const userGoalVal = await AsyncStorage.getItem("user_goal");
      if (userGoalVal) {
        navigation.navigate("InfoLoad" as never);
      }
    };
    getData();
  }, []);
  return (
    <>
      <StyledUXContainer>
        <StyledTitle>성별을 입력해주세요</StyledTitle>
        <ButtonGroup
          buttons={genderList}
          selectedIndex={selectedIndex}
          containerStyle={{ margin: 16 }}
          onPress={(value) => {
            setSelectedIndex(value);
            setGender(genderList[value]);
          }}
        />
      </StyledUXContainer>

      <NextBtn
        onPress={async () => {
          await handleSubmit();
          const userId = await AsyncStorage.getItem("user_id");

          // Check if userId is not null before parsing
          if (userId !== null) {
            navigation.navigate("InfoAge" as never, {
              user_id: userId,
              gender: gender,
            });
          } else {
            // Handle the case where userId is null
            console.error("user_id is null");
          }
        }}
      />
    </>
  );
}

const StyledUXContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;

const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 200px;
`;
