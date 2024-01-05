import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.HomeText}>This is Home Page</Text>
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
