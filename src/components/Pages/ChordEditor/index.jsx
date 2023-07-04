import React, { useEffect, useState } from "react";
import { CHORDS, MUSICAL_NOTES } from "@components/Pages/Songs/Chorder/Chords";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SongPart from "./SongPart";
import ChordVariantsModal from "./ChordVariantsModal";
import ChordMenu from "./ChordMenu";

const ChordEditor = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedFamilyChords, setSelectedFamilyChords] = useState({
    familyChords: [],
    root: null,
    isAccidental: false,
    isFamily: false,
    relatedKeys: [],
    variants: {
      maj: [],
      min: [],
      other: [],
      overs: [],
    },
  });

  const [selectedPart, setSelectedPart] = useState(null);

  const [selectedChords, setSelectedChords] = useState({
    intro: [],
    verse: [],
    pre_chorus: [],
    chorus: [],
    bridge: [],
    refrain: [],
    last_three: [],
  });

  const [selectedChordVariant, setSelectedChordVariant] = useState({
    chord: null,
    label: null,
  });

  const [selectVariant, setSelectVariant] = useState(false);

  const handleChangeKey = (e) => {
    setSelectedKey(e.target.value);
    const family_chords = CHORDS.filter((chord) => chord.root === e.target.value)[0];
    setSelectedFamilyChords(family_chords);
  };

  const handleSelectChord = (chord) => {
    const part = selectedPart.toLowerCase().split("-").join("_");
    setSelectedChords((prev) => ({
      ...prev,
      [part]: [...prev[part], chord],
    }));
  };

  const handleSelectPart = (part) => {
    setSelectedPart(part);
  };

  const handleClearPart = (part) => {
    const selected_part = selectedPart.toLowerCase().split("-").join("_");
    setSelectedChords((prev) => ({
      ...prev,
      [selected_part]: [],
    }));
  };

  const handleShowVariants = ({ chord, label }) => {
    const selected_chord = chord?.name ? chord.name : chord;
    setSelectedChordVariant({ chord: selected_chord, label });
  };

  const handleRemoveChord = (chord) => {
    const selected_part = chord.label.toLowerCase().split("-").join("_");
    const part = selectedChords[selected_part];
    const altered = part.filter((c) => (c.name ? c.name : c) !== chord.chord);

    setSelectedChords((prev) => ({ ...prev, [selected_part]: altered }));
    setSelectedChordVariant({ chord: null, label: null });
  };

  const handleReplaceChord = ({ chord, part }) => {
    const replacing = selectedChordVariant.chord;
    const lowered_part = part.toLowerCase().split("-").join("_");
    const selected_part = selectedChords[lowered_part];
    const altered = selected_part.filter((c) => (c.name ? c.name : c) !== replacing);

    const updated_part = selected_part.map((c) => {
      const chord_name = c.name ? c.name : c;
      if (chord_name === replacing) {
        return {
          ...c,
          name: chord.chord || chord,
        };
      } else {
        return c;
      }
    });

    setSelectedChords((prev) => ({ ...prev, [lowered_part]: updated_part }));
    setSelectedChordVariant({ chord: null, label: null });
  };

  useEffect(() => {
    !selectedChordVariant.chord && setSelectVariant(false);
  }, [selectedChordVariant.chord]);

  return (
    <div className="max-w-[650px] w-[100vw] mx-auto p-4">
      {selectedChordVariant.chord && (
        <div
          tabIndex={0}
          role="button"
          onClick={() => setSelectedChordVariant({ chord: null, label: null })}
          className="absolute z-10 top-0 left-0 w-full h-[100vh] backdrop-blur-[2px] transition-all duration-200 bg-black/30"
        />
      )}

      <ChordMenu
        selectedChord={selectedChordVariant}
        onClose={() => setSelectedChordVariant({ chord: null, label: null })}
        selectVariant={() => setSelectVariant(true)}
        removeChord={handleRemoveChord}
      />

      <ChordVariantsModal
        chord={selectedChordVariant}
        setChord={setSelectedChordVariant}
        open={selectVariant}
        replaceChord={handleReplaceChord}
      />

      <FormControl variant="standard" className="w-full">
        <InputLabel>Select Key</InputLabel>
        <Select label="Select Key" value={selectedKey} onChange={handleChangeKey}>
          {MUSICAL_NOTES.map((note) => {
            return (
              <MenuItem key={note.root} value={note.root}>
                {note.root}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <SongPart
        label="Intro"
        part={selectedChords.intro}
        selectedPart={selectedPart}
        handleSelect={handleSelectPart}
        clearPart={handleClearPart}
        showVariants={handleShowVariants}
        selectedChordVariant={selectedChordVariant}
      />

      <SongPart
        label="Verse"
        part={selectedChords.verse}
        handleSelect={handleSelectPart}
        selectedPart={selectedPart}
        clearPart={handleClearPart}
        showVariants={handleShowVariants}
        selectedChordVariant={selectedChordVariant}
      />

      <SongPart
        label="Pre-chorus"
        part={selectedChords.pre_chorus}
        handleSelect={handleSelectPart}
        selectedPart={selectedPart}
        clearPart={handleClearPart}
        showVariants={handleShowVariants}
        selectedChordVariant={selectedChordVariant}
      />
      <SongPart
        label="Chorus"
        part={selectedChords.chorus}
        handleSelect={handleSelectPart}
        selectedPart={selectedPart}
        clearPart={handleClearPart}
        showVariants={handleShowVariants}
        selectedChordVariant={selectedChordVariant}
      />

      {selectedKey && selectedPart && (
        <section className="mt-4">
          <span>Family Chords</span>
          <div className="flex flex-row gap-2 flex-wrap mt-2">
            {selectedFamilyChords.familyChords.map((chord) => {
              return (
                <button
                  key={chord.name}
                  onClick={() => handleSelectChord(chord)}
                  className="px-2 py-1 border border-slate-300 rounded-full"
                >
                  {chord.name}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ChordEditor;
