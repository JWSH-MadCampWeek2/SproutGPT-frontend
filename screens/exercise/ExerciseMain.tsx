import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import { CheckBox } from "react-native-elements";
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

export default function ExerciseMain() {
  // TODO: isChecked, order 관리 via state
  return (
    <SafeAreaView style={styles.container}>
      <Greeting userName="시현" />
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
