import React, { useRef } from "react";
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

function App() {
  const myRef = useRef(null);

  return (
    <div className="App h-[150vh] p-5">
      {/* <Login /> */}
      {/* <GoogleWidget /> */}
      {/* <MyComponent ref={myRef} />
      <AgentConsole />
      <FromControl />
      <ShiftDetails />
      <TransferConversation />
      <ConversationStats_figma /> */}

      {/* <div className="w-[300px] h-[300px] bg-[red]">
        <Collapse></Collapse>
      </div> */}
      {/* <Editor /> */}
      <LoginApp />
    </div>
  );
}

export default App;
