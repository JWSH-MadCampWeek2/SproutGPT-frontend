import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

import { NextBtn } from "../../components/info/InfoBtn";

export default function InfoTarget({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [target, setTarget] = useState<string[]>([]);
  const targetList = ["등", "어깨", "복근", "하체", "팔", "상관 없음"];
  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_target", JSON.stringify(target));
  };

  return (
    <>
      <StyledUXContainer>
        <StyledTitle>운동하고 싶은 부위를 선택해주세요</StyledTitle>
        <ButtonGroup
          buttons={targetList}
          vertical
          selectMultiple
          selectedIndexes={selectedIndexes}
          onPress={(value) => {
            setSelectedIndexes(value);
            const selectedTarget = value.map(
              (index: number) => targetList[index]
            );
            setTarget(selectedTarget);
          }}
          containerStyle={{ marginBottom: 20 }}
        />
      </StyledUXContainer>

      <NextBtn
        onPress={() => {
          handleSubmit();
          navigation.navigate("InfoGoal", {
            target: target,
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
  flex-direction: column;
`;
