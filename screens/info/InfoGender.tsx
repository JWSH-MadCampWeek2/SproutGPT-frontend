import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";

export default function InfoGender({ navigation }: { navigation: any }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [gender, setGender] = useState("남자");
  const genderList = ["남자", "여자"];

  return (
    <>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
        }}
      >
        성별을 입력해주세요
      </Text>
      <ButtonGroup
        buttons={["남자", "여자"]}
        selectedIndex={selectedIndex}
        containerStyle={{ margin: 16 }}
        onPress={(value) => {
          setSelectedIndex(value);
          setGender(genderList[value]);
        }}
      />
      <Button
        title={"다음으로"}
        type="outline"
        style={{ margin: 16 }}
        onPress={() =>
          navigation.navigate("InfoAge" as never, { gender: gender })
        }
      />
    </>
  );
}
