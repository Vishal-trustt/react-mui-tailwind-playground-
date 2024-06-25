//@ts-nocheck
import React, { useState, useEffect } from "react";

const LoginApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [otpReceived, setOtpReceived] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("OTPCredential" in window) {
      // Start the Web OTP API flow
      const ac = new AbortController();
      const timeout = 30 * 1000; // Set timeout to 30 seconds
      const timer = setTimeout(() => ac.abort(), timeout);

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp && otp.code) {
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
    console.log("LoginApp -> navigator.credentials", navigator.credentials);
  }, []);
  console.log("running ");
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
