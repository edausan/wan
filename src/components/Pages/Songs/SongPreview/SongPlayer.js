import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useMemo, useState } from "react";
import Sample from "@assets/salamat.mp3";
import { PauseRounded } from "@mui/icons-material";

const SongPlayer = ({ stop, song }) => {
  return (
    <section className="bg-white laptop:w-[75%] phone:w-[85%] rounded-xl overflow-hidden z-10 absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] shadow-2xl flex flex-row items-center justify-between">
      <Media media={song?.media?.youtube} />
    </section>
  );
};

const Media = ({ media }) => {
  return (
    <iframe
      className="w-[100%] phone:h-[120px] laptop:h-[120px]"
      title="spotify"
      src={media}
      frameborder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
};

export default SongPlayer;
