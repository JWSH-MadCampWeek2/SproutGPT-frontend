import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

function RecordItem({ recordItem }: { recordItem: string }) {
  console.log(`recordItem: ${recordItem}`);
  return (
    <StyledItemContainer>
      <StyledTextContainer>
        <StyledName>{recordItem}</StyledName>
      </StyledTextContainer>
    </StyledItemContainer>
  );
}

export default RecordItem;

const StyledItemContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-content: space-a;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  padding-horizontal: 10px;
  border: 1px solid #c4c4c4;
  flex-direction: row;
  margin: 12px;
  background-color: #ffffff;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 44px;
  letter-spacing: 0.15px;
`;
