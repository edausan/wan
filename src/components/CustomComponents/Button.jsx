import React from "react";

const WButton = ({ text, callback, color, className }) => {
  return (
    <button
      onClick={callback}
      className={`px-3 py-1 rounded-full text-sm text-white ${
        color ? `bg-${color}-400 hover:!bg-${color}-500` : "bg-slate-400 hover:bg-slate-500"
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default WButton;
