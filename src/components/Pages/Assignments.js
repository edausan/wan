import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Card,
  Typography,
  Fab,
  SpeedDial,
  SpeedDialIcon,
} from '@mui/material';
import SetAssignment from './Assignment/SetAssignment';
import { Add, AddCircleOutlineTwoTone } from '@mui/icons-material';
import { AppCtx } from './../../App';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../Firebase';
import { ADMIN, ASSIGNER } from '../../data';
import { GetRealtimeAssignments } from '../../Firebase/assignmentApi';

const Assignments = () => {
  const { scrollToTop } = useContext(AppCtx);
  const { data } = GetRealtimeAssignments();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    scrollToTop();
    setAssignments(data);
  }, [data]);

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ paddingBottom: 50 }}
    >
      {assignments
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .map((a) => {
          return <SetAssignment assignment={a} isViewing={true} />;
        })}

      {(user.uid === ASSIGNER || user.uid === ADMIN) && (
        <Link
          to={`/assignments/new`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <button className='fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-white text-black rounded-full z-50'>
            <span className='motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30'></span>
            <SpeedDialIcon className='relative z-50' openIcon={<Add />} />
          </button>
        </Link>
      )}
    </Grid>
  );
};

export default Assignments;
