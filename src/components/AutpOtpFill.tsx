//@ts-nocheck
import React, { useState, useEffect } from "react";

const LoginApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [otpReceived, setOtpReceived] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("hittong use effect");
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      const timeout = 30 * 1000; // 30 seconds timeout
      const timer = setTimeout(() => ac.abort(), timeout);
      console.log("under OTP cred if condition");
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          console.log("OTP received before if:", otp);
          if (otp && otp.code) {
            console.log("OTP received after if :", otp.code);

            setInputValue(otp.code);
            handleLogin(otp.code);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            setError("OTP retrieval timed out.");
          } else {
            setError("Error receiving OTP: " + err.message);
          }
        })
        .finally(() => {
          clearTimeout(timer);
        });

      return () => {
        clearTimeout(timer);
        ac.abort();
      };
    } else {
      setError("Web OTP API is not supported on this browser.");
    }
  }, []);
  console.log("app is running");

  const extractOtpFromMessage = (message: string): string | null => {
    // Regular expression to find 6-digit numbers in the message
    const otpMatch = message.match(/\b\d{6}\b/);
    return otpMatch ? otpMatch[0] : null;
  };

  const handleLogin = (otp: string) => {
    // Handle OTP verification and login logic here
    fetch("http://your-auth-server-endpoint/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOtpReceived(true);
          // Redirect or perform actions on successful login
        } else {
          setError("OTP verification failed.");
        }
      })
      .catch((error) => {
        setError("Error verifying OTP: " + error.message);
      });
  };

  return (
    <div className="login-app">
      {otpReceived ? (
        <div>Welcome! You are logged in.</div>
      ) : (
        <div className="otp-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter OTP"
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default LoginApp;
