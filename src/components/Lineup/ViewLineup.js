/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppCtx } from "../../App";
import { GetSingleLineup } from "../../Firebase/songsApi";
import LineupItem from "./LineupItem";

const ViewLineup = () => {
	const params = useParams();
	const { scrollToTop } = useContext(AppCtx);
	const [lineup, setLineup] = useState(null);

	useEffect(() => {
		scrollToTop();
		handleGetLineup();
	}, []);

	const handleGetLineup = async () => {
		const id = params.id;
		const lineup = await GetSingleLineup({ id });
		setLineup(lineup);
	};

	return <div>{lineup && <LineupItem lineup={lineup} isSongsExpanded />}</div>;
};

export default React.memo(ViewLineup);
