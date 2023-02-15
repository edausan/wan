import { IconButton, CardActions } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
	ShareOutlined,
	FavoriteBorder,
	Favorite,
	OpenInNewTwoTone,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { FirebaseApp } from "../../../Firebase";
import { GetAllLineups, HeartLineup } from "../../../Firebase/songsApi";
import { useQuery } from "react-query";

const Actions = ({ lineup }) => {
	const history = useHistory();
	const auth = getAuth(FirebaseApp);
	const user = auth.currentUser;

	const lineupQuery = useQuery("lineups", GetAllLineups);

	const handleHeart = async () => {
		const idx = lineup?.heart?.findIndex((h) => h === user.uid);
		if (idx === -1 || idx === undefined) {
			try {
				const res = await HeartLineup({
					lineupId: lineup.id,
					userIds: [...lineup?.heart, user.uid],
				});

				if (res.updated) {
					lineupQuery.refetch();
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<CardActions disableSpacing>
			<IconButton aria-label="add to favorites" onClick={handleHeart}>
				{lineup?.heart?.findIndex((h) => h === user.uid) >= 0 ? (
					<Favorite color="error" />
				) : (
					<FavoriteBorder onClick={handleHeart} />
				)}{" "}
			</IconButton>
			<small style={{ marginLeft: 6, fontSize: 14 }}>
				{lineup?.heart?.length}
			</small>
			<a
				href={`https://m.me/j/Aba8ddZutv5MvPbi/`}
				style={{ textDecoration: "none", color: "inherit" }}
				onClick={() => {
					navigator.clipboard.writeText(
						`https://wan-belleview.web.app/lineup/${lineup.id}`
					);
				}}
				className="ml-2">
				<IconButton aria-label="share">
					<ShareOutlined fontSize="small" />
				</IconButton>
			</a>

			<IconButton
				aria-label="view"
				onClick={() => history.push(`/lineup/${lineup.id}`)}
				name="View Lineup"
				sx={{ marginLeft: "auto" }}>
				<OpenInNewTwoTone fontSize="small" />
			</IconButton>
		</CardActions>
	);
};

export default Actions;
