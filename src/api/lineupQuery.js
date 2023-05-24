import { useQuery } from "react-query";
import { GetAllLineups, GetLineup } from "../Firebase/lineupApi";

const LineupQuery = (uid = "") => {
	const lineupsQuery = useQuery("lineups", GetAllLineups, {
		staleTime: 0,
		cacheTime: 60 * 60 * 100,
	});

	const userLineupQuery = useQuery(
		"userLineups",
		() => GetLineup({ id: uid }),
		{
			staleTime: 0,
			cacheTime: 60 * 60 * 100,
		}
	);

	return {
		lineupsQuery,
		userLineupQuery,
	};
};

export default LineupQuery;
