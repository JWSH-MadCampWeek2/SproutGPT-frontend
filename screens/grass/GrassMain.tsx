import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import CalendarComp, {
  getCurrentMonth,
  getCurrentYear,
} from "../../components/grass/CalendarComp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localPort } from "../../utils/constants";
import { DateData } from "react-native-calendars";

export default function GrassMain() {
  const [user_id, setUser_id] = useState("");
  const [cur, setCur] = useState({
    year: getCurrentYear(),
    month: getCurrentMonth(),
  });
  const [grassData, setGrassData] = useState<
    { day: string; duration: number; exercises: string[] }[]
  >([]);

  const onMonthChange = (date: DateData) => {
    console.log(date);
    setCur({
      year: String(date.year).padStart(2, "0"),
      month: String(date.month).padStart(2, "0"),
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch data from the server whenever the screen is focused
      console.log(
        `Screen focused @ cur year: ${cur.year} cur month: ${cur.month} user_id: ${user_id}`
      );
      sendToServer();
    }, [cur, user_id])
  );

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
      console.log("Grass received:", data);
      setGrassData(data.exercise_sessions);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  return (
    <>
      <CalendarComp onMonthChange={onMonthChange} grassData={grassData} />
    </>
  );
}
