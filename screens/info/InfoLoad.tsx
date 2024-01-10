import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localPort } from "../../utils/constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Recommending } from "../../components/Loading";

function InfoLoad() {
  console.log("InfoLoad screen");
  const navigation = useNavigation();
  const [recommendations, setRecommendations] =
    useState<
      { name: string; description: string; link: string; target: string }[]
    >();

  const fetchData = async () => {
    try {
      // Correct usage of AsyncStorage.getItem with await
      const userId = await AsyncStorage.getItem("user_id");
      console.log(`userId in InfoLoad: ${userId}`);

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

        if (data && data.recommended_exercises && data.comment) {
          console.log("Recommendations available:", data.recommended_exercises);

          navigation.navigate("BottomStack", {
            screen: "Exercise",
            params: {
              recommend: data.recommended_exercises.map((recItem: any) => ({
                name: recItem.name,
                description: recItem.description,
                link: recItem.link,
                target: recItem.target,
              })),
              comment: data.comment,
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

  // Use useFocusEffect to run fetchData when the screen comes into focus
  useFocusEffect(() => {
    fetchData();
    console.log("Request for Fetch");
  });

  return <Recommending />;
}

const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 200px;
`;

export default InfoLoad;
