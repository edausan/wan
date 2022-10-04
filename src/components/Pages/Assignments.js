/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { Grid, SpeedDialIcon } from '@mui/material';
// import SetAssignment from './Assignment/SetAssignment';
import { Add } from '@mui/icons-material';
import { AppCtx } from './../../App';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../Firebase';
import { ADMIN, ASSIGNER } from '../../data';
import { useSelector } from 'react-redux';
import { selectAssignments } from './../../redux/slices/assignmentsSlice';
import { selectUsers } from './../../redux/slices/usersSlice';
import LoadingScreen from '../CustomComponents/LoadingScreen';
import AssignmentLoading from './Assignment/AssignmentLoading';

const SetAssignment = lazy(() => import('./Assignment/SetAssignment'));

const Assignments = () => {
  const { scrollToTop } = useContext(AppCtx);
  // const { data } = GetRealtimeAssignments();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  const assign = useSelector(selectAssignments);
  const { users } = useSelector(selectUsers);

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    console.log({ assign });
  }, [assign]);

  useEffect(() => {
    scrollToTop();
    if (assign.length > 0) {
      const altered = assign.map((a) => {
        return {
          ...a,
          created_by: users.filter((u) => u.uid === a.created_by.uid)[0],
        };
      });
      setAssignments(altered);
    }
  }, [assign]);

  return (
    <>
      {/* <LoadingScreen data={assignments} /> */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="pb-[50px] pt-3"
      >
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

        {(user.uid === ASSIGNER || user.uid === ADMIN) && (
          <Link
            to={`/assignments/new`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <button className="fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-white text-black rounded-full z-50">
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
