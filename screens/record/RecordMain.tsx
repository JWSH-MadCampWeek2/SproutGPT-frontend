import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function RecordMain() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.HomeText}>This is Record Page</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
