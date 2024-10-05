"use client";
import React from "react";
import { Calendar } from "@nextui-org/react";
import type { DateValue } from "@react-types/calendar";
import { parseDate } from '@internationalized/date';
import { today, getLocalTimeZone } from "@internationalized/date";

const Home: React.FC = () => {
  const [value, setValue] = React.useState<DateValue>(parseDate("2024-03-07"));

  const handleDateChange = (newValue: DateValue) => {
    setValue(newValue);
    console.log("Selected date:", newValue.toString());
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-6">
        <Calendar
          aria-label="Date (Min Date Value)"
          value={value}
          onChange={handleDateChange}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    </div>
  );
};

export default Home;