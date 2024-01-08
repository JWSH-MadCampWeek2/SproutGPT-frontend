import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NextBtn } from "../../components/info/InfoBtn";
import { localPort } from "../../utils/constants";

async function sendUserInfo(userInfo: {
  user_id: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
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

export default function InfoBody({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const handleSubmit = async () => {
    await AsyncStorage.setItem("user_height", height);
    await AsyncStorage.setItem("user_weight", weight);
  };

  return (
    <>
      <Text style={Styles.HomeText}>키와 몸무게를 입력해주세요</Text>
      <View>
        <TextInput
          placeholder="키를 입력해주세요"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <Text>cm</Text>
      </View>
      <View>
        <TextInput
          placeholder="몸무게를 입력해주세요"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <Text>kg</Text>
      </View>
      <NextBtn
        onPress={() => {
          sendUserInfo({
            ...route.params,
          });
          handleSubmit();
          navigation.navigate("InfoLevel" as never, {
            user_id: route.params.user_id,
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
