import { useMutation, useQuery } from "@tanstack/react-query";
import { time } from "../Firebase";
import { GetAllSongs, UpdateChords, UpdateLyrics, UpdateMedia } from "@/Firebase/songsApi";

const SongsQuery = (uid = "") => {
  const songsQuery = useQuery({ queryKey: ["songs"], queryFn: GetAllSongs, cacheTime: time });

  const updateLyricsQuery = useMutation({ mutationKey: "update-lyrics", mutationFn: UpdateLyrics });
  const updateChordsQuery = useMutation({ mutationKey: "update-chords", mutationFn: UpdateChords });
  const updateMediaQuery = useMutation({ mutationKey: "update-media", mutationFn: UpdateMedia });

  return {
    songsQuery,
    updateLyricsQuery,
    updateChordsQuery,
    updateMediaQuery,
  };
};

export default SongsQuery;
