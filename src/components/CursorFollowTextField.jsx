import React, { useState, useEffect } from "react";

const CursorFollowTextField = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="I'm following you!"
        style={{
          position: "absolute",
          top: position.y + 10, // Offset by 10px to avoid overlap with cursor
          left: position.x + 10,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CursorFollowTextField;
