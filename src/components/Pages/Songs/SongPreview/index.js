import ChevronLeft from "@mui/icons-material/ChevronLeft";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { IconButton, SwipeableDrawer } from "@mui/material";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import BG from "@assets/BG-Song.jpg";
import SongPlayer from "./SongPlayer";

const SongPreview = ({ openDrawer, setOpenDrawer }) => {
  // console.log({ openDrawer });
  const { song, state } = openDrawer;
  const params = useParams();
  const history = useHistory();
  const path = history.location.pathname;
  // console.log({ path, his: history.location, params });
  return (
    <SwipeableDrawer
      onClose={() => setOpenDrawer({ song: null, state: false })}
      className="z-[1004] w-[100%]"
      open={openDrawer.state}
      anchor="right"
    >
      <section className={`bg-white h-[100vh] w-[100vw] `}>
        <article className="w-full h-[200px] bg-gradient-to-r from-orange-600 to-yellow-500  text-white relative p-4">
          <div className="h-[inherit] overflow-hidden w-full absolute top-0 left-0 z-0 blur-sm">
            <img src={BG} alt="" className="w-[110%] h-full opacity-30" />
          </div>
          <SongPlayer stop={openDrawer.state} song={song} />
          {/* <div className="absolute top-[50%] left-[80%] z-20 translate-x-[-50%] translate-y-[-50%]">
            <IconButton className="opacity-75 hover:opacity-100 transition-all duration-200">
              <PlayCircleIcon className="text-white text-[56px]" />
            </IconButton>
          </div> */}
          <div className="mt-8 z-10 relative p-4">
            <h1 className="text-2xl font-black">{song?.title}</h1>
            <div className="text-sm">
              <p>Album: {song?.album}</p>
              <p>Artist: {song?.artist}</p>
            </div>
          </div>

          <IconButton
            className="fixed top-2 left-2"
            onClick={() => setOpenDrawer({ song: null, state: false })}
          >
            <ChevronLeft className="text-white" />
          </IconButton>
        </article>
      </section>
    </SwipeableDrawer>
  );
};

export default SongPreview;
