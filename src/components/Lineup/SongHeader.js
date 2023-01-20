import React, { useContext } from "react";
import { AppCtx } from "../../App";

const SongHeader = ({ song }) => {
  const { mode } = useContext(AppCtx);

  return (
    <section
      className={`sticky top-0 left-0 ${
        mode ? "Song-Header_dark" : "Song-Header_light"
      } w-[100%] flex flex-row bg-white z-50 shadow-lg mb-2`}
    >
      <div className={`Album-Cover-Wrapper w-[100px] bg-black`}>
        <img src={song.cover} alt="" />
      </div>
      <div className="p-2 flex flex-col justify-center flex-1 z-20 ">
        <strong>{song?.title}</strong>
        <small>{song?.artist}</small>
        <small>{song?.album}</small>
        <small>Key: {song?.key}</small>
      </div>
    </section>
  );
};

export default SongHeader;
