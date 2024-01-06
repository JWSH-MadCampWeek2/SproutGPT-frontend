import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Input, Button, ButtonGroup } from "@rneui/themed";

export default function InfoBody({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

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
      <Button
        title={"다음으로"}
        type="outline"
        style={{ margin: 16 }}
        onPress={() =>
          navigation.navigate("InfoPurpose" as never, {
            height: height,
            weight: weight,
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
