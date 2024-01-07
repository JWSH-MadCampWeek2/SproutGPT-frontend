import React, { useState } from "react";
import { Text, StyleSheet, TextInput } from "react-native";
import { NextBtn } from "../../components/info/InfoBtn";

export default function InfoAge({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [age, setAge] = useState("");
  return (
    <>
      <Text style={Styles.HomeText}>나이를 입력해주세요</Text>
      <TextInput
        placeholder="만"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <Text>세</Text>
      <NextBtn
        onPress={() =>
          navigation.navigate("InfoBody" as never, {
            age: age,
            ...route.params,
          })
        }
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
