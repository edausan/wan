/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppCtx } from "@/App";
import { GetAllLineups, GetSingleLineup } from "@/Firebase/songsApi";
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

  const { data, isFetching } = useQuery("lineups", GetAllLineups);

  useEffect(() => {
    if (data.length > 0 && !isFetching) {
      const lineup = data.filter((d) => d.id === id)[0];
      setLineup(lineup);
    }
  }, [data, isFetching]);

  return <div>{lineup && <LineupItem lineup={lineup} isSongsExpanded />}</div>;
};

export default React.memo(ViewLineup);
