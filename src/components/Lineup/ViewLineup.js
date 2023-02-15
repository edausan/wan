/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppCtx } from "../../App";
import { GetSingleLineup } from "../../Firebase/songsApi";
import LineupItem from "./LineupItem";
import { useQuery } from "react-query";

const ViewLineup = () => {
	const params = useParams();
	const id = params.id;

	const { scrollToTop } = useContext(AppCtx);
	const [lineup, setLineup] = useState(null);

	useEffect(() => {
		scrollToTop();
	}, []);

	const handleGetLineup = async () => {
		const lineup = await GetSingleLineup({ id });
		return lineup;
	};

	const { data, isLoading } = useQuery("single-lineup", handleGetLineup);

	useEffect(() => {
		data && !isLoading && setLineup(data);
	}, [data]);

	return <div>{lineup && <LineupItem lineup={lineup} isSongsExpanded />}</div>;
};

export default React.memo(ViewLineup);
