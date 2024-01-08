import React, { useState } from "react";
import { Text, StyleSheet, TextInput } from "react-native";
import { NextBtn } from "../../components/info/InfoBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InfoAge({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [age, setAge] = useState("");
  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_age", age);
  };
  return (
    <>
      <Text>나이를 입력해주세요</Text>
      <TextInput
        placeholder="만"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <Text>세</Text>
      <NextBtn
        onPress={() => {
          handleSubmit();
          navigation.navigate("InfoBody" as never, {
            age: age,
            ...route.params,
          });
        }}
      />
    </>
  );
}
