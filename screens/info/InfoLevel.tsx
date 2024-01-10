import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";
import { GREEN_DEEP } from "../../utils/colors";

export default function InfoLevel({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [level, setLevel] = useState("beginner");
  const difficultyList = ["beginner", "intermediate"];

  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_level", level);
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/sprout_background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledUXContainer>
          <StyledTitle>운동 수준이 어떻게 되시나요?</StyledTitle>
          <ButtonGroup
            buttons={["초급자", "중급자"]}
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
              setLevel(difficultyList[value]);
            }}
          />
        </StyledUXContainer>
        <StyledBtnContainer>
          <NextBtn
            onPress={async () => {
              await handleSubmit();
              const userId = await AsyncStorage.getItem("user_id");

              navigation.navigate("InfoTarget" as never, {
                user_id: userId,
                difficulty: level,
                ...route.params,
              });
            }}
          />
        </StyledBtnContainer>
      </ImageBackground>
    </>
  );
}

const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-family: Jalnan2;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 200px;
`;
const StyledUXContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;
const StyledBtnContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 300px;
`;
