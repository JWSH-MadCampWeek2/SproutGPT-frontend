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
    userLevel: "",
    userGoal: "",
    userTarget: "",
    exist: false,
  });

  const onSuccess = (requestCode: string) => {
    console.log(`Login_requestCode: ${requestCode}`);
    const userData = {
      authorization_code: requestCode,
    };
    fetchUserInfo(userData);
    setTryAuth(false);
  };

  const handleNewUser = async () => {
    try {
      console.log("handling new user");
      await AsyncStorage.setItem("user_id", userInfo.userId);
      await AsyncStorage.setItem("user_name", userInfo.userName);
      await AsyncStorage.setItem("user_photo", userInfo.userPhoto);
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };

  const handleOldUser = async () => {
    try {
      console.log("handling old user");
      console.log(`userID: ${typeof userInfo.userId}`);

      await AsyncStorage.setItem("user_id", userInfo.userId);
      await AsyncStorage.setItem("user_name", userInfo.userName);
      await AsyncStorage.setItem("user_photo", userInfo.userPhoto);
      await AsyncStorage.setItem("user_level", userInfo.userLevel);
      await AsyncStorage.setItem(
        "user_target",
        JSON.stringify(userInfo.userTarget)
      );
      await AsyncStorage.setItem("user_goal", userInfo.userGoal);
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

      if (data.exist) {
        // existing user
        console.log(`userId: ${data.user_id}`);
        console.log(`userLevel: ${data.goals.difficulty}`);
        console.log(`userGoal: ${data.goals.exercise_goal}`);
        setUserInfo({
          userId: data.user_id,
          userName: data.nickname,
          userPhoto: data.profile_image,
          userLevel: data.goals.difficulty,
          userGoal: data.goals.exercise_goal,
          userTarget: data.goals.target,
          exist: true,
        });
      } else {
        // new user
        setUserInfo({
          userId: data.user_id,
          userName: data.nickname,
          userPhoto: data.profile_image,
          userLevel: "",
          userGoal: "",
          userTarget: "",
          exist: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (userInfo.userId && userInfo.userName && userInfo.userPhoto) {
      // Ensure that the component is still mounted before updating state
      if (isMounted) {
        if (userInfo.exist) {
          // existing user
          handleOldUser();
        } else {
          // new user
          handleNewUser();
        }
        loginSuccess();
      }
    }

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [userInfo, loginSuccess]);

  return (
    <View style={Styles.container}>
      <Text style={Styles.HomeText}>안녕하세요</Text>
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
    justifyContent: "center",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
