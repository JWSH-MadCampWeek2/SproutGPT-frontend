import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Modal, Image } from "react-native";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

import KakaoLogin from "../components/KakaoLogin";
import { localPort } from "../utils/constants";
import styled from "styled-components/native";
import { GREEN_DEEP, ORANGE_MAIN, YELLOW_KAKAO } from "../utils/colors";

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
    <>
      <ImageBackground
        source={require("../assets/sprout_background.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledContainer>
          <StyledIntroContainer>
            <StyledTitle>안녕하세요,</StyledTitle>
            <StyledTitle>만나서 반가워요!</StyledTitle>
            <StyledTitle>저는 여러분의 운동 추천 AI</StyledTitle>
            <StyledTitleContainer>
              <StyledTitle style={{ color: GREEN_DEEP }}>
                Sprout GPT
              </StyledTitle>
              <StyledTitle>예요</StyledTitle>
            </StyledTitleContainer>
          </StyledIntroContainer>

          <Image
            source={require("../assets/sprout_icon.png")}
            style={{ width: 100, height: 100 }}
          />
          <StyledBtn
            title="Kakao로 로그인하기"
            onPress={() => {
              setTryAuth(true);
            }}
            icon={{
              name: "chatbubble",
              type: "ionicon",
              size: 15,
              color: "#000000",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            radius={"lg"}
            color={YELLOW_KAKAO}
            titleStyle={{ color: "#000000", fontWeight: "bold" }}
          />
          <Modal visible={tryAuth}>
            <KakaoLogin onAuthSuccess={onSuccess} />
          </Modal>
        </StyledContainer>
      </ImageBackground>
    </>
  );
}

const StyledContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 36px;
`;
const StyledBtn = styled(Button)`
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  width: 200px;
  margin-bottom: 8px;
  margin-left: 12px;
  margin-right: 12px;
  border-radius: 100%;
`;
const StyledTitleContainer = styled(View)`
  flex-direction: row;
`;

const StyledIntroContainer = styled(View)`
  flex-direction: column;
  align-items: center;
`;
