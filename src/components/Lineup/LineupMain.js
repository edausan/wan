import React, { useState, useContext, useEffect } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import {
  Edit,
  Add,
  Save,
  ClearAll,
  Cancel,
  Settings,
} from '@mui/icons-material';
import NewLineup from './NewLineup';
import { AppCtx } from './../../App';
import LineupItem from './LineupItem';
import { Link, useLocation } from 'react-router-dom';
import { RealtimeLineups } from '../../Firebase/songsApi';

const Lineup = () => {
  const { currentUser, setLineups, scrollToTop } = useContext(AppCtx);
  const { data } = RealtimeLineups();
  const location = useLocation();
  const [lineups, setLineup] = useState([]);

  useEffect(() => {
    scrollToTop();
    setLineups(data);
    setLineup(data);
  }, [data]);

  const actions = [
    { icon: <Cancel />, name: 'Cancel', action: () => {} },
    { icon: <ClearAll />, name: 'Clear', action: () => {} },
    { icon: <Save />, name: 'Save', action: () => {} },
  ];

  const sorted = lineups.sort(
    (a, b) => new Date(b.date_created) - new Date(a.date_created)
  );

  console.log({ sorted });

  return (
    <section style={{ paddingBottom: 100 }}>
      {lineups
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .map((lineup) => {
          return <LineupItem key={lineup.id} lineup={lineup} />;
        })}

      {(currentUser?.user_metadata?.ministry === 'VIA' ||
        currentUser?.user?.email === 'edausan15@gmail.com') && (
        <Link to='/lineup/new'>
          <SpeedDial
            hidden={location.pathname === '/lineup/new'}
            ariaLabel='SpeedDial basic example'
            sx={{ position: 'fixed', bottom: 66, right: 16 }}
            icon={<SpeedDialIcon openIcon={<Add />} />}
          />
        </Link>
      )}
    </section>
  );
};

export default Lineup;
