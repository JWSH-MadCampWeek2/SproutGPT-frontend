import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../components/grass/CalendarComp";
import RankItem from "../../components/rank/RankItem";
import { localPort } from "../../utils/constants";
import styled from "styled-components/native";

export default function RankMain() {
  const [data, setData] = useState<
    {
      user_id: string;
      nickname: string;
      score: number;
      profile_image: string;
    }[]
  >([]);

  const fetchData = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to fetch data from
      const response = await fetch(`${localPort}/rank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          month: getCurrentMonth(),
          year: getCurrentYear(),
        }),
      });
      // Check if the response is successful (status code in the range of 200-299)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } else {
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledLayout>
      <StyledTitle>이번 달 랭킹</StyledTitle>
      <StyledFlatList
        data={data}
        renderItem={({ item }) => <RankItem rankItem={item} />}
        keyExtractor={(item) => item.user_id}
      />
    </StyledLayout>
  );
}
const StyledTitle = styled(Text)`
  color: var(--Light-Text-Primary, rgba(0, 0, 0, 0.87));
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 80px;
  margin: 16px;
  text-align: center;
`;

const StyledFlatList = styled(FlatList)`
  padding-bottom: 52px;
`;

const StyledLayout = styled(View)``;
