import React, { useState } from "react";
import { View, Linking, Text, Modal } from "react-native";
import { CheckBox } from "react-native-elements";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import styled from "styled-components/native";
import ExerciseDetail from "./ExerciseDetail";

function ExerciseItem({
  exerciseItem,
  onExerciseChecked,
}: {
  exerciseItem: {
    name: string;
    description: string;
    link: string;
    target: string;
  };
  onExerciseChecked: (name: string, isChecked: boolean) => void;
}) {
  const [isChecked, setChecked] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  console.log(exerciseItem);

  const toggleCheckbox = () => {
    setChecked(!isChecked);
    onExerciseChecked(exerciseItem.name, !isChecked);
  };

  return (
    <StyledOuterContainer>
      <StyledItemContainer onPress={() => setIsDetail(true)}>
        <Modal visible={isDetail} presentationStyle="formSheet">
          <ExerciseDetail
            exerciseItem={exerciseItem}
            onDetailComplete={() => setIsDetail(false)}
          />
        </Modal>
        <View>
          <StyledTextContainer>
            <StyledName>{exerciseItem.name}</StyledName>
            <StyledDescription>{exerciseItem.description}</StyledDescription>
          </StyledTextContainer>
        </View>
      </StyledItemContainer>
      <CheckBox checked={isChecked} onPress={toggleCheckbox} />
    </StyledOuterContainer>
  );
}

export default ExerciseItem;

const StyledOuterContainer = styled(View)`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  margin: 8px;
  flex-direction: row;
`;

const StyledItemContainer = styled(TouchableOpacity)`
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
