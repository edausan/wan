import { Add } from "@mui/icons-material";
import { SpeedDialIcon } from "@mui/material";
import React, { useCallback, useState, useMemo, Suspense, lazy, useEffect } from "react";
import EditSong from "./EditSong";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/usersSlice";
import { ADMIN } from "@/data";
import SongLoading from "./SongLoading";
import SongPreview from "./SongPreview";
import { useHistory, useParams } from "react-router-dom";

const Song = lazy(() => import("./Song"));
const CreateNewSong = lazy(() => import("./CreateNewSong"));
const SongDetailsDrawer = lazy(() => import("@components/Lineup/SongDetailsDrawer"));

const SongList = ({ songs, updateLyricsQuery, updateChordsQuery, updateMediaQuery }) => {
  const params = useParams();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);
  const [drawerData, setDrawerData] = useState({ song: null, id: null });
  const [expanded, setExpanded] = useState(false);
  const [openDrawer, setOpenDrawer] = useState({ song: null, state: false });
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    !openDrawer.state && history.push("/songs");
  }, [history, openDrawer.state]);

  useEffect(() => {
    if (params.id) {
      const song = songs.filter((s) => s.id === params.id)[0];
      setOpenDrawer({ song, state: true });
    }
  }, [params.id, songs]);

  useEffect(() => {
    if (params.id) {
      setUpdating(true);
      setTimeout(() => {
        setUpdating(false);
      }, 500);
    }
  }, [params.id]);

  const handleClose = useCallback(() => {}, []);

  const drawer_data = useMemo(() => drawerData, [drawerData]);
  const expand = useMemo(() => expanded, [expanded]);

  const handleExpandClick = useCallback(
    (song, id) => {
      setDrawerData({ song, id });
      setExpanded(!expanded);
    },
    [expanded],
  );

  return (
    <div className="flex flex-col gap-3 mt-3 p-3">
      <SongDetailsDrawer
        drawerData={drawer_data}
        expanded={expand}
        handleClose={handleClose}
        handleExpandClick={handleExpandClick}
      />

      <EditSong drawer={openDrawer} setOpen={setOpenDrawer} />

      <CreateNewSong open={open} setOpen={setOpen} />

      {(currentUser?.user_metadata?.ministry === "VIA" || currentUser?.user?.uid === ADMIN) && (
        <button
          className="fixed bottom-[86px] right-[26px] w-[50px] h-[50px]  bg-white text-black shadow-lg rounded-full z-50"
          onClick={() => setOpen(true)}
        >
          <span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30"></span>
          <SpeedDialIcon className="relative z-50" openIcon={<Add />} />
        </button>
      )}

      <SongPreview
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        updating={updating}
        updateLyricsQuery={updateLyricsQuery}
        updateChordsQuery={updateChordsQuery}
        updateMediaQuery={updateMediaQuery}
      />

      {songs
        // .filter((song) => !song?.lyrics?.verse && !song?.media?.youtube)
        .map((song) => {
          return (
            <Suspense key={song?.id} fallback={<SongLoading />}>
              <Song
                song={song}
                handleExpandClick={handleExpandClick}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
              />
            </Suspense>
          );
        })}
    </div>
  );
};

export default SongList;
