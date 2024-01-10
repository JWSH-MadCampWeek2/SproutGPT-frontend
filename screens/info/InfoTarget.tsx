import React, { useState } from "react";
import { Text, ImageBackground, View, Alert } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";
import { GREEN_DEEP } from "../../utils/colors";

export default function InfoTarget({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [target, setTarget] = useState<string[]>([]);
  const targetList = ["등", "어깨", "복근", "하체", "팔", "가슴"];

  const onSelect = (value: number[]) => {
    setSelectedIndexes(value);
    const selectedTarget = value.map((index: number) => targetList[index]);
    setTarget(selectedTarget);
  };
  const onSubmit = async () => {
    if (target.length > 0) {
      await AsyncStorage.setItem("user_target", JSON.stringify(target));
      navigation.navigate("InfoGoal", {
        target: target,
        ...route.params,
      });
    } else {
      Alert.alert(
        "안내",
        "운동하고 싶은 부위를 선택해주세요",
        [{ text: "확인", onPress: () => {}, style: "cancel" }],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
    }
  };

  return (
    <StyledContainer>
      <ImageBackground
        source={require("../../assets/sprout_background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledUXContainer>
          <StyledTitle>운동하고 싶은 부위를 선택해주세요</StyledTitle>
          <ButtonGroup
            buttons={targetList}
            vertical
            selectMultiple
            selectedIndexes={selectedIndexes}
            onPress={onSelect}
            containerStyle={{
              backgroundColor: "#A9BA9DF0",
              width: "90%",
              borderColor: "transparent",
            }}
            selectedButtonStyle={{
              backgroundColor: GREEN_DEEP,
              borderColor: "#FFFFFF",
            }}
            disabledSelectedStyle={{
              borderColor: "#FFFFFF",
              backgroundColor: "#808080",
              borderWidth: 10,
            }}
            disabledStyle={{
              borderColor: "#FFFFFF",
              backgroundColor: "#808080",
              borderWidth: 10,
            }}
            buttonStyle={{
              borderRadius: 100,
            }}
            textStyle={{ color: "#fff", fontSize: 20 }}
          />
        </StyledUXContainer>
        <StyledBtnContainer>
          <NextBtn onPress={onSubmit} />
        </StyledBtnContainer>
      </ImageBackground>
    </StyledContainer>
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
  flex-direction: column;
  align-items: center;
`;
const StyledBtnContainer = styled(View)`
  width: 100%;
  position: absolute;
  bottom: 300px;
`;
const StyledContainer = styled(View)`
  align-items: center;
`;
