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

const Lineup = () => {
  const location = useLocation();
  const [lineups, setLineups] = useState([]);
  const { index, setIndex } = useContext(AppCtx);
  const [open, setOpen] = useState({ id: '', status: false });

  const actions = [
    { icon: <Cancel />, name: 'Cancel', action: () => setIndex(0) },
    { icon: <ClearAll />, name: 'Clear', action: () => {} },
    { icon: <Save />, name: 'Save', action: () => {} },
  ];

  return (
    <>
      {/* <SwipeableViews index={index} onChangeIndex={(index) => setIndex(index)}>
        <div>Feed</div>
        {index === 1 ? <NewLineup open={open} setOpen={setOpen} /> : <div />}
      </SwipeableViews> */}

      {[1, 2, 3, 4].map((lineup) => {
        return <LineupItem lineup={lineup} />;
      })}

      <Link to='/lineup/new'>
        <SpeedDial
          hidden={location.pathname === '/lineup/new'}
          ariaLabel='SpeedDial basic example'
          sx={{ position: 'fixed', bottom: 66, right: 16 }}
          icon={<SpeedDialIcon openIcon={<Add />} />}
          onClick={() => setIndex(1)}
        />
      </Link>
    </>
  );
};

export default Lineup;
