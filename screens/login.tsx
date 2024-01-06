import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

import KakaoLogin from "../components/KakaoLogin";
import { localPort } from "../utils/constants";

async function fetchUserInfo(
  userData: { authorization_code: string },
  loginSuccess: () => void
) {
  // const [isSignedUp, setIsSignedUp] = useState(false);
  await fetch(`${localPort}/oauth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Received data:", data); // TODO: 회원 가입 여부 붙여서 받기
      // setIsSignedUp(data.isSignedUp);
    })
    .then(() => {
      loginSuccess();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // return isSignedUp;
}

export default function Login({ loginSuccess }: { loginSuccess: () => void }) {
  const [tryAuth, setTryAuth] = useState(false);
  const onSuccess = (requestCode: string) => {
    console.log(requestCode);
    const userData = {
      authorization_code: requestCode,
    };
    fetchUserInfo(userData, loginSuccess);
    setTryAuth(false);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.container}>안녕하세요</Text>
      <Button
        title="Kakao로 로그인하기"
        onPress={() => {
          setTryAuth(true);
        }}
      />
      <Modal visible={tryAuth}>
        <KakaoLogin onAuthSuccess={onSuccess} />
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
