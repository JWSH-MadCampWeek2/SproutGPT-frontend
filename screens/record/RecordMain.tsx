import React from "react";
import { FlatList } from "react-native";
import CalendarComp from "../../components/record/CalendarComp";
import RecordItem from "../../components/record/RecordItem";
const DATA = [
  { id: "1", name: "스쿼트", description: "근육 1과 근육 2의 발달에 좋습니다" },
  { id: "2", name: "데드리프트", description: "코어 근육의 발달에 좋습니다." },
  { id: "3", name: "트레드밀 러닝", description: "체력 강화에 좋습니다." },
  { id: "4", name: "푸시업", description: "코어 근육의 발달에 좋습니다." },
];
export default function RecordMain() {
  return (
    <>
      <CalendarComp />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <RecordItem recordItem={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
