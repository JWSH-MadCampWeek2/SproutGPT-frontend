import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import KakaoLogin from "../components/KakaoLogin";
import { localPort } from "../utils/constants";

export default function Login({ loginSuccess }: { loginSuccess: () => void }) {
  const [tryAuth, setTryAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userPhoto: "",
  });

  const onSuccess = (requestCode: string) => {
    console.log(`Login_requestCode: ${requestCode}`);
    const userData = {
      authorization_code: requestCode,
    };
    fetchUserInfo(userData);
    setTryAuth(false);
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("user_id", userInfo.userId);
      await AsyncStorage.setItem("user_name", userInfo.userName);
      await AsyncStorage.setItem("user_photo", userInfo.userPhoto);
      console.log(await AsyncStorage.getAllKeys());
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };
  const fetchUserInfo = async (userData: { authorization_code: string }) => {
    try {
      const response = await fetch(`${localPort}/oauth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Received data:", data);

      setUserInfo({
        userId: data.user_id,
        userName: data.nickname,
        userPhoto: data.profile_image,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (userInfo.userId && userInfo.userName && userInfo.userPhoto) {
      // Ensure that the component is still mounted before updating state
      if (isMounted) {
        setUserInfo(userInfo);
      }

      handleSubmit();
      loginSuccess();
    }

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [userInfo, handleSubmit, loginSuccess]);
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
