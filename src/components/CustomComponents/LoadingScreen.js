import { CircularProgress, Dialog } from "@mui/material";
import React from "react";
import LoadingGif from "@assets/Loading.gif";

const LoadingScreen = ({ status, text }) => {
  return (
    <Dialog open={status}>
      <div className="flex flex-col items-center p-0 relative max-w-[150px]">
        {/* <CircularProgress /> */}
        <img src={LoadingGif} alt="" className="w-[100%]" />
        <span className="w-full text-center animate-pulse text-black text-xs mt-2 absolute bottom-[8px] left-[50%] translate-x-[-50%]">
          {text} Please Wait.
        </span>
      </div>
    </Dialog>
  );
};

export default LoadingScreen;
