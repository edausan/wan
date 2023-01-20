/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, Suspense, useState } from "react";
import { Divider, SpeedDialIcon } from "@mui/material";
import { Add, PushPin } from "@mui/icons-material";
import { AppCtx } from "./../../App";
// import LineupItem from './LineupItem';
import { Link } from "react-router-dom";
import { ADMIN } from "../../data";
import { useSelector } from "react-redux";
import { selectLineups } from "../../redux/slices/lineupsSlice";
import { selectUsers } from "./../../redux/slices/usersSlice";
import LineupLoading from "./LineupLoading";
import { RealtimeLineups } from "../../Firebase/songsApi";

const LineupItem = React.lazy(() => import("./LineupItem"));

const Lineup = () => {
  // const lineups = useSelector(selectLineups);
  const { data: lineups } = RealtimeLineups();
  const { users, currentUser } = useSelector(selectUsers);
  const { scrollToTop } = useContext(AppCtx);
  const [pinnedLineup, setPinnedLineup] = useState(null);
  const [showPinned, setShowPinned] = useState(false);
  const [lineupData, setLineupData] = useState([]);
  // const [lineups, setLineup] = useState([]);

  useEffect(() => {
    scrollToTop();
    // setLineups(data);
    // setLineup(data);
  }, []);

  useEffect(() => {
    if (lineups.length > 0) {
      setLineupData(lineups);
      const pinned = lineups?.filter((lineup) => lineup?.pinned);
      lineups.length > 0 && setPinnedLineup(pinned);
    }
  }, [lineups, currentUser]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e) => {
    const scrollY = e?.path[1]?.scrollY;
    const profile = document.querySelector("#pinned-lineup-item")?.clientHeight;
    if (scrollY > profile) {
      setShowPinned(true);
    } else {
      setShowPinned(false);
    }
  };

  return (
    <section className="p-3 max-w-[680px] mx-auto" id="lineup-main">
      {pinnedLineup?.length > 0 && (
        <>
          <div className="mb-2 flex flex-row gap-2 items-center uppercase text-xs font-bold text-gray-500">
            <PushPin className="text-sm" /> Pinned Lineup
          </div>

          {pinnedLineup?.map((pinned) => (
            <>
              <Suspense key={pinned?.id} fallback={<LineupLoading />}>
                <LineupItem lineup={pinned} showPinned={showPinned} />
              </Suspense>
            </>
          ))}
          <Divider className="mb-4" />
        </>
      )}

      {lineupData
        .slice()
        .map((l) => ({
          ...l,
          worship_leader: users.filter(
            (u) => u.uid === l.worship_leader.uid
          )[0],
        }))
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .filter((lineup) => !lineup.pinned)
        .map((lineup) => {
          return (
            <Suspense key={lineup.id} fallback={<LineupLoading />}>
              <LineupItem lineup={lineup} />
            </Suspense>
          );
        })}

      {(currentUser?.user_metadata?.ministry === "VIA" ||
        currentUser?.user?.uid === ADMIN) && (
        <Link to="/lineup/new">
          <button className="fixed bottom-[86px] right-[26px] w-[50px] h-[50px]  bg-white text-black shadow-lg rounded-full z-50">
            <span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30"></span>
            <SpeedDialIcon className="relative z-50" openIcon={<Add />} />
          </button>
        </Link>
      )}
    </section>
  );
};

export default React.memo(Lineup);
