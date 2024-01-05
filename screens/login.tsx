import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import KakaoLogin from "../components/KakaoLogin";

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={Styles.container}>
      <Text style={Styles.container}>안녕하세요</Text>
      <Button
        title="Kakao로 로그인하기"
        onPress={() =>
          navigation.navigate("KakaoLogin", { screen: "KakaoLogin" })
        }
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: "30%",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
