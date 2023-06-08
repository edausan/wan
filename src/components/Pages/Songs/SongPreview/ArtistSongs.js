import React, { useEffect, useMemo, useState } from "react";
import SongsQuery from "@api/songsQuery";
import IconButton from "@mui/material/IconButton";
import ChevronRight from "@mui/icons-material/ChevronRight";
import BG from "@assets/BG-Song.jpg";
import { Link, useHistory } from "react-router-dom";

const ArtistSongs = ({ artist, song }) => {
  const history = useHistory();
  const { songsQuery } = SongsQuery();
  const [artistSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    if (!songsQuery.isFetching) {
      const songs = songsQuery.data;
      const filtered = songs.filter(
        (song) => song?.artist?.toLowerCase() === artist?.toLowerCase(),
      );
      setArtistSongs(filtered.filter((s) => s.id !== song?.id).splice(0, 5));
    }
  }, [artist, songsQuery.data, songsQuery.isFetching]);

  return useMemo(() => {
    return (
      <section className="flex flex-col gap-2 w-full mt-4 px-8 py-4">
        <div>
          <h1 className="text-lg">
            Similar Artist |{" "}
            <small className="text-sky-500">
              <Link to={`/songs/artist=${artist}`}>{artist}</Link>
            </small>
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {artistSongs.map((song) => {
            return (
              <div
                onClick={() => history.push(`/song/${song?.id}`)}
                role="button"
                tabIndex={0}
                key={song?.id}
                className="flex flex-row items-center gap-2 shadow-none hover:shadow-lg transition-all duration-200 px-2 py-1 rounded-full cursor-pointer"
              >
                <div className="w-[30px] h-[30px] rounded-full bg-sky-500 overflow-hidden">
                  <img src={BG} alt="" className="h-full opacity-30" />
                </div>
                <div className="flex-1">
                  <h1 className="font-bold text-sm">{song?.title}</h1>
                  <p className="text-xs text-gray-400">{song?.artist}</p>
                </div>

                <IconButton>
                  <ChevronRight />
                </IconButton>
              </div>
            );
          })}
        </div>
      </section>
    );
  }, [artist, artistSongs]);
};

export default ArtistSongs;
