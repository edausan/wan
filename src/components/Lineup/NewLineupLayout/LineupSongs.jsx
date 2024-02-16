import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllSongs } from "@/Firebase/songsApi";
import { LINEUP } from "@/data";
import LineupCard from "../LineupCard";

const LineupSongs = ({ songs, setSongs, currentStep }) => {
  const songsQuery = useQuery({ queryKey: ["songs"], queryFn: GetAllSongs });
  const songsList = songsQuery?.data;

  const handleChangeSong = ({ song, category }) => {
    const exists = songs.findIndex((song) => song.label === category.label) >= 0;

    if (song.id && !exists) {
      setSongs((prev) => [...prev, { ...song, label: category.label }]);
    } else {
      const updates = songs.map((s) => {
        if (s.label === category.label) {
          return { ...song, label: category.label };
        }
        return s;
      });

      setSongs(updates);
    }
  };

  return (
    <section className="w-full overflow-auto max-h-[100%] px-6 py-4">
      {songsList?.length > 0 &&
        LINEUP.map((category, idx) => {
          return (
            <LineupCard
              currentStep={currentStep}
              key={category.id + idx}
              // setLineupData={setLineupData}
              category={category}
              songs={songsList}
              lineupData={songs}
              handleChangeSong={handleChangeSong}
              songData={songs?.filter((s) => s?.label === category.label)[0]}
            />
          );
        })}
    </section>
  );
};

export default LineupSongs;
