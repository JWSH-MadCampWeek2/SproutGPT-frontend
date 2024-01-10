import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  getCurrentMonth,
  getCurrentYear,
} from "../../components/grass/CalendarComp";
import RankItem from "../../components/rank/RankItem";
import { localPort } from "../../utils/constants";

const DATA = [
  { id: "1", name: "안시현", score: 123 },
  { id: "2", name: "안시현", score: 123 },
  { id: "3", name: "안시현", score: 123 },
  { id: "4", name: "안시현", score: 123 },
  { id: "5", name: "안시현", score: 123 },
  { id: "6", name: "안시현", score: 123 },
  { id: "7", name: "안시현", score: 123 },
];

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
    <View style={Styles.container}>
      <Text style={Styles.HomeText}>Today's Rank</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <RankItem rankItem={item} />}
        keyExtractor={(item) => item.user_id}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HomeText: {
    fontSize: 30,
    textAlign: "center",
  },
});
