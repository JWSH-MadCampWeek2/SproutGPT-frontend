import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import CalendarComp, {
  dayFormat,
  getCurrentDate,
  getCurrentMonth,
  getCurrentYear,
} from "../../components/grass/CalendarComp";
import RecordItem from "../../components/grass/RecordItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localPort } from "../../utils/constants";

const DATA = [
  { id: "1", name: "스쿼트", description: "근육 1과 근육 2의 발달에 좋습니다" },
  { id: "2", name: "데드리프트", description: "코어 근육의 발달에 좋습니다." },
  { id: "3", name: "트레드밀 러닝", description: "체력 강화에 좋습니다." },
  { id: "4", name: "푸시업", description: "코어 근육의 발달에 좋습니다." },
];

export default function GrassMain() {
  const [user_id, setUser_id] = useState("");
  const [cur, setCur] = useState({
    year: getCurrentYear(),
    month: getCurrentMonth(),
  });

  const onDayPress = (date: { year: number; month: number; day: number }) => {
    console.log(date);
    setCur({ year: dayFormat(date.year), month: dayFormat(date.month) });
  };

  useEffect(() => {
    // Fetch data from the server whenever 'cur' changes
    sendToServer();
  }, [cur]);

  useEffect(() => {
    // Fetch user_id from AsyncStorage
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("user_id");
      setUser_id(storedUserId || "");
    };
    fetchUserId();
  }, []);

  const sendToServer = async () => {
    try {
      console.log(`cur month: ${cur.month}`);
      const response = await fetch(`${localPort}/grass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          year: cur.year,
          month: cur.month,
        }),
      });
      const data = await response.json();
      // Handle the response from the server
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  return (
    <>
      <CalendarComp onDayPress={onDayPress} />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <RecordItem recordItem={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
