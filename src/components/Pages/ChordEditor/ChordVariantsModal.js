import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CHORDS } from "@components/Pages/Songs/Chorder/Chords";

const ChordVariantsModal = ({ chord, setChord, open, replaceChord }) => {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    if (chord.chord) {
      const splitted_chord = chord.chord.split("");
      const joined_chord =
        splitted_chord.length > 1
          ? splitted_chord[1] === "#" || splitted_chord[1] === "b" || splitted_chord[1] === "♯"
            ? `${splitted_chord[0]}${splitted_chord[1]}`
            : splitted_chord[0]
          : splitted_chord[0];

      const filtered = CHORDS.filter((c) => c.root === joined_chord)[0];
      setVariants(filtered?.variants);
    }
  }, [chord.chord]);

  const handleReplace = (selectedChord) => {
    replaceChord({ chord: selectedChord, part: chord.label });
  };

  return (
    <Dialog
      open={(open && chord.chord) || false}
      onClose={() => setChord({ chord: null, label: null })}
      className="backdrop-blur-[2px]"
    >
      <section className="w-[80vw] h-[80vh] overflow-hidden flex flex-col items-center justify-center">
        <div className="px-4 py-2 text-left w-full">Selected Chord: {chord.chord}</div>
        <div className="flex-1 flex flex-col gap-2 max-h-[100%] overflow-auto p-4">
          <Variants variant={variants?.maj} label="Major Variant" replaceChord={handleReplace} />
          <Variants variant={variants?.min} label="Minor Variant" replaceChord={handleReplace} />
          <Variants variant={variants?.other} label="Other Variant" replaceChord={handleReplace} />
          <Variants variant={variants?.overs} label="Over Variant" replaceChord={handleReplace} />
        </div>

        <div className="p-4">
          <button onClick={() => setChord({ chord: null, label: null })}>Close</button>
        </div>
      </section>
    </Dialog>
  );
};

const Variants = ({ variant = [], label = "", replaceChord = () => {} }) => {
  return (
    <section className="p-4 border border-slate-300 rounded-md">
      <div className="text-sm text-sky-500">{label}</div>
      <div className="flex flex-row flex-wrap gap-2 mt-2">
        {variant?.map((chord) => {
          return (
            <button
              key={`${chord}${label}`}
              onClick={() => replaceChord({ chord, label })}
              className="px-2 py-1 border border-slate-300 rounded-full"
            >
              {chord}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ChordVariantsModal;
