import React from "react";
import { View, Linking, Text, Button, Image } from "react-native";
import styled from "styled-components/native";
import YoutubeButton from "./YoutubeButton";
import { SPROUT_GPT_PROFILE } from "../../utils/constants";
import {
  GREEN_LIGHT,
  GREEN_MAIN,
  ORANGE_MAIN,
  GREEN_DEEP,
} from "../../utils/colors";

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
  const exerciseText =
    `추천드린 운동은 ${exerciseItem.name} 입니다. \n` +
    `이 운동은 ${exerciseItem.description} 이고, ${exerciseItem.target} 부위를 타겟으로 합니다.\n` +
    `이 운동을 배울 수 있는 영상의 링크를 드릴게요.`;

  return (
    <StyledLayout>
      <StyledContainer>
        <Image
          source={{ uri: SPROUT_GPT_PROFILE }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <StyledAnswer>
          <StyledName>SproutGPT</StyledName>
          <StyledMsgBox>
            <StyledMsg>{exerciseText}</StyledMsg>
          </StyledMsgBox>
          <YoutubeButton onPress={onLinkPress} />
        </StyledAnswer>
      </StyledContainer>
      <Button title="돌아가기" onPress={onDetailComplete} />
    </StyledLayout>
  );
}

export default ExerciseDetail;

const StyledMsgBox = styled(View)`
  background-color: #ffffff;
  max-width: 90%;
`;

const StyledName = styled(Text)`
  font-family: Jalnan2;

  font-weight: bold;
  font-size: 24px;
`;

const StyledMsg = styled(Text)`
  font-family: Jalnan2;

  font-size: 16x;
  line-height: 24px;
`;

const StyledAnswer = styled(View)`
  flex-direction: column;
  margin-top: 12px;
  gap: 16px;
`;

const StyledContainer = styled(View)`
  flex-direction: row;
  margin-top: 48px;
  margin-left: 20px;
  margin-right: 20px;
`;

const StyledLayout = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;
