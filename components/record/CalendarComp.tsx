import React from "react";
import { Calendar } from "react-native-calendars";

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

function CalendarComp() {
  return (
    <Calendar
      markedDates={markedDates}
      theme={{
        selectedDayBackgroundColor: "transparent",
      }}
      onDayPress={(day) => {
        console.log(day);
      }}
    />
  );
}

export default CalendarComp;
