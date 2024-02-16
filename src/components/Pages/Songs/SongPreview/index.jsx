import ChevronLeft from "@mui/icons-material/ChevronLeft";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Skeleton, SwipeableDrawer } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
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
import Wrapper from "@/components/CustomComponents/Wrapper";
import { SongsCtx } from "../SongsMain";

const SongPreview = ({ openDrawer, setOpenDrawer, updating }) => {
  const auth = getAuth(FirebaseApp);
  // const { refetch } = useContext(SongsCtx);
  const { currentUser } = auth;
  const { song, state } = openDrawer;
  const params = useParams();
  const history = useHistory();

  const { userQuery } = UserQuery(currentUser.uid);

  const [drawer, setDrawer] = useState("");
  const [lyricsMode, setLyricsMode] = useState(userQuery?.data?.ministry === "VIA");
  const [hideMedia, setHideMedia] = useState(false);

  const { updateLyricsQuery, updateChordsQuery, updateMediaQuery, songsQuery } = SongsQuery();

  const updateLyrics = updateLyricsQuery;
  const updateChords = updateChordsQuery;
  const updateMedia = updateMediaQuery;

  useEffect(() => {
    if (!updateLyrics.isLoading || !updateChords.isLoading || !updateMedia.isLoading) {
      setDrawer("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLyrics.isLoading, updateChords.isLoading, updateMedia.isLoading]);

  useEffect(() => {
    !openDrawer.state && setHideMedia(false);
  }, [openDrawer.state]);

  const isWorship = song?.tags.findIndex((tag) => tag === "Worship" || tag === "Solemn") >= 0;

  const handleSongRoute = () => {
    history.push("/songs");
    setOpenDrawer({ song: null, state: false });
  };

  return useMemo(() => {
    return (
      <SwipeableDrawer
        onOpen={() => {}}
        onClose={() => setOpenDrawer({ song: null, state: false })}
        className="z-[1004] w-[100%]"
        open={openDrawer.state || false}
        anchor="right"
      >
        <section className={`bg-white h-[100vh] w-[100vw] `}>
          <article
            className={`sticky z-10 top-0 w-full flex flex-row items-center h-auto ${
              song?.media?.youtube && !hideMedia ? "pb-20" : ""
            } ${
              isWorship
                ? "bg-gradient-to-r from-orange-600 to-yellow-500"
                : "bg-gradient-to-r from-sky-600 to-cyan-500"
            }  text-white p-4`}
          >
            {/* <div
              className={`${
                !song?.media?.youtube ? "h-[100px]" : "h-[180px]"
              } overflow-hidden w-full absolute top-0 left-0 z-0 blur-sm`}
            >
              <img src={BG} alt="" className="w-[110%] h-full opacity-30" />
            </div> */}
            <IconButton className="" onClick={handleSongRoute}>
              <ChevronLeft className="text-white" />
            </IconButton>

            {hideMedia && (
              <IconButton
                onClick={() => setHideMedia(false)}
                className="bg-rose-500 text-sm ml-auto absolute laptop:top-[50%] phone:top-[100%] translate-y-[-50%] right-3 z-50 shadow-lg"
              >
                <PlayCircleIcon className="text-white" />
              </IconButton>
            )}

            <Wrapper>
              {song?.media?.youtube && !hideMedia && (
                <SongPlayer setHideMedia={setHideMedia} stop={openDrawer.state} song={song} />
              )}

              <div className="text-sm w-full flex gap-2 laptop:items-center laptop:flex-row laptop:gap-2 phone:flex-col phone:items-start phone:gap-1">
                <h1 className="laptop:text-2xl font-black phone:text-sm">
                  <Text updating={updating} text={song?.title} />
                </h1>

                <div className="flex gap-1 laptop:w-auto phone:w-full laptop:items-center phone:items-stretch">
                  {song?.key && (
                    <span className="bg-black/10 inline-block px-2 py-1 rounded-full">
                      <Text updating={updating} text={song?.key} label="Key:" className="text-xs" />
                    </span>
                  )}

                  {song?.tempo && (
                    <span className="bg-black/10 inline-block px-2 py-1 rounded-full">
                      <Text
                        updating={updating}
                        text={song?.tempo}
                        label="BPM:"
                        className="text-xs"
                      />
                    </span>
                  )}
                </div>

                {song?.album && (
                  <span className="bg-black/10 inline-block px-3 py-1 rounded-full">
                    <Text
                      updating={updating}
                      text={song?.album}
                      label="Album:"
                      className="text-xs"
                    />
                  </span>
                )}
                {song?.artist && (
                  <span className="bg-black/10 inline-block px-3 py-1 rounded-full">
                    <Text
                      updating={updating}
                      text={song?.artist}
                      label="Artist:"
                      className="text-xs"
                    />
                  </span>
                )}
              </div>
            </Wrapper>
          </article>

          <Wrapper>
            <section className="mx-auto w-full">
              {/* <button onClick={refetch}>Refetch</button> */}
              <AddDetails song={song} setDrawer={setDrawer} hideMedia={hideMedia} />

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

              <div className="mt-auto">
                {song?.artist && <ArtistSongs artist={song?.artist} song={song} />}
                {song?.album && <SimilarAlbum album={song?.album} song={song} />}
              </div>
            </section>
          </Wrapper>
        </section>
      </SwipeableDrawer>
    );
  }, [
    hideMedia,
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

const Text = ({ updating, text, label = "", className }) => {
  return updating ? (
    <Skeleton variant="text" className="w-[100%]" />
  ) : (
    <p className={`leading-none ${className}`}>
      {label ? `${label} ` : ""}
      {text}
    </p>
  );
};

export default SongPreview;
