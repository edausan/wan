import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SongsQuery from "@api/songsQuery";
import BG from "@assets/BG-Song.jpg";
import IconButton from "@mui/material/IconButton";
import ChevronRight from "@mui/icons-material/ChevronRight";

const SimilarAlbum = ({ song, album }) => {
  const { songsQuery } = SongsQuery();
  const [sameAlbum, setSameAlbum] = useState([]);

  useEffect(() => {
    if (!songsQuery.isFetching && album) {
      const songs = songsQuery.data;
      const filtered = songs
        .filter((song) => song?.album?.toLowerCase() === album?.toLowerCase())
        .filter((s) => s.title !== song.title);
      setSameAlbum(filtered.splice(0, 5));
    }
  }, [album, songsQuery.data, songsQuery.isFetching]);

  return useMemo(() => {
    return (
      sameAlbum.length > 0 && (
        <section className="flex flex-col gap-2 w-full px-8 py-4 bg-gray-100">
          <div>
            <h1 className="text-lg">
              Similar Album |{" "}
              <small className="text-sky-500">
                <Link to={`/songs/album=${album}`}>{album}</Link>
              </small>
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            {sameAlbum.map((song) => {
              return (
                <div
                  key={song?.id}
                  className="flex flex-row items-center gap-2 shadow-none hover:shadow-lg hover:bg-white transition-all duration-200 px-2 py-1 rounded-full cursor-pointer"
                >
                  <div className="w-[30px] h-[30px] rounded-full bg-sky-500 overflow-hidden">
                    <img src={BG} alt="" className="h-full opacity-30" />
                  </div>
                  <div className="flex-1">
                    <h1 className="font-bold text-sm">{song?.title}</h1>
                    <p className="text-xs text-gray-400">{song?.album}</p>
                  </div>

                  <IconButton>
                    <ChevronRight />
                  </IconButton>
                </div>
              );
            })}
          </div>
        </section>
      )
    );
  }, [album, sameAlbum]);
};

export default SimilarAlbum;
