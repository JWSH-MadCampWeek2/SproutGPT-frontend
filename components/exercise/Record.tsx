import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Slider, Button, Icon } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localPort } from "../../utils/constants";
import { getCurrentDate } from "../grass/CalendarComp";
import BackButton from "../BackButton";
import { GREEN_DEEP, GREEN_MAIN, ORANGE_MAIN } from "../../utils/colors";

export const formatValue = (val: number) => {
  const hours = Math.floor(val / 60);
  const minutes = val % 60;
  return `${hours}시간 ${minutes}분`;
};

function Record({
  exerciseList,
  onSubmit,
}: {
  exerciseList: string[];
  onSubmit: () => void;
}) {
  const [value, setValue] = useState(10); // Set initial value to 1
  const [user_id, setUser_id] = useState("");
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("user_id");
      setUser_id(storedUserId || "");
    };
    fetchUserId();
  }, []);

  const today = getCurrentDate();
  // const today = "2024-01-11";

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

  // Function to format value in HH MM format

  return (
    <ImageBackground
      source={require("../../assets/sprout_background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <StyledContainer>
        <BackButton onPress={onSubmit} />
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={180}
          minimumValue={10} // Set minimum value to 10
          step={10} // Set step to 10
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={ORANGE_MAIN}
              />
            ),
          }}
        />
        <StyledTitle>{formatValue(value)}</StyledTitle>
        <StyledButton
          color={GREEN_MAIN}
          radius={"lg"}
          title="운동 기록 저장하기"
          onPress={onPress}
        />
      </StyledContainer>
    </ImageBackground>
  );
}

const StyledContainer = styled(View)`
  gap: 48px;
  margin: 48px;
`;

const StyledTitle = styled(Text)`
  font-family: Jalnan2;
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: 200px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  color: ${GREEN_MAIN};
`;

export default Record;
