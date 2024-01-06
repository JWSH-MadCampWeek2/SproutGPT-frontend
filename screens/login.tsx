import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import KakaoLogin from "../components/KakaoLogin";
import { localPort } from "../utils/constants";

export default function Login({
  setIsLoggedIn,
}: {
  setIsLoggedIn: () => void;
}) {
  // const navigation = useNavigation();
  const [tryLogin, setTryLogin] = useState(false);
  const onSuccess = (requestCode: string) => {
    setTryLogin(false);
    console.log(requestCode);
    const userData = {
      code: requestCode,
    };

    fetch(`${localPort}/`, {
      method: "POST",
      headers: {},
      body: JSON.stringify(userData),
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.container}>안녕하세요</Text>
      <Button
        title="Kakao로 로그인하기"
        onPress={() => {
          setTryLogin(true);
          setIsLoggedIn();
        }}
      />
      <Modal visible={tryLogin}>
        <KakaoLogin onSuccess={onSuccess} />
      </Modal>
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
