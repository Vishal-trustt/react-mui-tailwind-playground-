import React from "react";

function GoogleWidget() {
  return (
    <div>
      <iframe
        src="https://www.google.com"
        title={"Google Widget"}
        style={{ border: "none" }}
        className="w-[100%] h-[100vh]"
      ></iframe>
      {/* <iframe
        src="https://way2sms.com/"
        className="w-[100%] h-[100vh]"
      ></iframe> */}
    </div>
  );
}

export default GoogleWidget;
