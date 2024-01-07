import React, { useRef, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import styled, { css } from "styled-components/native";

// TODO: add profile image
function RankItem({ rankItem }: { rankItem: { name: string; score: number } }) {
  return (
    <StyledItemContainer>
      <StyledTextContainer>
        <StyledName>{rankItem.name}</StyledName>
        <StyledDescription>{rankItem.score}</StyledDescription>
      </StyledTextContainer>
    </StyledItemContainer>
  );
}

export default RankItem;

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

const StyledDescription = styled(Text)`
  color: var(--Light-Text-Secondary, rgba(0, 0, 0, 0.6));
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.17px;
`;
