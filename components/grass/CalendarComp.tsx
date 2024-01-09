import React, { useState } from "react";
import { FlatList } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import RecordItem from "./RecordItem";
import { format } from "date-fns"; // Import date-fns for date formatting

interface ExerciseData {
  day: string;
  duration: number;
  exercises: string[];
}
interface FormatForCal {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
  };
}
interface FormatForRecord {
  [key: string]: {
    exercises: string[];
  };
}

const GRASS_MIN = "#EEEE90";
const GRASS_LOW = "#BFEE90";
const GRASS_HIGH = "#59E659";
const GRASS_MAX = "#19A519";

const durationToLetter = (duration: number): string => {
  if (duration <= 30) {
    return GRASS_MIN;
  } else if (duration <= 60) {
    return GRASS_LOW;
  } else if (duration <= 120) {
    return GRASS_HIGH;
  } else {
    return GRASS_MAX;
  }
};
const transformForCal = (
  data: ExerciseData[],
  year: number,
  month: number
): FormatForCal => {
  let res: FormatForCal = {};

  if (data) {
    data.forEach((item) => {
      const fYear = String(year);
      const fMonth = String(month).padStart(2, "0");
      const fDate = item.day.padStart(2, "0");
      const formattedDate = `${fYear}-${fMonth}-${fDate}`;

      res[formattedDate] = {
        selected: true,
        selectedColor: durationToLetter(item.duration),
      };
    });
  }

  return res;
};

const transFormForRecord = (
  data: ExerciseData[],
  year: number,
  month: number
): FormatForRecord => {
  let res: FormatForRecord = {};

  if (data) {
    data.forEach((item) => {
      const fYear = String(year);
      const fMonth = String(month).padStart(2, "0");
      const fDate = item.day.padStart(2, "0");
      const formattedDate = `${fYear}-${fMonth}-${fDate}`;
      res[formattedDate] = {
        exercises: item.exercises,
      };
    });
  }

  return res;
};

export function getCurrentDate() {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  const fYear = String(year);
  const fMonth = String(month).padStart(2, "0");
  const fDate = String(date).padStart(2, "0");
  const formattedDate = `${fYear}-${fMonth}-${fDate}`;
  return formattedDate;
}

export function getCurrentYear() {
  const year = new Date().getFullYear();
  return String(year);
}

export function getCurrentMonth() {
  const month = new Date().getMonth() + 1;
  return String(month).padStart(2, "0");
}

export function getCurrentDay() {
  const day = new Date().getDate();
  return String(day).padStart(2, "0");
}

function CalendarComp({
  onMonthChange,
  grassData,
}: {
  onMonthChange: (day: DateData) => void;
  grassData: { day: string; duration: number; exercises: string[] }[];
}) {
  const [curDate, setCurDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>({
    year: getCurrentYear(),
    month: getCurrentMonth(),
    day: getCurrentDay(),
  });

  const confinedDataForCal = transformForCal(
    grassData,
    Number(curDate.year),
    Number(curDate.month)
  );

  console.log(confinedDataForCal);

  const confinedDataForRecord = transFormForRecord(
    grassData,
    Number(curDate.year),
    Number(curDate.month)
  );

  const onChange = (selectedDate: DateData) => {
    const currentDate = new Date(selectedDate.dateString) || new Date();
    setCurDate({
      year: String(currentDate.getFullYear()),
      month: String(currentDate.getMonth() + 1),
      day: String(currentDate.getDate()),
    });
  };

  return (
    <>
      <Calendar
        markedDates={confinedDataForCal}
        theme={{
          selectedDayBackgroundColor: "transparent",
        }}
        onDayPress={onChange}
        onMonthChange={onMonthChange}
      />
      <FlatList
        data={
          confinedDataForRecord[
            `${String(curDate.year)}-${String(curDate.month).padStart(
              2,
              "0"
            )}-${String(curDate.day).padStart(2, "0")}`
          ]?.exercises || [] // Explicitly specify the type as string[]
        }
        renderItem={({ item }) => <RecordItem recordItem={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

export default CalendarComp;
