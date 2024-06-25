import React, { useState, useEffect } from "react";

function LoginApp() {
  const [inputValue, setInputValue] = useState("");
  const [otpReceived, setOtpReceived] = useState(false);

  useEffect(() => {
    if ("OTPCredential" in window) {
      // Start the Web OTP API flow
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), 10 * 1000); // Abort after 10 seconds

      navigator.credentials
        .get({
          //@ts-ignore
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp: any) => {
          console.log(otp, "otp");
          if (otp && otp.code) {
            setInputValue(otp.code);
            handleLogin(otp.code);
          }
        })
        .catch((err) => {
          console.error("Error receiving OTP:", err);
        });

      return () => {
        clearTimeout(timer);
        ac.abort();
      };
    } else {
      console.warn("Web OTP API is not supported on this browser");
    }
  }, []);

  const handleLogin = (otp: any) => {
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
          console.error("OTP verification failed");
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
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
            placeholder="Waiting for OTP..."
            // disabled
          />
        </div>
      )}
    </div>
  );
}

export default LoginApp;
