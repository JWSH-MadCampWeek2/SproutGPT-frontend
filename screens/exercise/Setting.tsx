import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { ButtonGroup, Button } from "@rneui/themed";
import { ConfirmBtn } from "../../components/info/InfoBtn";

function Setting({ navigation }: { navigation: any }) {
  // gender
  const genderList = ["남자", "여자"];
  const [selectedGender, setSelectedGender] = useState(0);
  const [gender, setGender] = useState("남자");

  // age
  const [age, setAge] = useState("");

  // body
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <>
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
          buttons={genderList}
          selectedIndex={selectedGender}
          containerStyle={{ margin: 16 }}
          onPress={(value) => {
            setSelectedGender(value);
            setGender(genderList[value]);
          }}
        />
      </>
      <>
        <Text>나이를 입력해주세요</Text>
        <TextInput
          placeholder="만"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <Text>세</Text>
      </>
      <>
        <Text>키와 몸무게를 입력해주세요</Text>
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
      </>
      <ConfirmBtn
        onPress={() => {
          navigation.navigate("ExerciseMain");
        }}
      />
    </>
  );
}

export default Setting;
