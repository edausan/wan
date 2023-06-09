import { ChevronLeft, Clear, ClearAll, DeleteOutline, Remove } from "@mui/icons-material";
import { IconButton, SwipeableDrawer, TextField } from "@mui/material";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "./AddDetails";

const LyricsContext = createContext();

const AddChords = ({ song, open, onClick }) => {
  const [parts, setParts] = useState({
    verse: {
      enabled: false,
      value: "",
    },
    verse_2: {
      enabled: false,
      value: "",
    },
    verse_3: {
      enabled: false,
      value: "",
    },
    pre_chorus: {
      enabled: false,
      value: "",
    },
    chorus: {
      enabled: false,
      value: "",
    },
    bridge: {
      enabled: false,
      value: "",
    },
  });

  console.log(parts);

  return useMemo(() => {
    const noChords =
      !song?.chords?.verse &&
      !song?.chords?.pre_chorus &&
      !song?.chords?.chorus &&
      !song?.chords?.bridge;

    return (
      <SwipeableDrawer onClose={() => {}} open={open} anchor="right" className="z-[1004] w-[100%]">
        <LyricsContext.Provider value={{ setParts, parts, song }}>
          <section className="w-[100vw]">
            <div
              id="top-bar"
              className="p-4 bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg sticky top-0 left-0 w-full z-10"
            >
              <h3 className="text-sm flex flex-row gap-2 items-center justify-start">
                <IconButton onClick={onClick}>
                  <ChevronLeft className="text-white" />
                </IconButton>{" "}
                <span>
                  {noChords ? "Add" : "Update"} Chords | <strong>{song?.title}</strong>
                </span>
              </h3>
            </div>

            <div id="lyrics-parts" className="p-4 mt-4 flex flex-col gap-4">
              <LyricsPart label="Verse" />
              <LyricsPart label="Verse 2" />
              <LyricsPart label="Verse 3" />
              <LyricsPart label="Pre-chorus" />
              <LyricsPart label="Chorus" />
              <LyricsPart label="Bridge" />
            </div>
          </section>
        </LyricsContext.Provider>
      </SwipeableDrawer>
    );
  }, [onClick, open, parts, song]);
};

const LyricsPart = ({ ...props }) => {
  const { parts, setParts, song } = useContext(LyricsContext);
  const label = props?.label;
  const loweredLabel = label?.toLowerCase().split(" ").join("-").split("-").join("_");

  return useMemo(() => {
    const gradient = {
      from: "from-white-",
      to: "to-white",
    };
    return parts[loweredLabel].enabled || (song?.chords && song?.chords[loweredLabel]) ? (
      <div className="flex flex-col items-end justify-center bg-slate-100 p-4 pb-0 rounded-md">
        <TextField
          variant="standard"
          fullWidth
          value={parts[loweredLabel].value || song?.chords[loweredLabel]}
          multiline
          className={`${label} [&>div>textarea]:text-sm [&>label]:text-sm`}
          {...props}
          onChange={(e) =>
            setParts((prev) => ({
              ...prev,
              [loweredLabel]: { ...prev[loweredLabel], value: e.target.value },
            }))
          }
        />
        <div className="flex flex-row items-center mt-2">
          <IconButton
            className="text-sm text-yellow-500 mb-2"
            onClick={() =>
              setParts((prev) => ({
                ...prev,
                [loweredLabel]: { ...prev[loweredLabel], value: "" },
              }))
            }
          >
            <Clear />
          </IconButton>
          <IconButton
            className="text-xs text-red-400 mb-2"
            onClick={() =>
              setParts((prev) => ({
                ...prev,
                [loweredLabel]: { enabled: false, value: "" },
              }))
            }
          >
            <DeleteOutline />
          </IconButton>
        </div>
      </div>
    ) : (
      <Button
        label={`${label}`}
        gradient={gradient}
        className="text-gray-500 border border-gray-300 !shadow-none"
        onClick={() =>
          setParts((prev) => ({
            ...prev,
            [loweredLabel]: { ...prev[loweredLabel], enabled: true },
          }))
        }
      />
    );
  }, [label, loweredLabel, parts, props, setParts, song?.chords]);
};

export default AddChords;
