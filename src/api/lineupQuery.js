import { useQuery } from "@tanstack/react-query";
import { GetAllLineups, GetLineup } from "../Firebase/lineupApi";
import { time } from "../Firebase";

const LineupQuery = (uid = "") => {
  const lineupsQuery = useQuery({
    queryKey: ["lineups"],
    queryFn: GetAllLineups,
    staleTime: 0,
    cacheTime: time,
  });

  const userLineupQuery = useQuery({
    queryKey: ["userLineups"],
    queryFn: () => GetLineup({ id: uid }),
    staleTime: 0,
    cacheTime: time,
  });

  return {
    lineupsQuery,
    userLineupQuery,
  };
};

export default LineupQuery;
