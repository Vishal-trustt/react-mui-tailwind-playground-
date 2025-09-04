// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import "./DatePicker.css";

const years = [...Array(100).keys()].map((n) => n + 1920);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const days = [...Array(31).keys()].map((n) => n + 1);

function DatePicker() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const handleScroll = (setSelectedValue, ref, items) => {
    const list = ref.current;
    const scrollTop = list.scrollTop;
    const scrollHeight = list.scrollHeight;
    const clientHeight = list.clientHeight;
    const scrollFraction = scrollTop / (scrollHeight - clientHeight);

    const index = Math.floor(scrollFraction * (items.length - 5)) + 2;
    if (index >= 0 && index < items.length) {
      setSelectedValue(items[index]);
    }
  };

  useEffect(() => {
    const yearList = yearRef.current;
    const monthList = monthRef.current;
    const dayList = dayRef.current;

    const handleYearScroll = () =>
      handleScroll(setSelectedYear, yearRef, years);
    const handleMonthScroll = () =>
      handleScroll(
        setSelectedMonth,
        monthRef,
        months.map((m) => m.label)
      );
    const handleDayScroll = () => handleScroll(setSelectedDay, dayRef, days);

    yearList.addEventListener("scroll", handleYearScroll);
    monthList.addEventListener("scroll", handleMonthScroll);
    dayList.addEventListener("scroll", handleDayScroll);

    return () => {
      yearList.removeEventListener("scroll", handleYearScroll);
      monthList.removeEventListener("scroll", handleMonthScroll);
      dayList.removeEventListener("scroll", handleDayScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="scrollable-box" ref={yearRef}>
        {years.map((year) => (
          <div key={year} className="number">
            {year}
          </div>
        ))}
      </div>
      <div className="scrollable-box" ref={monthRef}>
        {months.map((month) => (
          <div key={month.value} className="number">
            {month.label}
          </div>
        ))}
      </div>
      <div className="scrollable-box" ref={dayRef}>
        {days.map((day) => (
          <div key={day} className="number">
            {day}
          </div>
        ))}
      </div>
      <div className="selected-number">
        Selected Date: {selectedYear} - {selectedMonth} - {selectedDay}
      </div>
    </div>
  );
}

export default DatePicker;
