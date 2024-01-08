import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localPort } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

function InfoLoad() {
  const navigation = useNavigation();
  const [recommendations, setRecommendations] =
    useState<{ name: string; description: string; link: string }[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Correct usage of AsyncStorage.getItem with await
        const userId = await AsyncStorage.getItem("user_id");

        if (userId) {
          const response = await fetch(`${localPort}/recommend`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          });

          const data = await response.json();
          console.log("Received recommend data:", data);

          if (data && data.recommended_exercises) {
            console.log(
              "Recommendations available:",
              data.recommended_exercises
            );

            navigation.navigate("BottomStack", {
              screen: "ExerciseMain",
              params: {
                recommend: data.recommended_exercises.map((recItem: any) => ({
                  name: recItem.name,
                  description: recItem.description,
                  link: recItem.link,
                })),
              },
            });
          } else {
            console.error("Recommendations not available");
          }
        } else {
          console.error("User ID not available");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return <StyledTitle>추천 중 ...</StyledTitle>;
}

const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 200px;
`;

export default InfoLoad;
