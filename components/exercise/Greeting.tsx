import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Setting from "../../screens/exercise/Setting";
import { useNavigation, useNavigationState } from "@react-navigation/native";

function SettingsButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ padding: 10 }}>
        <Icon name="settings" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}

function Greeting({
  userName,
  userPhoto,
}: {
  userName: string;
  userPhoto: string;
}) {
  const [userId, setUserId] = useState("");
  const [userGender, setUserGender] = useState("남자");
  // age
  const [userAge, setUserAge] = useState("");
  // body
  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [isSetting, setIsSetting] = useState(false);
  const navigation = useNavigation();

  const onSetting = () => {
    console.log("setting clicked");
    setIsSetting(true);
  };
  const onSettingComplete = () => {
    setIsSetting(false);
    navigation.navigate("InfoLoad");
  };
  const onSettingBack = () => {
    setIsSetting(false);
  };

  useEffect(() => {
    const getData = async () => {
      const userIdVal = await AsyncStorage.getItem("user_id");
      const userGenderVal = await AsyncStorage.getItem("user_gender");
      const userAgeVal = await AsyncStorage.getItem("user_age");
      const userHeightVal = await AsyncStorage.getItem("user_height");
      const userWeightVal = await AsyncStorage.getItem("user_weight");

      if (userIdVal) {
        setUserId(userIdVal);
      }
      if (userGenderVal) {
        setUserGender(userGenderVal);
      }
      if (userAgeVal) {
        setUserAge(userAgeVal);
      }
      if (userHeightVal) {
        setUserHeight(userHeightVal);
      }
      if (userWeightVal) {
        setUserWeight(userWeightVal);
      }
    };
    getData();
  }, []);

  return (
    <StyledGreetingContainer>
      <Image
        source={{ uri: userPhoto }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <StyledGreeting>안녕하세요 {userName} 님!</StyledGreeting>
      <SettingsButton onPress={onSetting} />
      <Modal visible={isSetting}>
        <Setting
          onSettingComplete={onSettingComplete}
          onSettingBack={onSettingBack}
          id={userId}
          userGender={userGender}
          userAge={userAge}
          userHeight={userHeight}
          userWeight={userWeight}
        />
      </Modal>
    </StyledGreetingContainer>
  );
}

/* Typography/H5 */
const StyledGreeting = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px;
`;

const StyledGreetingContainer = styled(View)`
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: #f5f5f5;
  margin: 12px;
  padding: 16px;
  padding-left: 28px;
`;

export default Greeting;
