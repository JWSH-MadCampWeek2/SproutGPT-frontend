import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";
import { GREEN_DEEP } from "../../utils/colors";

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
    <StyledContainer>
      <ImageBackground
        source={require("../../assets/sprout_background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledUXContainer>
          <StyledTitle>성별을 입력해주세요</StyledTitle>
          <ButtonGroup
            buttons={genderList}
            vertical
            selectedIndex={selectedIndex}
            containerStyle={{
              backgroundColor: "transparent",
              width: "90%",
              borderColor: "transparent",
            }}
            selectedButtonStyle={{
              backgroundColor: GREEN_DEEP,
              borderColor: "#FFFFFF",
            }}
            disabledSelectedStyle={{ borderColor: "#FFFFFF", borderWidth: 10 }}
            buttonStyle={{
              borderRadius: 100,
            }}
            textStyle={{ color: "#fff", fontSize: 20 }}
            onPress={(value) => {
              setSelectedIndex(value);
              setGender(genderList[value]);
            }}
          />
        </StyledUXContainer>
        <StyledBtnContainer>
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
        </StyledBtnContainer>
      </ImageBackground>
    </StyledContainer>
  );
}

const StyledUXContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: auto;
  justify-content: space-between;
`;

const StyledTitle = styled(Text)`
  font-family: Jalnan2;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 200px;
`;

const StyledContainer = styled(View)`
  flex-direction: column;
  align-items: center;
  gap: auto;
  justify-content: space-between;
`;

const StyledBtnContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 300px;
`;
