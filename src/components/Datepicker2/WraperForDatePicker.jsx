import React, { useState } from "react";
import { WheelPicker } from "./DatePicker";
import "./styles.css"; // Assuming this file contains your CSS

const yearItems = Array.from({ length: 101 }, (_, i) => ({
  value: 1920 + i,
  label: `${1920 + i}`,
}));

const monthItems = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

const dayItems = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

const DateSelector = () => {
  const [selectedYear, setSelectedYear] = useState(yearItems[0].value);
  const [selectedMonth, setSelectedMonth] = useState(monthItems[0].value);
  const [selectedDay, setSelectedDay] = useState(dayItems[0].value);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <div>
      <h2>Select Date</h2>
      <div className="date-picker-container">
        <WheelPicker
          yearItems={yearItems}
          yearValue={selectedYear}
          onYearChange={handleYearChange}
          monthItems={monthItems}
          monthValue={selectedMonth}
          onMonthChange={handleMonthChange}
          dayItems={dayItems}
          dayValue={selectedDay}
          onDayChange={handleDayChange}
        />
      </div>
      <p>
        Selected Date: {selectedYear}-{selectedMonth}-{selectedDay}
      </p>
    </div>
  );
};

export default DateSelector;
