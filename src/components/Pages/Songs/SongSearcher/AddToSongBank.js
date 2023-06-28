import { Divider, SwipeableDrawer, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Media } from "../SongPreview/SongPlayer";
import { Button } from "../SongPreview/AddDetails";
import TextArea from "../../../CustomComponents/TextArea";
import { Save, SaveAlt, SaveAltOutlined } from "@mui/icons-material";

const AddToSongBank = ({ song, open, onClose }) => {
  const handleClickPart = ({ part, part_idx }) => {
    console.log({ part, part_idx });
  };

  return (
    <SwipeableDrawer open={open} onClose={onClose} anchor="right">
      <section className="w-[90vw] h-[100vh] bg-white">
        {song?.youtubeUrl && (
          <Media
            media={`https://www.youtube.com/embed/${song?.youtubeUrl}`}
            phoneHeight="phone:h-[200px]"
          />
        )}
        <div className="sticky top-0 z-10 w-full bg-white shadow-xl">
          <div className="flex flex-row phone:flex-col gap-4 items-center justify-start bg-white text-black shadow-xl p-4">
            <TextField variant="standard" label="Song Title" defaultValue={song?.title} fullWidth />
            <Button
              label="Save to Bank"
              className="phone:w-full"
              icon={<SaveAlt className="text-[17px]" />}
            />
          </div>
        </div>

        <div className="py-4 px-4 pt-0 flex-1 w-full">
          <div className="flex flex-row gap-4 mt-2">
            <TextField variant="standard" label="Artist" fullWidth />
            <TextField variant="standard" label="Album" fullWidth />
          </div>

          <div className="mt-4">
            {song?.songVerseDTOS.map((verse, idx) => (
              <div className="mb-4 bg-gray-100 p-4 rounded-md">
                <div className="text-xs mb-2">Select Part:</div>
                <PartSelector part={verse} idx={idx} handleClick={handleClickPart} />

                <Divider className="my-2" />

                {/* <span>{verse?.chorus ? "Chorus" : "Verse"}</span> */}
                <TextArea value={verse?.text} color="#000" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SwipeableDrawer>
  );
};

const PartSelector = ({ handleClick, part, idx }) => {
  const parts = [
    { id: "verse", label: "Verse" },
    { id: "verse_2", label: "Verse 2" },
    { id: "verse_3", label: "Verse 3" },
    { id: "pre_chorus", label: "Pre-chorus" },
    { id: "chorus", label: "Chorus" },
    { id: "bridge", label: "Bridge" },
  ];
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (part.chorus) {
      setSelected("chorus");
    }
  }, [part.chorus]);

  useEffect(() => {
    if (selected) {
      handleClick({ part: selected, part_idx: idx });
    }
  }, [selected]);

  return (
    <div className="flex flex-row gap-2 items-center justify-start mb-2 flex-wrap">
      {parts.map((part) => {
        return (
          <button
            className={`px-2 py-1 rounded-full text-xs ${
              part.id === selected ? "bg-rose-500 text-white" : "bg-gray-200"
            }`}
            onClick={selected ? () => setSelected(null) : () => setSelected(part.id)}
          >
            {part.label}
          </button>
        );
      })}
    </div>
  );
};
export default AddToSongBank;
