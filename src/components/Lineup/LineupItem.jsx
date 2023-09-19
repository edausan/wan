/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState, lazy, useEffect } from "react";
import {
  CheckCircleTwoTone,
  Event,
  ExpandMore,
  LyricsTwoTone,
  MusicNote,
  YouTube,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import moment from "moment";
import { pink, blue } from "@components/Pages/Auth/Login";
import { useHistory, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import { DeleteLineup, GetAllLineups, GetAllSongs } from "@/Firebase/songsApi";
import SPOTIFY_LOGO from "@assets/spotify_logo.png";
import { useMutation, useQuery } from "react-query";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";

const EditSong = lazy(() => import("@components/Pages/Songs/EditSong"));
const SongDetailsDrawer = lazy(() => import("./SongDetailsDrawer"));
const LineupItemDrawer = lazy(() => import("./LineupItemDrawer"));
const Actions = lazy(() => import("./LineupItem/Actions"));
const Header = lazy(() => import("./LineupItem/Header"));
const LineupChords = lazy(() => import("./LineupChords"));
const SongPreview = lazy(() => import("@/components/Pages/Songs/SongPreview"));

const LineupItem = ({
  lineup,
  isBordered,
  isLast,
  isSongsExpanded,
  showPinned,
  pinnedLineup,
  idx,
}) => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const history = useHistory();
  const theme = useTheme();
  const laptopSize = useMediaQuery(theme.breakpoints.up("sm"));
  const [expanded, setExpanded] = useState(false);
  const [drawerData, setDrawerData] = useState({ song: null, id: null });
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [lineupSongs, setLineupSongs] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSongDrawer, setOpenSongDrawer] = useState({
    song: null,
    state: false,
  });
  const [pinned, setPinned] = useState(false);
  const [morePins, setMorePins] = useState(pinnedLineup?.length > 1);
  const [showChords, setShowChords] = useState(false);
  const [editSong, setEditSong] = useState({ song: null, status: false });

  useEffect(() => {
    lineup?.songs.length > 0 && lineup?.songs[0].title && GetSongsData();
  }, [lineup.songs]);

  useEffect(() => {
    isExpanded && songsQuery.refetch();
  }, [isExpanded]);

  const songsQuery = useQuery("songs", GetAllSongs);
  const mutatedLineup = useMutation(DeleteLineup);
  const lineupsQuery = useQuery("lineups", GetAllLineups);

  const GetSongsData = () => {
    const songs_data = lineup.songs.map((song) => {
      const songs_data = songsQuery.data?.filter((s) => s.id === song.id)[0];
      return { ...songs_data, label: song.label };
    });

    setLineupSongs(songs_data);
  };

  useEffect(() => {
    isSongsExpanded &&
      setTimeout(() => {
        setIsExpanded(true);
      }, 500);
    setPinned(lineup?.pinned);
  }, [lineup]);

  const handleExpandClick = (song, id) => {
    setDrawerData({ song, id });
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    history.push(`/lineup/edit/${lineup.id}`);
  };

  const handleDelete = async () => {
    mutatedLineup.mutate({ id: lineup.id });
  };

  useEffect(() => {
    if (mutatedLineup.isSuccess && !mutatedLineup.isLoading) {
      lineupsQuery.refetch();
    }
  }, [mutatedLineup.isSuccess, mutatedLineup.isLoading]);

  const handleCopy = () => {
    const verse = document.querySelector("#verse");
    const pre_chorus = document.querySelector("#pre-chorus");
    const chorus = document.querySelector("#chorus");

    navigator.clipboard.writeText(
      `${verse ? `Verse:\r\n${verse.innerHTML}\r\n\r\n` : ""}${
        pre_chorus ? `Pre-chorus:\r\n${pre_chorus.innerHTML}\r\n\r\n` : ""
      }${chorus ? `Chorus:\r\n${chorus.innerHTML}` : ""}`,
    );

    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleClose = () => {};

  const lineup_songs = lineup.songs[0].title ? lineupSongs : lineup.songs;

  return (
    <>
      <LoadingScreen status={mutatedLineup.isLoading} text="Deleting" />
      {drawerData.song && (
        <Suspense fallback={<div></div>}>
          {/* <SongPreview openDrawer={drawerData} /> */}

          <SongDetailsDrawer
            drawerData={drawerData}
            expanded={expanded}
            handleClose={handleClose}
            handleCopy={handleCopy}
            handleExpandClick={handleExpandClick}
            open={open}
          />
        </Suspense>
      )}

      <Suspense fallback={<div></div>}>
        <SongPreview openDrawer={openSongDrawer} setOpenDrawer={setOpenSongDrawer} />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <EditSong drawer={editSong} setOpen={setEditSong} />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <LineupItemDrawer
          setOpen={setOpenDrawer}
          open={openDrawer}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          user={user}
          lineup={lineup}
        />
      </Suspense>

      {showChords && (
        <LineupChords lineup={lineup} showChords={showChords} setShowChords={setShowChords} />
      )}

      <Card
        id={pinned ? "pinned-lineup-item" : "lineup-item"}
        sx={{
          maxWidth: 680,
          width: "100%",
          mx: "auto",
          mb: isBordered && isLast ? 0 : isBordered ? 1 : 2,
          border: "none",
          borderRadius: isBordered ? 0 : showPinned ? 0 : "",
          mt: isSongsExpanded ? 2 : 0,
        }}
        elevation={0}
        className={`shadow-md flex flex-col transition-all duration-300 ease-in-out ${
          showPinned ? "translate-y-[-60px] !mx-[-0.75rem] w-[100vw]" : "translate-y-0"
        } ${pinned ? "sticky top-0 z-10" : ""} ${
          morePins && idx !== pinnedLineup?.length - 1 ? "mr-4" : ""
        }`}
        // variant={isBordered ? 'outlined' : 'elevation'}
      >
        {/* {!showPinned && ( */}
        <Suspense>
          <Header lineup={lineup} setOpenDrawer={setOpenDrawer} showPinned={showPinned} />
        </Suspense>

        {/* )} */}

        <CardContent
          sx={{ py: 0 }}
          id="card-content"
          className={`flex-1 ${showPinned ? "!pb-1" : ""}`}
        >
          <List sx={{ py: 0, mt: 1 }}>
            <Accordion
              expanded={isExpanded}
              disableGutters
              sx={{ boxShadow: "none", py: 0, background: "none" }}
            >
              <AccordionSummary
                sx={{ px: 0, pr: 1 }}
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {/* {showPinned && ( */}
                <div
                  className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
                    !showPinned ? "translate-y-[-130%]" : "translate-y-0"
                  }`}
                >
                  {/* <Link
										to={`/profile/${lineup?.worship_leader?.uid}`}
										style={{ textDecoration: "none", color: "inherit" }}> */}
                  <Avatar
                    sx={{
                      background: `linear-gradient(45deg, ${pink}, ${blue})`,
                      color: "#fff",
                      my: "auto",
                      width: lineup?.pinned ? 30 : 40,
                      height: lineup?.pinned ? 30 : 40,
                    }}
                    aria-label="profile"
                    src={lineup?.worship_leader?.photoURL}
                  >
                    {lineup?.worship_leader?.displayName.split("")[0]}
                  </Avatar>
                  {/* </Link> */}
                </div>
                {/* )} */}
                <ListItem
                  sx={{ py: 0 }}
                  className={`transition-all duration-300 ease-in-out ${
                    !showPinned
                      ? laptopSize
                        ? "translate-x-[-9%]"
                        : "translate-x-[-18%]"
                      : "translate-x-0"
                  }`}
                >
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    {moment(lineup.date).diff(new Date()) < 0 ? (
                      <CheckCircleTwoTone color="success" />
                    ) : (
                      <Event
                        fontSize="small"
                        color={moment(lineup.date).diff(new Date()) >= 0 ? "warning" : "inherit"}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <small className="text-xs">
                        {lineup?.service}
                        <div style={{ color: theme.palette.text.secondary }} className="text-xs">
                          {moment(lineup.date).format("LL")}
                        </div>
                      </small>
                    }
                    // secondary={<small>Lineup Date</small>}
                  />
                </ListItem>
              </AccordionSummary>
              <Divider />
              <AccordionDetails sx={{ px: 0 }}>
                {lineup_songs
                  .filter((s) => s.song || s.title)
                  .map((s, idx) => {
                    return (
                      <ListItem key={`${s.id}~${idx}`}>
                        <div className="flex items-start flex-1 gap-1">
                          <YouTube
                            fontSize="small"
                            className="w-[16x] h-[16px] mt-[3px]"
                            color={!s?.media?.youtube ? "disabled" : "error"}
                          />
                          <ListItemText
                            className="mt-0"
                            onClick={() => setOpenSongDrawer({ song: s, state: true })}
                            primary={<span className="text-sm">{s.title || s.song}</span>}
                            secondary={<span className="text-xs">{s.label}</span>}
                            // onClick={() =>
                            //   setIsModalOpen({ song: s, status: true })
                            // }
                          />
                        </div>

                        <IconButton
                          color="primary"
                          disabled={!s.lyrics?.verse && !s.lyrics?.pre_chorus && !s.lyrics?.chorus}
                          onClick={() => handleExpandClick(s, "Lyrics")}
                          sx={{ mr: 1 }}
                        >
                          <LyricsTwoTone fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleExpandClick(s, "Chords")}
                          disabled={!s.chords?.verse && !s.chords?.pre_chorus && !s.chords?.chorus}
                          sx={{ mr: 1 }}
                        >
                          <MusicNote fontSize="small" />
                        </IconButton>

                        <IconButton
                          color="warning"
                          onClick={() => setEditSong({ song: s, status: true })}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        {/* <div className="px-1 flex flex-col justify-center items-center gap-1">
                          <YouTube
                            fontSize="small"
                            className="w-[16x] h-[16px]"
                            color={!s?.media?.youtube ? "disabled" : "error"}
                          />
                          <img
														src={SPOTIFY_LOGO}
														alt=""
														className={`w-[16px] ${
															!s?.media?.spotify ? "grayscale opacity-30" : ""
														}`}
													/>
                        </div> */}
                      </ListItem>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          </List>
        </CardContent>

        {!showPinned && (
          <Suspense>
            <Actions lineup={lineup} showChords={setShowChords} />
          </Suspense>
        )}
      </Card>
    </>
  );
};

export default LineupItem;
