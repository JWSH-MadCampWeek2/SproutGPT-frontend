import React from "react";
import { Calendar } from "react-native-calendars";

const EXERCISE_LOW = "#EEEE90";

const markedDates = {
  "2024-01-01": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-03": { selected: true, selectedColor: "#19A519" },
  "2024-01-06": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-08": { selected: true, selectedColor: "#19A519" },
  "2024-01-10": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-11": { selected: true, selectedColor: "#BFEE90" },
  "2024-01-12": { selected: true, selectedColor: "#BFEE90" },
  "2024-01-13": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-14": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-15": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-16": { selected: true, selectedColor: "#EEEE90" },
  "2024-01-17": { selected: true, selectedColor: "#BFEE90" },
  "2024-01-18": { selected: true, selectedColor: "#59E659" },
  "2024-01-19": { selected: true, selectedColor: "#BFEE90" },
  "2024-01-20": { selected: true, selectedColor: "#19A519" },
  "2024-01-22": { selected: true, selectedColor: "#59E659" },
  "2024-01-23": { selected: true, selectedColor: "#19A519" },
  "2024-01-24": { selected: true, selectedColor: "#19A519" },
  "2024-01-25": { selected: true, selectedColor: "#BFEE90" },
  "2024-01-27": { selected: true, selectedColor: "#19A519" },
  "2024-01-29": { selected: true, selectedColor: "#59E659" },
};

export function getCurrentDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  // Ensure two digits for day, month, and year
  var formattedDate =
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (date < 10 ? "0" + date : date);
  return formattedDate;
}

export function getCurrentYear() {
  const year = new Date().getFullYear();
  return String(year);
}
export function getCurrentMonth() {
  const month = new Date().getMonth() + 1;

  // Ensure two digits for the month
  const formattedMonth = month < 10 ? "0" + String(month) : String(month);

  return formattedMonth;
}

export function getCurrentDay() {
  const day = new Date().getDate();

  // Ensure two digits for the day
  var formattedDay = day < 10 ? "0" + String(day) : String(day);

  return formattedDay;
}

export function dayFormat(day: number) {
  var formattedDay = day < 10 ? "0" + String(day) : String(day);
  return formattedDay;
}

function CalendarComp({
  onDayPress,
}: {
  onDayPress: (day: { year: number; month: number; day: number }) => void;
}) {
  return (
    <Calendar
      markedDates={markedDates}
      theme={{
        selectedDayBackgroundColor: "transparent",
      }}
      onDayPress={onDayPress}
    />
  );
}

export default CalendarComp;
