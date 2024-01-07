import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Button, ButtonGroup } from "@rneui/themed";
import { localPort } from "../../utils/constants";

async function sendUserInfo(userInfo: {
  user_id: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  exercise_goal: string[];
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
}

export default function InfoPurpose({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [purposes, setPurposes] = useState<string[]>([]);
  const purposeList = [
    "다이어트",
    "벌크업",
    "체력 향상",
    "체중 증가",
    "넓은 어깨 갖기",
    "굵은 팔 갖기",
    "심폐 지구력 향상",
  ];

  return (
    <>
      <Text style={Styles.HomeText}>운동 목표를 선택해주세요</Text>
      <ButtonGroup
        buttons={purposeList}
        vertical
        selectMultiple
        selectedIndexes={selectedIndexes}
        onPress={(value) => {
          setSelectedIndexes(value);
          const selectedPurposes = value.map(
            (index: number) => purposeList[index]
          );
          setPurposes(selectedPurposes);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <Button
        title={"다음으로"}
        type="outline"
        style={{ margin: 16 }}
        onPress={() => {
          sendUserInfo({
            user_id: "3258378056",
            exercise_goal: purposes,
            ...route.params,
          });
          navigation.navigate("BottomStack");
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
