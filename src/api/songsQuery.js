import { useMutation, useQuery } from "react-query";
import { time } from "../Firebase";
import { GetAllSongs, UpdateChords, UpdateLyrics, UpdateMedia } from "@/Firebase/songsApi";

const SongsQuery = (uid = "") => {
  const songsQuery = useQuery("songs", GetAllSongs, {
    cacheTime: time,
  });

  const updateLyricsQuery = useMutation(UpdateLyrics);
  const updateChordsQuery = useMutation(UpdateChords);
  const updateMediaQuery = useMutation(UpdateMedia);

  return {
    songsQuery,
    updateLyricsQuery,
    updateChordsQuery,
    updateMediaQuery,
  };
};

export default SongsQuery;
