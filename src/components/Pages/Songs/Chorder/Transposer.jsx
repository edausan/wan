/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CHORDS } from "./Chords";

const Transposer = () => {
  const [selectedKey, setSelectedKey] = useState("C");
  const [chordRuns, setChordRuns] = useState("");
  const [namedChordRuns, setNamedChordRuns] = useState([]);
  const [numberdChordRuns, setNumberedChordRuns] = useState([]);
  const [fromKey, setFromKey] = useState(null);

  useEffect(() => {
    if (selectedKey && chordRuns) {
      handleNameChords();
      handleChordRuns();
    }
  }, [selectedKey, chordRuns]);

  const handleNameChords = () => {
    const chord = CHORDS.filter((chord) => chord.root === selectedKey)[0];

    const name_chords = chordRuns
      ?.split("-")
      .map((cr) => {
        if (cr !== "" || cr !== null) {
          const filtered_chord = chord.familyChords.filter((f) => f.relation === cr.trim())[0];
          if (filtered_chord) {
            return filtered_chord;
          }
          return cr;
        }
      })
      .filter((c) => c);

    setNamedChordRuns(name_chords);
  };

  const handleChordRuns = () => {
    const chord = CHORDS.filter((chord) => chord.root === selectedKey)[0];

    const name_chords = chordRuns
      ?.split("-")
      .map((cr) => {
        if (cr !== "" || cr !== null) {
          const filtered_chord = chord.familyChords.filter((f) => f.name === cr.trim())[0];
          if (filtered_chord) {
            return filtered_chord;
          }
          // return cr;
        }
      })
      .filter((c) => c);

    setNumberedChordRuns(name_chords);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 max-w-[500px] mx-auto">
      <div>
        <span>Key: </span>
        <select name="" id="" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
          {CHORDS.map((chord) => {
            return (
              <option key={chord.root} value={chord.root}>
                {chord.root}
              </option>
            );
          })}
        </select>
      </div>
      <textarea
        className="w-full p-4"
        placeholder="chord runs"
        onChange={(e) => setChordRuns(e.target.value)}
      ></textarea>

      {namedChordRuns.length > 0 && (
        <div className="flex flex-row flex-wrap gap-1">
          {namedChordRuns?.map((nc, idx) => {
            return (
              <>
                {idx > 0 &&
                  idx < namedChordRuns.length &&
                  nc !== ">" &&
                  namedChordRuns[idx - 1] !== ">" &&
                  "- "}{" "}
                <Chord chord={nc} />
              </>
            );
          })}
        </div>
      )}

      {/* {numberdChordRuns.length > 0 && (
				<div className="flex flex-row gap-1">
					{numberdChordRuns?.map((nc) => {
						return <Chord chord={nc} isNum />;
					})}
				</div>
			)} */}
    </div>
  );
};

const Chord = ({ chord, isNum }) => {
  return chord === ">" ? (
    <div className="basis-[100%] h-1" />
  ) : (
    <span className="">{isNum ? chord?.relation : chord?.name}</span>
  );
};

export default Transposer;
