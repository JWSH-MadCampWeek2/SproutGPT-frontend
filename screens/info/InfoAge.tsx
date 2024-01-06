import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Input, Button } from "@rneui/themed";

export default function InfoAge({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [age, setAge] = useState("");
  // console.log(`route params: ${route.params.gender}`);
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
      <Button
        title={"다음으로"}
        type="outline"
        style={{ margin: 16 }}
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
