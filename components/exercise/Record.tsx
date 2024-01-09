import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { Slider, Icon } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import { getCurrentDate } from "../grass/CalendarComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localPort } from "../../utils/constants";

function Record({
  exerciseList,
  onSubmit,
}: {
  exerciseList: string[];
  onSubmit: () => void;
}) {
  const [value, setValue] = useState(1); // Set initial value to 1
  const [user_id, setUser_id] = useState("");
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("user_id");
      setUser_id(storedUserId || "");
    };
    fetchUserId();
  }, []);

  const today = getCurrentDate();

  const onPress = async () => {
    try {
      const recordResponse = await fetch(`${localPort}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          duration: value,
          date: today,
          exercises: JSON.stringify(exerciseList),
        }),
      });

      const recordData = await recordResponse.json();
      console.log("Record response:", recordData);

      if (recordData) {
        const scoreResponse = await fetch(`${localPort}/score`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user_id,
            date: today.slice(0, 7), // 'YYYY-MM' format
          }),
        });

        const scoreData = await scoreResponse.json();
        console.log("Score response:", scoreData);
      }

      onSubmit();
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const interpolate = (start: number, end: number) => {
    let k = (value - 1) / 179; // Adjust the range to 1-180
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  // Function to format value in HH MM format
  const formatValue = (val: number) => {
    const hours = Math.floor(val / 60);
    const minutes = val % 60;
    return `${hours}시간 ${minutes}분`;
  };

  return (
    <StyledContainer>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={180} // Set maximum value to 180
        minimumValue={1} // Set minimum value to 1
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: "transparent" }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
        thumbProps={{
          children: (
            <MaterialCommunityIcons name="dumbbell" size={20} color={color()} />
          ),
        }}
      />
      <Text>{formatValue(value)}</Text>
      <StyledBtn title="운동 기록 저장하기" onPress={onPress} />
    </StyledContainer>
  );
}

const StyledBtn = styled(Button)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 8px;
  margin-left: 12px;
  margin-right: 12px;
  border-color: blue;
  border-radius: 100%;
`;

const StyledContainer = styled(View)`
  margin: 48px;
  margin-top: 80px;
  gap: 48px;
`;

export default Record;
