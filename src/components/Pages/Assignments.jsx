/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { Grid, SpeedDialIcon } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppCtx } from "@/App";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import { ADMIN, ASSIGNER } from "@/data";
import AssignmentLoading from "./Assignment/AssignmentLoading";
import { GetAllAssignments, GetRealtimeAssignments } from "@/Firebase/assignmentApi";
import { useQuery } from "@tanstack/react-query";
import Fetching from "../CustomComponents/Fetching";
import { GetAllUsers } from "@/Firebase/authApi";

const SetAssignment = lazy(() => import("./Assignment/SetAssignment"));

const Assignments = () => {
  const { scrollToTop } = useContext(AppCtx);
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  // const { data: assign } = GetRealtimeAssignments();

  // const { users } = useSelector(selectUsers);

  const usersQuery = useQuery({ queryKey: ["users"], queryFn: GetAllUsers });

  const [assignments, setAssignments] = useState([]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["assignments"],
    queryFn: GetAllAssignments,
    staleTime: 10000,
    gcTime: 60 * 60 * 100,
  });

  useEffect(() => {
    scrollToTop();
    if (data && data?.length > 0) {
      const altered = data?.map((a) => {
        return {
          ...a,
          created_by: usersQuery.data?.filter((u) => u.uid === a.created_by.uid)[0],
        };
      });
      setAssignments(altered);
    }
  }, [data]);

  return (
    <>
      {/* <LoadingScreen data={assignments} /> */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="pb-[50px] p-3 max-w-[680px] mx-auto"
      >
        <Fetching close={!isFetching} label="Assignments" />

        {assignments
          .slice()
          .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
          .map((a) => {
            return (
              <Suspense key={a?.id} fallback={<AssignmentLoading />}>
                <SetAssignment assignment={a} isViewing={true} />
              </Suspense>
            );
          })}

        {(user.uid === ASSIGNER || user.email === ADMIN) && (
          <Link to={`/assignments/new`} style={{ textDecoration: "none", color: "inherit" }}>
            <button className="fixed bottom-[86px] right-[26px] w-[50px] h-[50px]  bg-white text-black shadow-lg rounded-full z-50">
              <span className="motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30"></span>
              <SpeedDialIcon className="relative z-50" openIcon={<Add />} />
            </button>
          </Link>
        )}
      </Grid>
    </>
  );
};

export default React.memo(Assignments);
