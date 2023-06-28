/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronLeft, Clear, ClearAll, DeleteOutline, Remove, Save } from "@mui/icons-material";
import { IconButton, SwipeableDrawer, TextField } from "@mui/material";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Button, ButtonGradients } from "./AddDetails";
import ChordEditor from "@components/Pages/ChordEditor";
import TextArea from "@components/CustomComponents/TextArea";
import { useParams } from "react-router-dom";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";
import TopBar from "./TopBar";

const ChordsContext = createContext();

const AddChords = ({ song, open, onClick, updateChordsQuery }) => {
  const params = useParams();

  const { isLoading, isSuccess, isError, mutate } = updateChordsQuery;

  const [addChords, setAddChords] = useState({ part: "", chords: "" });
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

  const handleUpdateChordsData = () => {
    const songChords = song?.chords;
    // console.log({ has: songChords.hasOwnProperty("verse_2") });
    const lyrics = {
      verse: {
        enabled: songChords.hasOwnProperty("verse") && songChords?.verse,
        value: songChords?.verse,
      },
      verse_2: {
        enabled: songChords.hasOwnProperty("verse_2") && songChords?.verse_2,
        value: songChords?.verse_2 || "",
      },
      verse_3: {
        enabled: songChords.hasOwnProperty("verse_3") && songChords?.verse_3,
        value: songChords?.verse_3 || "",
      },
      pre_chorus: {
        enabled: songChords.hasOwnProperty("pre_chorus") && songChords?.pre_chorus,
        value: songChords?.pre_chorus || "",
      },
      chorus: {
        enabled: songChords.hasOwnProperty("chorus") && songChords?.chorus,
        value: songChords?.chorus || "",
      },
      bridge: {
        enabled: songChords.hasOwnProperty("bridge") && songChords?.bridge,
        value: songChords?.bridge || "",
      },
    };
    setParts({ ...lyrics });
  };

  const handleSave = () => {
    const chords = {
      verse: parts.verse.value,
      verse_2: parts.verse_2.value,
      verse_3: parts.verse_3.value,
      pre_chorus: parts.pre_chorus.value,
      chorus: parts.chorus.value,
      bridge: parts.bridge.value,
    };

    mutate({
      id: params.id,
      chords,
    });
  };

  useEffect(() => {
    if (song?.chords) {
      handleUpdateChordsData();
    }
  }, [song?.chords, open]);

  return useMemo(() => {
    const noChords =
      !song?.chords?.verse &&
      !song?.chords?.pre_chorus &&
      !song?.chords?.chorus &&
      !song?.chords?.bridge;

    return (
      <SwipeableDrawer onClose={() => {}} open={open} anchor="right" className="z-[1004] w-[100%]">
        <LoadingScreen status={isLoading} text="Saving Chords" />
        <ChordsContext.Provider value={{ setParts, parts, song, addChords, setAddChords }}>
          {/* <ChordEditorWrapper
            open={addChords.part}
            song={song}
            handleOnClose={() => setAddChords({ part: "", chords: "" })}
          /> */}

          <section className="w-[100vw]">
            <TopBar
              label="Chords"
              isUpdate={!noChords}
              song={song}
              onClick={onClick}
              handleSave={handleSave}
              gradient={{ ...ButtonGradients.Chords }}
            />

            <div id="lyrics-parts" className="p-4 flex flex-col gap-4">
              <LyricsPart label="Verse" />
              <LyricsPart label="Verse 2" />
              <LyricsPart label="Verse 3" />
              <LyricsPart label="Pre-chorus" />
              <LyricsPart label="Chorus" />
              <LyricsPart label="Bridge" />
            </div>
          </section>
        </ChordsContext.Provider>
      </SwipeableDrawer>
    );
  }, [addChords, onClick, open, parts, song]);
};

const LyricsPart = ({ ...props }) => {
  const { parts, setParts, song, setAddChords } = useContext(ChordsContext);
  const label = props?.label;
  const loweredLabel = label?.toLowerCase().split(" ").join("-").split("-").join("_");

  return useMemo(() => {
    const gradient = {
      from: "from-white-",
      to: "to-white",
    };
    return parts[loweredLabel].enabled && parts[loweredLabel] ? (
      <div className="flex flex-col items-end justify-center bg-slate-100 p-4 pb-0 rounded-md">
        <TextField
          variant="standard"
          fullWidth
          value={parts[loweredLabel].value}
          multiline
          className={`${label} [&>div>textarea]:text-sm [&>label]:text-sm`}
          onChange={(e) =>
            setParts((prev) => ({
              ...prev,
              [loweredLabel]: { ...prev[loweredLabel], value: e.target.value },
            }))
          }
          {...props}
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
            onClick={() => {
              setParts((prev) => ({
                ...prev,
                [loweredLabel]: { enabled: false, value: "" },
              }));
            }}
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
        onClick={() => {
          setParts((prev) => ({
            ...prev,
            [loweredLabel]: { ...prev[loweredLabel], enabled: true },
          }));

          setAddChords((prev) => ({ ...prev, part: loweredLabel }));
        }}
      />
    );
  }, [label, loweredLabel, parts, props, setParts, song?.chords]);
};

const ChordEditorWrapper = ({ open = false, song, handleOnClose = () => {} }) => {
  return (
    <SwipeableDrawer
      open={open}
      onClose={handleOnClose}
      anchor="right"
      className="z-[1004] w-[100vw]"
    >
      <ChordEditor />
      <button onClick={handleOnClose}>Close</button>
    </SwipeableDrawer>
  );
};

export default AddChords;
