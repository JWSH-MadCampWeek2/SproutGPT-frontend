import React from "react";
import { Text, Button, Image, View } from "react-native";

import styled from "styled-components/native";
import { SPROUT_GPT_PROFILE } from "../../utils/constants";

function Comment({
  onCommentComplete,
  commentData,
}: {
  onCommentComplete: () => void;
  commentData: string;
}) {
  // Use a regular expression to remove the numeric part
  const quoteIndex = commentData.indexOf("'");

  // Extract the substring starting from the character after the first single quote
  const parsedString = commentData
    .substring(quoteIndex + 1, commentData.length - 1)
    .replace(/\\n/g, "\n");
  console.log(parsedString);

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
            <StyledMsg>{parsedString}</StyledMsg>
          </StyledMsgBox>
        </StyledAnswer>
      </StyledContainer>
      <Button title="돌아가기" onPress={onCommentComplete} />
    </StyledLayout>
  );
}

export default Comment;

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
