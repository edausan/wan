import { IconButton, CardActions } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  ShareOutlined,
  FavoriteBorder,
  Favorite,
  OpenInNewTwoTone,
  MusicNoteRounded,
} from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import { FirebaseApp } from "@/Firebase";
import { GetAllLineups, HeartLineup } from "@/Firebase/songsApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Actions = ({ lineup, showChords }) => {
  const history = useHistory();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  const params = useParams();

  const lineupQuery = useQuery({ queryKey: ["lineups"], queryFn: GetAllLineups });
  const mutatedLineup = useMutation({ mutationKey: "heart-lineup", mutationFn: HeartLineup });

  const handleHeart = async () => {
    const idx = lineup?.heart?.findIndex((h) => h === user.uid);
    if (idx === -1 || idx === undefined) {
      try {
        mutatedLineup.mutate({
          lineupId: lineup.id,
          userIds: [...lineup?.heart, user.uid],
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (mutatedLineup.isSuccess && !mutatedLineup.isLoading) {
      lineupQuery.refetch();
    }
  }, [mutatedLineup.isSuccess, mutatedLineup.isLoading, lineupQuery]);

  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={handleHeart}>
        {lineup?.heart?.findIndex((h) => h === user.uid) >= 0 ? (
          <Favorite color="error" />
        ) : (
          <FavoriteBorder onClick={handleHeart} />
        )}{" "}
      </IconButton>
      <small style={{ marginLeft: 6, fontSize: 14 }}>{lineup?.heart?.length}</small>
      <a
        href={`https://m.me/j/Aba8ddZutv5MvPbi/`}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => {
          navigator.clipboard.writeText(`https://wan-belleview.web.app/lineup/${lineup.id}`);
        }}
        className="ml-2"
      >
        <IconButton aria-label="share">
          <ShareOutlined fontSize="small" />
        </IconButton>
      </a>

      <div className="flex flex-row gap-1 ml-auto">
        <IconButton onClick={() => showChords(true)}>
          <MusicNoteRounded />
        </IconButton>
        {!params?.id && (
          <IconButton
            aria-label="view"
            onClick={() => history.push(`/lineup/${lineup.id}`)}
            name="View Lineup"
          >
            <OpenInNewTwoTone fontSize="small" />
          </IconButton>
        )}
      </div>
    </CardActions>
  );
};

export default Actions;
