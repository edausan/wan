import ChevronLeft from "@mui/icons-material/ChevronLeft";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { IconButton, SwipeableDrawer } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import BG from "@assets/BG-Song.jpg";
import SongPlayer from "./SongPlayer";
import ArtistSongs from "./ArtistSongs";
import SongLyrics from "./SongLyrics";
import SimilarAlbum from "./SimilarAlbum";

const SongPreview = ({ openDrawer, setOpenDrawer }) => {
  // console.log({ openDrawer });
  const { song, state } = openDrawer;
  const params = useParams();
  const history = useHistory();
  const path = history.location.pathname;
  // console.log({ path, his: history.location, params });

  const isWorship = song?.tags.findIndex((tag) => tag === "Worship" || tag === "Solemn") >= 0;

  console.log({ isWorship, tags: song?.tags });

  return (
    <SwipeableDrawer
      onClose={() => setOpenDrawer({ song: null, state: false })}
      className="z-[1004] w-[100%]"
      open={openDrawer.state}
      anchor="right"
    >
      <section className={`bg-white h-[100vh] w-[100vw] `}>
        <article
          className={`sticky z-10 top-0 w-full flex flex-row items-start  ${
            (!song?.artist || !song?.album) && !song?.media?.youtube
              ? "h-auto"
              : !song?.media?.youtube
              ? "h-auto"
              : "h-[180px]"
          }  ${!song?.media?.youtube ? "h-[100px]" : "h-[180px]"} ${
            isWorship
              ? "bg-gradient-to-r from-orange-600 to-yellow-500"
              : "bg-gradient-to-r from-sky-600 to-cyan-500"
          }  text-white p-4`}
        >
          <div
            className={`${
              !song?.media?.youtube ? "h-[100px]" : "h-[180px]"
            } overflow-hidden w-full absolute top-0 left-0 z-0 blur-sm`}
          >
            <img src={BG} alt="" className="w-[110%] h-full opacity-30" />
          </div>

          {song?.media?.youtube && <SongPlayer stop={openDrawer.state} song={song} />}

          <IconButton className="" onClick={() => setOpenDrawer({ song: null, state: false })}>
            <ChevronLeft className="text-white" />
          </IconButton>

          <div className="mt-0 z-10 p-4 pt-0 relative">
            <h1 className="text-2xl font-black">{song?.title}</h1>
            <div className="text-sm">
              {song?.album && <p>Album: {song?.album}</p>}
              {song?.artist && <p>Artist: {song?.artist}</p>}
            </div>
          </div>
        </article>

        <SongLyrics song={song} />

        <ArtistSongs artist={song?.artist} song={song} />
        <SimilarAlbum album={song?.album} song={song} />
      </section>
    </SwipeableDrawer>
  );
};

export default SongPreview;
