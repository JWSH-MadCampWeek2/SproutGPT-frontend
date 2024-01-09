import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Setting from "../../screens/exercise/Setting";

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
  navigation,
}: {
  userName: string;
  userPhoto: string;
  navigation: any;
}) {
  const [isSetting, setIsSetting] = useState(false);
  const onSetting = () => {
    console.log("setting clicked");
    setIsSetting(true);
  };
  const onSettingComplete = () => {
    setIsSetting(false);
  };
  return (
    <StyledGreetingContainer>
      <Image
        source={{ uri: userPhoto }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <StyledGreeting>안녕하세요 {userName} 님!</StyledGreeting>
      <SettingsButton onPress={onSetting} />
      <Modal visible={isSetting}>
        <Setting onSettingComplete={onSettingComplete} />
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
