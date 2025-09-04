//@ts-nocheck
import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MyComponent from "./TimeLine";
import AgentConsole from "./AgentConsole";
import FromControl from "./FromControl";
import ShiftDetails from "./components/ShiftDetails";
import TransferConversation from "./components/TransferConversation";
import ConversationStats_figma from "./components/ConversationStats_figma";
import { Collapse } from "@mui/material";
import Login from "./components/Login";
import GoogleWidget from "./components/GoogleWidget";
import Editor from "./components/TextEditor.jsx";
import LoginApp from "./components/AutpOtpFill";
import DatePicker from "./components/CustomeDatePicker/CustomeDatePicker";
import WheelDatePicker from "./components/CustomeDatePicker/CustomeDatePicker";
import { WheelPicker } from "./components/Datepicker2/DatePicker";
import dayjs from "dayjs";
import DateSelector from "./components/Datepicker2/WraperForDatePicker";
import CursorFollowTextField from "./components/CursorFollowTextField";
import NavigationTreeReact from "./components/graphView";
import GraphEditorApp from "./components/graphView";
import ReactFlow from "react-flow-renderer";
const hourItems = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: index + 1,
}));

const minuteItems = Array.from({ length: 4 }, (_, index) => ({
  value: `${(index * 15).toString().padStart(2, "0")}`,
  label: `${(index * 15).toString().padStart(2, "0")}`,
}));

const ampmItems = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

const currentDaysInMonth = dayjs().daysInMonth();
const dateItems = Array.from({ length: currentDaysInMonth * 2 }, (_, i) => {
  const date = dayjs().add(-currentDaysInMonth, "days").add(i, "days");
  return {
    value: date.startOf("day").format("YYYY-MM-DD"),
    label: currentDaysInMonth === i ? "Today" : date.format("ddd DD MMM"),
  };
});

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

function App() {
  const myRef = useRef(null);
  const [date, setDate] = useState(dateItems[currentDaysInMonth].value);
  const [hour, setHour] = useState(hourItems[5].value);
  const [minute, setMinute] = useState(minuteItems[2].value);
  const [ampm, setAmpm] = useState(ampmItems[0].value);

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

  const pages = [
    {
      name: "p1",
      widgets: [
        { widgetName: "p1w1", toPage: "p1" },
        { widgetName: "p1w2", toPage: "p3" },
      ],
    },
    {
      name: "p2",
      widgets: [
        { widgetName: "p2w1", toPage: "p4" },
        { widgetName: "p2w2", toPage: "" },
      ],
    },
    {
      name: "p3",
      widgets: [
        { widgetName: "p3w1", toPage: "" },
        { widgetName: "p3w2", toPage: "" },
      ],
    },
    {
      name: "p4",
      widgets: [],
    },
  ];

  const { nodes, edges } = generateGraphData(pages);
  // <PageGraph pages={pages} />;

  return (
    <div style={{ height: 600 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}

export default App;

function generateGraphData(pages) {
  const nodes = [];
  const edges = [];

  pages.forEach((page, index) => {
    // Create a node for each page
    nodes.push({
      id: page.name,
      position: { x: (index % 3) * 300, y: Math.floor(index / 3) * 200 },
      data: {
        label: (
          <div>
            <h1>{page.name}</h1>
            {page.widgets?.map((w, i) => (
              <p key={i}>
                {w.widgetName} → {w.toPage || "[not set]"}
              </p>
            ))}
          </div>
        ),
      },
    });

    // Create edges for each widget with a valid toPage
    page.widgets?.forEach((widget, i) => {
      if (widget.toPage) {
        edges.push({
          id: `${page.name}-${widget.widgetName}-to-${widget.toPage}`,
          source: page.name,
          target: widget.toPage,
          label: widget.widgetName,
        });
      }
    });
  });

  return { nodes, edges };
}

{
  /* <Login />
     
      <MyComponent ref={myRef} />
      <AgentConsole />
      <FromControl />
      <ShiftDetails />
      <TransferConversation />
      <ConversationStats_figma />
      <WheelDatePicker />
      <span style={{ textAlign: "center", width: "100%" }}>
        {date} {hour}:{minute} {ampm}
      </span>
      <DateSelector/>
      <div className="w-[300px] h-[300px] bg-[red]">
        <Collapse></Collapse>
      </div>
      <Editor />
       <LoginApp /> 
    </div> */
}
