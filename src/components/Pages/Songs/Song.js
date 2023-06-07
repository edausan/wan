import { LyricsTwoTone, MusicNote, YouTube } from "@mui/icons-material";
import { Card, CardHeader, CardMedia, IconButton, Skeleton } from "@mui/material";
import React, { Suspense, useContext } from "react";
import SPOTIFY_LOGO from "@assets/spotify_logo.png";
import ALBUM_PLACEHOLDER from "@assets/music_placeholder.jpg";
import { AppCtx } from "@/App";
import { ADMIN, JIL_ADMIN, ADRIAN } from "@/data";

const Song = ({ song, setOpenDrawer, openDrawer, handleExpandClick }) => {
  const { currentUser } = useContext(AppCtx);

  const allowed =
    currentUser.user.uid === ADMIN ||
    currentUser.user.uid === ADRIAN ||
    currentUser.user.uid === JIL_ADMIN ||
    currentUser.user_metadata.ministry === "VIA";

  const lyrics_disabled =
    !song?.lyrics?.verse &&
    !song?.lyrics?.pre_chorus &&
    !song?.lyrics?.chorus &&
    !song?.lyrics?.bridge;

  const chords_disabled =
    !song?.chords?.verse &&
    !song?.chords?.pre_chorus &&
    !song?.chords?.chorus &&
    !song?.chords?.bridge;

  return (
    <Card
      key={song?.id}
      className="phone:col-span-2 laptop:col-span-1 flex flex-row shadow-md"
      elevation={0}
    >
      <Suspense fallback={<Skeleton variant="rectangular" width={50} height="100%" />}>
        <CardMedia
          component="img"
          image={song?.cover || ALBUM_PLACEHOLDER}
          className={`w-[50px] min-w-[50px] overflow-hidden`}
        />
      </Suspense>
      <div className="flex-1 flex flex-row">
        <CardHeader
          onClick={
            allowed
              ? () => setOpenDrawer({ song, status: true })
              : currentUser.user_metadata.ministry === "VIA"
              ? () => handleExpandClick(song, "Lyrics")
              : () => handleExpandClick(song, "Chords")
          }
          className="flex-1 pt-2 pb-3 pl-2 phone:max-w-[205px] phone_lg:max-w-[244px] tablet:max-w-full laptop:max-w-full"
          title={
            <p className="text-sm laptop:text-sm phone:text-xs font-bold truncate desktop:max-w-full laptop:max-w-full tablet:max-w-full phone:max-w-[170px] box-border">
              {song?.title}
            </p>
          }
          titleTypographyProps={{ sx: { lineHeight: 0.8 } }}
          subheader={
            <div className="text-xs flex flex-col">
              <span className="mr-2 flex-1">
                {/* <small className='block'>Artist:</small> */}
                {song?.artist || <span className="text-[.55rem]">+ Add Artist</span>}
              </span>
              <span className="flex-1">
                {song?.album || <span className=" text-[.55rem]">+ Add Album</span>}
              </span>
            </div>
          }
          action={<div></div>}
        />

        <div className="flex flex-row items-center">
          <div
            className={`bg-sky-500 h-full flex flex-col items-center justify-center  ${
              lyrics_disabled ? "bg-gray-100" : ""
            }`}
          >
            <IconButton
              className="p-0 laptop:px-8 tablet:px-8 phone:px-6 w-[28px] h-full text-white rounded-none"
              disabled={lyrics_disabled}
              onClick={() => handleExpandClick(song, "Lyrics")}
            >
              <LyricsTwoTone fontSize="small" className="w-[20px] h-[20px]" />
            </IconButton>
          </div>

          <div
            className={`bg-orange-500 h-full flex flex-col items-center justify-center ${
              chords_disabled ? "bg-gray-100" : ""
            }`}
          >
            <IconButton
              className="p-0 laptop:px-8 tablet:px-8 phone:px-6 w-[28px] h-full text-white rounded-none"
              onClick={() => handleExpandClick(song, "Chords")}
              disabled={chords_disabled}
            >
              <MusicNote fontSize="small" className="w-[16x] h-[16px]" />
            </IconButton>
          </div>
          {/* <div className="px-1 flex flex-col justify-center items-center gap-1">
            <YouTube
              fontSize="small"
              className="w-[16x] h-[16px]"
              color={!song?.media?.youtube ? "disabled" : "error"}
            />
            <img
              src={SPOTIFY_LOGO}
              alt=""
              className={`w-[16px] ${
                !song?.media?.spotify ? "grayscale opacity-30" : ""
              }`}
            />
          </div> */}
        </div>
      </div>
    </Card>
  );
};

export default Song;
