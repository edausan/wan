import React, { useMemo } from "react";

const MusicPlayer = () => {
  // useEffect(() => {
  //   const wavesurfer = WaveSurfer.create({
  //     container: "#wave-container",
  //     waveColor: "#d1d5db",
  //     progressColor: "#0ea5e9",
  //     // // Set a bar width
  //     barWidth: 2,
  //     barHeight: 0.3,
  //     // // Optionally, specify the spacing between bars
  //     barGap: 1,
  //     // // And the bar radius
  //     barRadius: 2,
  //     url: Sample,
  //   });

  //   setWaveSurfer(wavesurfer);
  //   const playing = wavesurfer.isPlaying();
  //   console.log({ playing });

  //   return () => {
  //     wavesurfer.destroy();
  //   };
  // }, []);

  // const handlePlay = () => {
  //   waveSurfer?.play();
  //   setIsPlaying(true);
  // };

  // const handlePause = () => {
  //   waveSurfer?.pause();
  //   setIsPlaying(false);
  // };
  const isPlaying = false;
  return useMemo(() => {
    return (
      <section className="bg-white laptop:w-[75%] phone:w-[85%] p-2 rounded-full z-10 absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] shadow-2xl flex flex-row items-center justify-between">
        <div className="w-[50px] h-[50px] rounded-full bg-sky-500"></div>
        <div className="flex-1 h-[50px] relative ml-2">
          <div
            className="w-full absolute top-[50%] left-0 translate-y-[-50%]"
            id="wave-container"
          />
        </div>
        <div>
          <IconButton>{isPlaying ? <PauseRounded /> : <PlayArrowRounded />}</IconButton>
        </div>
      </section>
    );
  }, [isPlaying]);
};

export default MusicPlayer;
