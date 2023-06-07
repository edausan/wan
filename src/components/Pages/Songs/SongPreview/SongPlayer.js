import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useMemo, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Sample from "@assets/salamat.mp3";
import { PauseRounded } from "@mui/icons-material";

const URL = "https://open.spotify.com/track/58vB428FCiAHrmQL6asik3";
const SongPlayer = ({ stop, song }) => {
  console.log({ stop });
  const [waveSurfer, setWaveSurfer] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: "#wave-container",
      waveColor: "#d1d5db",
      progressColor: "#0ea5e9",
      // // Set a bar width
      barWidth: 2,
      barHeight: 0.3,
      // // Optionally, specify the spacing between bars
      barGap: 1,
      // // And the bar radius
      barRadius: 2,
      url: song?.media?.audio,
    });

    setWaveSurfer(wavesurfer);
    const playing = wavesurfer.isPlaying();
    console.log({ playing });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  // useEffect(() => {
  //   waveSurfer?.play();
  // }, [waveSurfer]);

  // useEffect(() => {
  //   console.log({ waveSurfer });
  //   if (waveSurfer?.isPlaying()) {
  //     setIsPlaying(true);
  //   } else {
  //     setIsPlaying(false);
  //   }
  // }, [waveSurfer]);

  console.log({ isPlaying });

  const handlePlay = () => {
    waveSurfer?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    waveSurfer?.pause();
    setIsPlaying(false);
  };

  return useMemo(() => {
    return (
      <section className="bg-white w-[75%] p-2 rounded-full z-10 absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] shadow-2xl flex flex-row items-center justify-between">
        <div className="w-[50px] h-[50px] rounded-full bg-sky-500"></div>
        <div className="flex-1 h-[50px] overflow-hidden relative ml-2">
          <div
            className="w-full absolute top-[50%] left-0 translate-y-[-50%]"
            id="wave-container"
          />
        </div>
        <div>
          <IconButton onClick={!isPlaying ? handlePlay : handlePause}>
            {isPlaying ? <PauseRounded /> : <PlayArrowRounded />}
          </IconButton>
        </div>
      </section>
    );
  }, [isPlaying]);
};

export default SongPlayer;
