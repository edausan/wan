/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, Suspense, useState } from "react";
import { Divider, SpeedDialIcon } from "@mui/material";
import { Add, PushPin } from "@mui/icons-material";
import { AppCtx } from "./../../App";
import { Link } from "react-router-dom";
import { ADMIN } from "../../data";
import { useSelector } from "react-redux";
import { selectUsers } from "./../../redux/slices/usersSlice";
import LineupLoading from "./LineupLoading";
import { GetAllLineups, GetAllSongs } from "../../Firebase/songsApi";
import { useQuery } from "react-query";
import Fetching from "../CustomComponents/Fetching";
import { GetAllUsers } from "../../Firebase/authApi";

const LineupItem = React.lazy(() => import("./LineupItem"));

const Lineup = () => {
	// const { data: lineups } = RealtimeLineups();
	const { currentUser } = useSelector(selectUsers);
	const { scrollToTop } = useContext(AppCtx);
	const [pinnedLineup, setPinnedLineup] = useState(null);
	const [showPinned, setShowPinned] = useState(false);
	const [lineupData, setLineupData] = useState([]);

	const query = useQuery("lineups", GetAllLineups, {
		staleTime: 0,
		cacheTime: 60 * 60 * 100,
	});

	const usersQuery = useQuery("users", GetAllUsers, {
		staleTime: 0,
		cacheTime: 60 * 60 * 1000,
	});

	const songsQuery = useQuery("songs", GetAllSongs, {
		staleTime: 0,
		cacheTime: 60 * 60 * 1000,
	});

	const { data, isFetching, isFetched } = query;

	useEffect(() => {
		data?.length > 0 && isFetched && setLineupData(data);
	}, [data, isFetching, isFetched]);

	useEffect(() => {
		scrollToTop();
	}, []);

	useEffect(() => {
		lineupData.length > 0 && setPinned();
	}, [lineupData, isFetching]);

	const setPinned = () => {
		const pinned = lineupData?.filter((lineup) => lineup?.pinned);
		lineupData?.length > 0 && setPinnedLineup(pinned);
	};

	// useEffect(() => {
	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, []);

	const handleScroll = (e) => {
		if (e) {
			const scrollY = e?.path[1]?.scrollY;
			const profile = document.querySelector(
				"#pinned-lineup-item"
			)?.clientHeight;
			if (scrollY > profile) {
				setShowPinned(true);
			} else {
				setShowPinned(false);
			}
		}
	};

	return (
		<section className="p-3 max-w-[680px] mx-auto" id="lineup-main">
			<Fetching close={!isFetching} label="Lineups" />

			{pinnedLineup?.length > 0 && (
				<>
					<div className="mb-2 flex flex-row gap-2 items-center uppercase text-xs font-bold text-gray-500">
						<PushPin className="text-sm" /> Pinned Lineup
						{pinnedLineup.length > 1 ? "s" : ""}
					</div>
					<section className="sticky top-0 z-10">
						{pinnedLineup?.map((pinned, idx) => (
							<>
								<Suspense
									key={`${pinned?.id}~${pinned?.date_created}`}
									fallback={<LineupLoading />}>
									<LineupItem
										lineup={pinned}
										showPinned={showPinned}
										pinnedLineup={pinnedLineup}
										idx={idx}
									/>
								</Suspense>
							</>
						))}
						<Divider className="mb-4" />
					</section>
				</>
			)}

			{lineupData
				?.slice()
				?.map((l) => ({
					...l,
					worship_leader: usersQuery.data?.filter(
						(u) => u.uid === l.worship_leader.uid
					)[0],
				}))
				.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
				.filter((lineup) => !lineup.pinned)
				.map((lineup) => {
					return (
						<Suspense
							key={`${lineup?.id}~${lineup?.date_created}`}
							fallback={<LineupLoading />}>
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
