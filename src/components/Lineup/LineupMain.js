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
import { ADMIN } from '../../data';

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

  const handleGetSong = () => {};

  const actions = [
    { icon: <Cancel />, name: 'Cancel', action: () => {} },
    { icon: <ClearAll />, name: 'Clear', action: () => {} },
    { icon: <Save />, name: 'Save', action: () => {} },
  ];

  const sorted = lineups.sort(
    (a, b) => new Date(b.date_created) - new Date(a.date_created)
  );

  return (
    <section style={{ paddingBottom: 100 }}>
      {lineups
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .map((lineup) => {
          return <LineupItem key={lineup.id} lineup={lineup} />;
        })}

      {(currentUser?.user_metadata?.ministry === 'VIA' ||
        currentUser?.user?.uid === ADMIN) && (
        <Link to='/lineup/new'>
          <button className='fixed bottom-[86px] right-[26px] w-[40px] h-[40px]  bg-white text-black rounded-full z-50'>
            <span className='motion-safe:animate-ping absolute top-0 left-0 w-[100%] h-[100%] bg-white text-black rounded-full z-40 opacity-30'></span>
            <SpeedDialIcon className='relative z-50' openIcon={<Add />} />
          </button>
        </Link>
      )}
    </section>
  );
};

export default Lineup;
