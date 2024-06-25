import { Button } from "@mui/material";
import React from "react";

function Login() {
  return (
    <div>
      <h1 style={{ fontSize: "32px" }}>Login</h1>
      <h3>User Name</h3>
      <input type="text"></input>
      <h3>Password</h3>
      <input type="password"></input>
      <Button>sumit</Button>
    </div>
  );
}

export default Login;
