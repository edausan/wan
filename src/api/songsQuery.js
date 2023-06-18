import { useMutation, useQuery } from "react-query";
import { time } from "../Firebase";
import { GetAllSongs, UpdateChords, UpdateLyrics } from "@/Firebase/songsApi";

const SongsQuery = (uid = "") => {
  const songsQuery = useQuery("songs", GetAllSongs, {
    cacheTime: time,
  });

  const updateLyricsQuery = useMutation(UpdateLyrics);
  const updateChordsQuery = useMutation(UpdateChords);

  return {
    songsQuery,
    updateLyricsQuery,
    updateChordsQuery,
  };
};

export default SongsQuery;
