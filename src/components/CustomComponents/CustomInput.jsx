import React from "react";

const CustomInput = (props) => {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 rounded-md border border-gray-200 outline-none focus:border-gray-400 ${props?.className}`}
    />
  );
};

export default CustomInput;
