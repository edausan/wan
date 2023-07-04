import { TextField, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { AppCtx } from "@/App";

const SongPart = ({ part, data }) => {
  const theme = useTheme();
  const { mode } = useContext(AppCtx);
  return (
    <section
      className={`shadow-lg rounded-md ${mode ? "bg-white" : "bg-[#121212]/30"} overflow-hidden`}
    >
      <div className="px-2 py-1 bg-sky-500 text-white">
        <small className="">{part}</small>
      </div>
      <div className="p-4">
        <TextField
          id={part}
          value={data}
          fullWidth
          disabled
          variant="standard"
          multiline
          sx={{
            "& textarea.Mui-disabled": {
              "-webkit-text-fill-color": theme.palette.text.primary,
              // textTransform: "uppercase",
            },
            "& > .Mui-disabled:before": {
              borderBottomStyle: "none !important",
            },
          }}
        />
      </div>
    </section>
  );
};

export default SongPart;
