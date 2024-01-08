import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";

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
      <StyledUXContainer>
        <StyledTitle>운동 수준이 어떻게 되시나요?</StyledTitle>
        <ButtonGroup
          buttons={["초급자", "중급자"]}
          selectedIndex={selectedIndex}
          containerStyle={{ margin: 16 }}
          onPress={(value) => {
            setSelectedIndex(value);
            setLevel(difficultyList[value]);
          }}
        />
      </StyledUXContainer>

      <NextBtn
        onPress={() => {
          handleSubmit();
          navigation.navigate("InfoTarget" as never, {
            difficulty: level,
            ...route.params,
          });
        }}
      />
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
const StyledUXContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;
