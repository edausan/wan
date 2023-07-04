import { ChevronLeft, Save, Update } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const TopBar = ({
  onClick = () => {},
  isUpdate = false,
  song = {},
  handleSave = () => {},
  label = "Title",
  gradient = {
    from: "",
    to: "",
  },
}) => {
  return (
    <div
      id={`${label}-top-bar`}
      className={`p-4 bg-gradient-to-r ${gradient?.from} ${gradient?.to} text-white shadow-lg sticky top-0 left-0 w-full z-10`}
    >
      <h3 className="text-sm flex flex-row gap-2 items-center justify-start">
        <IconButton onClick={onClick}>
          <ChevronLeft className="text-white" />
        </IconButton>{" "}
        <span className="flex flex-col flex-1">
          <small>
            {isUpdate ? "Update" : "Add"} {label}
          </small>{" "}
          <strong>{song?.title}</strong>
        </span>
        <div className="h-[100%] bg-white/10 rounded-full">
          <IconButton onClick={handleSave}>
            {isUpdate ? <Update className="text-white" /> : <Save className="text-white" />}
          </IconButton>
        </div>
      </h3>
    </div>
  );
};

export default TopBar;
