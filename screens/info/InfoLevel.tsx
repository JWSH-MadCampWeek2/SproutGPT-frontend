import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NextBtn } from "../../components/info/InfoBtn";

export default function InfoLevel({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [level, setLevel] = useState("초급자");
  const levelList = ["초급자", "중급자"];

  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_level", level);
  };

  return (
    <>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
        }}
      >
        운동 수준이 어떻게 되시나요?
      </Text>
      <ButtonGroup
        buttons={["초급자", "중급자"]}
        selectedIndex={selectedIndex}
        containerStyle={{ margin: 16 }}
        onPress={(value) => {
          setSelectedIndex(value);
          setLevel(levelList[value]);
        }}
      />
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
