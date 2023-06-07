import { Dialog } from "@mui/material";
import React from "react";

const ChordMenu = ({
  selectedChord,
  onClose = () => {},
  removeChord = () => {},
  selectVariant = () => {},
}) => {
  return (
    <Dialog
      open={selectedChord.chord || false}
      onClose={onClose}
      className=""
      BackdropProps={{
        style: {
          background: "none",
        },
      }}
      PaperProps={{
        style: {
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <section className="p-4 flex flex-col gap-2">
        <button
          className="px-4 py-2 border border-slate-300 rounded-md"
          onClick={() => removeChord(selectedChord)}
        >
          Remove <span className="text-sky-500">{selectedChord.chord}</span>
        </button>
        <button className="px-4 py-2 border border-slate-300 rounded-md" onClick={selectVariant}>
          Replace <span className="text-sky-500">{selectedChord.chord}</span>
        </button>
      </section>
    </Dialog>
  );
};

export default ChordMenu;
