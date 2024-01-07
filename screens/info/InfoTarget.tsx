import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { ButtonGroup } from "@rneui/themed";
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

  return (
    <>
      <Text style={Styles.HomeText}>운동하고 싶은 부위를 선택해주세요</Text>
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
      <NextBtn
        onPress={() => {
          navigation.navigate("InfoGoal", {
            target: target,
            ...route.params,
          });
        }}
      />
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
