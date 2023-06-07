/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CHORDS } from "@components/Pages/Songs/Chorder/Chords";

const useTransposer = ({ selectedKey = "C", chordRuns }) => {
  const [namedChordRuns, setNamedChordRuns] = useState([]);
  const [isTransposing, setIsTransposing] = useState(true);
  const [fromKey, setFromKey] = useState(null);

  useEffect(() => {
    if (selectedKey && chordRuns?.split("").length > 0) {
      handleNameChords();
    }
  }, [selectedKey, chordRuns]);

  const handleNameChords = () => {
    setIsTransposing(true);
    const key = CHORDS.filter((chord) => chord.root === selectedKey)[0];

    const name_chords = chordRuns
      ?.split("-")
      .map((cr) => {
        if (cr !== "" || cr !== null) {
          const trimmed = cr.trim();
          const splitted = trimmed.split(" ");
          const special = splitted.map((chord) => {
            return {
              with_x: chord.includes("x"),
              with_nl: chord.includes("\n"),
              chord,
            };
          });

          const splitted2 = splitted[0].split("\n");
          // console.log({ splitted });
          const filtered_chord = key.familyChords.filter(
            (f) =>
              f.relation.toLowerCase() === splitted2[0].toLowerCase() ||
              f.name.toLowerCase() === splitted2[0].toLowerCase(),
          )[0];
          // console.log(filtered_chord);
          if (filtered_chord) {
            return filtered_chord;
          }
          return splitted2[0];
        }
      })
      .filter((c) => c);

    if (name_chords.length > 0) {
      setIsTransposing(false);
      setNamedChordRuns(name_chords);
    }
  };

  return {
    chords: namedChordRuns,
    isTransposing,
  };
};

export default useTransposer;
