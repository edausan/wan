import { useQuery } from "react-query";
import { time } from "../Firebase";
import { GetAllSongs } from "@/Firebase/songsApi";

const SongsQuery = (uid = "") => {
  const songsQuery = useQuery("songs", GetAllSongs, {
    cacheTime: time,
  });

  return {
    songsQuery,
  };
};

export default SongsQuery;
