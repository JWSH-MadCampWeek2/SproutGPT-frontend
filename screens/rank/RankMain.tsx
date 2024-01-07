import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import RankItem from "../../components/rank/RankItem";

const DATA = [
  { id: "1", name: "안시현", score: 123 },
  { id: "2", name: "안시현", score: 123 },
  { id: "3", name: "안시현", score: 123 },
  { id: "4", name: "안시현", score: 123 },
  { id: "5", name: "안시현", score: 123 },
  { id: "6", name: "안시현", score: 123 },
  { id: "7", name: "안시현", score: 123 },
];

export default function RankMain() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.HomeText}>Today's Rank</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <RankItem rankItem={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
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
