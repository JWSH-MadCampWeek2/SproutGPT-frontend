import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  navigation,
}: {
  userName: string;
  navigation: any;
}) {
  const onSetting = () => {
    console.log("setting clicked");
    navigation.navigate("Setting");
  };
  return (
    <StyledGreetingContainer>
      <StyledGreeting>안녕하세요 {userName} 님!</StyledGreeting>
      <SettingsButton onPress={onSetting} />
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
