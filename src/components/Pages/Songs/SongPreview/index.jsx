import ChevronLeft from "@mui/icons-material/ChevronLeft";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { IconButton, Skeleton, SwipeableDrawer } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BG from "@assets/BG-Song.jpg";
import SongPlayer from "./SongPlayer";
import ArtistSongs from "./ArtistSongs";
import SongLyrics from "./SongLyrics";
import SimilarAlbum from "./SimilarAlbum";
import AddDetails from "./AddDetails";
import AddLyrics from "./AddLyrics";
import AddChords from "./AddChords";
import SongsQuery from "@api/songsQuery";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import SongChords from "./SongChords";
import UserQuery from "@api/userQuery";
import LyricsChordSwitcher from "./LyricsChordSwitcher";
import AddMedia from "./AddMedia";

const SongPreview = ({
  openDrawer,
  setOpenDrawer,
  updating,
  updateLyricsQuery,
  updateChordsQuery,
  updateMediaQuery,
}) => {
  const auth = getAuth(FirebaseApp);
  const { currentUser } = auth;
  const { song, state } = openDrawer;
  const params = useParams();
  const history = useHistory();

  const { userQuery } = UserQuery(currentUser.uid);

  const [drawer, setDrawer] = useState("");
  const [lyricsMode, setLyricsMode] = useState(userQuery?.data?.ministry === "VIA");

  const updateLyrics = updateLyricsQuery;
  const updateChords = updateChordsQuery;
  const updateMedia = updateMediaQuery;

  useEffect(() => {
    if (!updateLyrics.isLoading || !updateChords.isLoading || !updateMedia.isLoading) {
      setDrawer("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLyrics.isLoading, updateChords.isLoading, updateMedia.isLoading]);

  const isWorship = song?.tags.findIndex((tag) => tag === "Worship" || tag === "Solemn") >= 0;

  return useMemo(() => {
    return (
      <SwipeableDrawer
        onClose={() => setOpenDrawer({ song: null, state: false })}
        className="z-[1004] w-[100%]"
        open={openDrawer.state}
        anchor="right"
      >
        <section className={`bg-white h-[100vh] w-[100vw] `}>
          <article
            className={`sticky z-10 top-0 w-full flex flex-row items-start h-auto ${
              song?.media?.youtube ? "pb-20" : ""
            } ${
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

            <div className="mt-0 z-10 px-4 relative w-full">
              <h1 className="text-2xl font-black w-full">
                <Text updating={updating} text={song?.title} />
              </h1>
              <div className="text-sm w-full">
                {song?.album && <Text updating={updating} text={song?.album} label="Album:" />}
                {song?.artist && <Text updating={updating} text={song?.artist} label="Artist:" />}
              </div>
            </div>
          </article>

          <section className="max-w-[680px] mx-auto w-full">
            <AddDetails song={song} setDrawer={setDrawer} />

            <LyricsChordSwitcher
              isJAM={userQuery?.data?.ministry !== "VIA"}
              setLyricsMode={setLyricsMode}
            />

            <AddMedia
              song={song}
              open={drawer === "media"}
              onClick={() => setDrawer("")}
              updateMediaQuery={updateMediaQuery}
            />
            <AddLyrics
              song={song}
              open={drawer === "lyrics"}
              onClick={() => setDrawer("")}
              updateLyricsQuery={updateLyricsQuery}
            />
            <AddChords
              song={song}
              open={drawer === "chords"}
              onClick={() => setDrawer("")}
              updateChordsQuery={updateChordsQuery}
            />

            {!lyricsMode ? <SongLyrics song={song} /> : <SongChords song={song} />}

            {song?.artist && <ArtistSongs artist={song?.artist} song={song} />}
            {song?.album && <SimilarAlbum album={song?.album} song={song} />}
          </section>
        </section>
      </SwipeableDrawer>
    );
  }, [
    openDrawer.state,
    song,
    isWorship,
    updating,
    userQuery?.data?.ministry,
    drawer,
    updateMediaQuery,
    updateLyricsQuery,
    updateChordsQuery,
    lyricsMode,
    setOpenDrawer,
  ]);
};

const Text = ({ updating, text, label = "" }) => {
  return updating ? (
    <Skeleton variant="text" className="w-[100%]" />
  ) : (
    <p>
      {label ? `${label} ` : ""}
      {text}
    </p>
  );
};

export default SongPreview;
