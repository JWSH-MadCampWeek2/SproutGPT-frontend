import React from "react";
import { View, Linking, Text, Button } from "react-native";
import styled from "styled-components/native";
import YoutubeButton from "./YoutubeButton";

function ExerciseDetail({
  exerciseItem,
  onDetailComplete,
}: {
  exerciseItem: {
    name: string;
    description: string;
    link: string;
    target: string;
  };
  onDetailComplete: () => void;
}) {
  const onLinkPress = () => {
    if (exerciseItem.link) {
      Linking.openURL(exerciseItem.link);
    }
  };
  return (
    <View>
      <StyledTextContainer>
        <StyledName>{exerciseItem.name}</StyledName>
        <YoutubeButton onPress={onLinkPress} />
        <StyledDescription>{exerciseItem.description}</StyledDescription>
        <StyledDescription>타겟 부위: {exerciseItem.target}</StyledDescription>
      </StyledTextContainer>
      <Button title="돌아가기" onPress={onDetailComplete} />
    </View>
  );
}

export default ExerciseDetail;

const StyledItemContainer = styled(View)`
  flex-direction: row;
  margin: 12px;
  align-content: center;
`;

const StyledTextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  margin: 8px;
`;

const StyledName = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 200px;
`;

const StyledDescription = styled(Text)`
  color: var(--Light-Text-Secondary, rgba(0, 0, 0, 0.6));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.17px;
`;
