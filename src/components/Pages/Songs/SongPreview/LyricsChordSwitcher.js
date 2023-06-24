/* eslint-disable jsx-a11y/no-static-element-interactions */
import { LyricsTwoTone, MusicNote, Notes } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const LyricsChordSwitcher = ({ isJAM, setLyricsMode }) => {
  const [isSwitched, setIsSwitched] = useState(isJAM);
  useEffect(() => {
    setLyricsMode(isSwitched);
  }, [isSwitched]);

  const bg = !isSwitched ? "from-cyan-400 to-sky-500" : "from-orange-400 to-yellow-500";

  return (
    <div className="flex flex-row gap-2 items-center justify-start px-6">
      <button
        className={`cursor-pointer relative px-4 py-2 rounded-full bg-gray-50 flex flex-row gap-4 transition-all duration-200 after:content-[''] after:absolute after:top-[50%] after:translate-y-[-50%] after:h-[75%] after:bg-sky-500 after:rounded-full after:z-0 after:transition-all after:duration-200 after:bg-gradient-to-r ${bg} after:shadow-md shadow-inner ${
          isSwitched ? "after:left-[46%] after:w-[50%]" : "after:left-[0.3rem] after:w-[45%]"
        }`}
        onClick={() => setIsSwitched((prev) => !prev)}
      >
        <span
          className={`z-[1] flex flex-row items-center gap-1 ${
            isSwitched ? "text-black/40" : "text-white"
          }`}
        >
          <Notes className="text-sm" /> Lyrics
        </span>{" "}
        <span
          className={`z-[1] flex flex-row items-center gap-1 ${
            !isSwitched ? "text-black/40" : "text-white"
          }`}
        >
          <MusicNote className="text-sm" /> Chords
        </span>
      </button>
    </div>
  );
};

export default LyricsChordSwitcher;
