/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronLeft, Clear, DeleteOutline, Save } from "@mui/icons-material";
import { CircularProgress, IconButton, SwipeableDrawer, TextField } from "@mui/material";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Button, ButtonGradients } from "./AddDetails";
import { useParams } from "react-router-dom";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";
import TopBar from "./TopBar";

const LyricsContext = createContext();

const AddLyrics = ({ song, open, onClick, updateLyricsQuery }) => {
  const params = useParams();
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

  const { isLoading, isSuccess, isError, mutate } = updateLyricsQuery;

  const handleUpdateLyricsData = () => {
    const songLyrics = song?.lyrics;
    const lyrics = {
      verse: {
        enabled: songLyrics?.verse !== "",
        value: songLyrics?.verse,
      },
      verse_2: {
        enabled: songLyrics?.verse_2 !== "",
        value: songLyrics?.verse_2 || "",
      },
      verse_3: {
        enabled: songLyrics?.verse_3 !== "",
        value: songLyrics?.verse_3 || "",
      },
      pre_chorus: {
        enabled: songLyrics?.pre_chorus !== "",
        value: songLyrics?.pre_chorus || "",
      },
      chorus: {
        enabled: songLyrics?.chorus !== "",
        value: songLyrics?.chorus || "",
      },
      bridge: {
        enabled: songLyrics?.bridge !== "",
        value: songLyrics?.bridge || "",
      },
    };
    setParts({ ...lyrics });
  };

  // useEffect(() => {
  //   if (isLoading) {
  //     setIsLoadingState(true);
  //     setStatus("Saving...");
  //   } else if (!isLoading && isSuccess) {
  //     console.log({ isSuccess });
  //     setStatus("Saved");
  //     setTimeout(() => {
  //       setIsLoadingState(false);
  //     }, 5000);
  //   } else if (!isLoading && isError) {
  //     console.log({ isError });
  //     setStatus("Error");
  //     setTimeout(() => {
  //       setIsLoadingState(false);
  //     }, 5000);
  //   }
  // }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    if (song?.lyrics) {
      handleUpdateLyricsData();
    }
  }, [song?.lyrics, open]);

  const handleSave = () => {
    const lyrics = {
      verse: parts.verse.value,
      verse_2: parts.verse_2.value,
      verse_3: parts.verse_3.value,
      pre_chorus: parts.pre_chorus.value,
      chorus: parts.chorus.value,
      bridge: parts.bridge.value,
    };
    mutate({
      id: params.id,
      lyrics,
    });
  };

  return useMemo(() => {
    const noLyrics =
      !song?.lyrics?.verse &&
      !song?.lyrics?.pre_chorus &&
      !song?.lyrics?.chorus &&
      !song?.lyrics?.bridge;

    return (
      <SwipeableDrawer onClose={() => {}} open={open} anchor="right" className="z-[1004] w-[100%]">
        <LoadingScreen status={isLoading} text="Saving Lyrics" />
        <LyricsContext.Provider value={{ setParts, parts, song }}>
          <section className="w-[100vw]">
            <TopBar
              label="Lyrics"
              isUpdate={!noLyrics}
              handleSave={handleSave}
              song={song}
              onClick={onClick}
              gradient={{ ...ButtonGradients.Lyrics }}
            />

            <div id="lyrics-parts" className="p-4 mt-2 flex flex-col gap-4">
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
  }, [onClick, open, parts, song, isLoading]);
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
  }, [label, loweredLabel, parts, props, setParts, song?.lyrics, props?.loading]);
};

export default AddLyrics;
