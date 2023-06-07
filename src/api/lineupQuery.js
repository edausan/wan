import { useQuery } from "react-query";
import { GetAllLineups, GetLineup } from "../Firebase/lineupApi";
import { time } from "../Firebase";

const LineupQuery = (uid = "") => {
  const lineupsQuery = useQuery("lineups", GetAllLineups, {
    staleTime: 0,
    cacheTime: time,
  });

  const userLineupQuery = useQuery("userLineups", () => GetLineup({ id: uid }), {
    staleTime: 0,
    cacheTime: time,
  });

  return {
    lineupsQuery,
    userLineupQuery,
  };
};

export default LineupQuery;
