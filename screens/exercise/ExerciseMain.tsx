import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import styled, { css } from "styled-components/native";
import ExerciseItem from "../../components/exercise/ExerciseItem";
import Greeting from "../../components/exercise/Greeting";
import { ChangeGoalBtn, RetryBtn } from "../../components/exercise/RecmBtn";

const DATA = [
  { id: "1", name: "스쿼트", description: "근육 1과 근육 2의 발달에 좋습니다" },
  { id: "2", name: "데드리프트", description: "코어 근육의 발달에 좋습니다." },
  { id: "3", name: "트레드밀 러닝", description: "체력 강화에 좋습니다." },
  { id: "4", name: "푸시업", description: "코어 근육의 발달에 좋습니다." },
];

export default function ExerciseMain({ navigation }: { navigation: any }) {
  // TODO: isChecked, order 관리 via state
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getData = async () => {
      const userIdVal = await AsyncStorage.getItem("user_id");
      const userNameVal = await AsyncStorage.getItem("user_name");
      if (userIdVal) {
        setUserId(JSON.parse(userIdVal));
      }
      if (userNameVal) {
        setUserName(JSON.parse(userNameVal));
      }
    };
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Greeting userName={userName} navigation={navigation} />
      <Button title="오운완!" type="outline" />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ExerciseItem exerciseItem={item} />}
        keyExtractor={(item) => item.id}
      />
      <ChangeGoalBtn />
      <RetryBtn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
