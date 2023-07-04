import { Avatar, CardHeader, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetAllLineups, UpdateLineupPinned } from "@/Firebase/songsApi";
import { blue, pink } from "@components/Pages/Auth/Login";
import moment from "moment";
import { MoreVert, PushPin, PushPinOutlined } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import { ADMIN } from "@/data";
import { useMutation, useQuery } from "react-query";

const Header = ({ showPinned, lineup, setOpenDrawer }) => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  const params = useParams();
  const [pinned, setPinned] = useState(lineup?.pinned);

  const lineupQuery = useQuery("lineups", GetAllLineups);
  const mutatedLineup = useMutation(UpdateLineupPinned);

  const handlePinned = async () => {
    try {
      mutatedLineup.mutate({
        lineup: {
          ...lineup,
          pinned,
        },
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (mutatedLineup.isSuccess) {
      lineupQuery.refetch();
    }
  }, [lineupQuery, mutatedLineup.isSuccess]);

  useEffect(() => {
    if (pinned !== lineup?.pinned) {
      handlePinned();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineup?.pinned, pinned]);

  return useMemo(() => {
    const isPinned = pinned || lineup?.pinned;
    return (
      <CardHeader
        sx={{ pb: 0 }}
        className={`transition-all duration-300 ease-in-out ${
          showPinned ? "opacity-0 translate-y-[-100%]" : "opacity-1 translate-y-0"
        } `}
        avatar={
          // <Link
          // 	to={`/profile/${lineup?.worship_leader?.uid}`}
          // 	style={{ textDecoration: "none", color: "inherit" }}>
          <div>
            <Avatar
              sx={{
                background: `linear-gradient(45deg, ${pink}, ${blue})`,
                color: "#fff",
                opacity: 0,
                width: isPinned ? 30 : 40,
                height: isPinned ? 30 : 40,
              }}
              className=""
              aria-label="profile-photo"
              src={lineup?.worship_leader?.photoURL}
            >
              {lineup?.worship_leader?.displayName.split("")[0]}
            </Avatar>
          </div>
          // </Link>
        }
        action={
          <>
            {!params?.id && (
              <div>
                <IconButton aria-label="pinned" onClick={() => setPinned((prev) => !prev)}>
                  {isPinned ? (
                    <PushPin fontSize="small" color="primary" />
                  ) : (
                    <PushPinOutlined fontSize="small" />
                  )}
                </IconButton>

                {(user.uid === lineup.worship_leader?.uid || user.uid === ADMIN) && (
                  <IconButton aria-label="settings" onClick={() => setOpenDrawer(true)}>
                    <MoreVert />
                  </IconButton>
                )}
              </div>
            )}
          </>
        }
        title={
          <Link
            // to={`/profile/${lineup.worship_leader?.uid}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {lineup.worship_leader?.displayName}
          </Link>
        }
        subheader={
          <small>
            {moment(lineup.date_created).startOf("minute").fromNow()}{" "}
            {lineup.date_updated && (
              <span style={{ color: "#777" }}>
                • Edited: {moment(lineup.date_updated).startOf("minute").fromNow()}
              </span>
            )}
          </small>
        }
      />
    );
  }, [
    lineup.date_created,
    lineup.date_updated,
    lineup?.pinned,
    lineup.worship_leader?.displayName,
    lineup.worship_leader?.photoURL,
    lineup.worship_leader?.uid,
    params?.id,
    pinned,
    setOpenDrawer,
    showPinned,
    user.uid,
  ]);
};

export default Header;
