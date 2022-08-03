import {
  LibraryMusicOutlined,
  HomeOutlined,
  AssignmentOutlined,
  SpeakerNotesOutlined,
} from '@mui/icons-material';
import { Paper, Grid, useTheme, Avatar } from '@mui/material';
import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../Firebase';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/appSlice';
import { AppCtx } from '../App';

const Navigation = ({ setPageIndex }) => {
  // const { setPageIndex } = useContext(AppCtx);
  const dispatch = useDispatch();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const location = useLocation();
  const { pathname } = location;
  const theme = useTheme();

  useEffect(() => {
    // console.log({ location });
  }, [location]);

  const handleSetPage = (page) => {
    setPageIndex(page);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        width: '100%',
        transform: 'translateX(-50%)',
        zIndex: 1002,
        boxShadow: '0 -5px 10px rgba(0,0,0,.1)',
        borderRadius: 0,
      }}
    >
      <Grid
        container
        sx={{
          background: theme.palette.mode,
        }}
        justifyContent='center'
      >
        <Grid item flex={1} onClick={() => handleSetPage(0)}>
          <Link
            to='/'
            style={{
              display: 'flex',
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center',
              transition: theme.transitions.easing.easeInOut,
              color:
                pathname === '/'
                  ? theme.palette.primary[theme.palette.mode]
                  : 'inherit',
            }}
          >
            <HomeOutlined />
          </Link>
        </Grid>
        <Grid item flex={1} onClick={() => handleSetPage(1)}>
          <Link
            to='/assignments'
            style={{
              display: 'flex',
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transition: theme.transitions.easing.easeInOut,
              color:
                pathname === '/assignments'
                  ? theme.palette.primary[theme.palette.mode]
                  : 'inherit',
            }}
          >
            <AssignmentOutlined />
          </Link>
        </Grid>
        <Grid item flex={1} onClick={() => handleSetPage(2)}>
          <Link
            to='/lineup'
            style={{
              display: 'flex',
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transition: theme.transitions.easing.easeInOut,
              color:
                pathname === '/lineup'
                  ? theme.palette.primary[theme.palette.mode]
                  : 'inherit',
            }}
          >
            <SpeakerNotesOutlined />
          </Link>
        </Grid>
        <Grid item flex={1} onClick={() => handleSetPage(3)}>
          <Link
            to='/songs'
            style={{
              display: 'flex',
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transition: theme.transitions.easing.easeInOut,
              color:
                pathname === '/songs'
                  ? theme.palette.primary[theme.palette.mode]
                  : 'inherit',
            }}
          >
            <LibraryMusicOutlined />
          </Link>
        </Grid>
        <Grid item flex={1} onClick={() => handleSetPage(4)}>
          <Link
            to={`/profile/${user.uid}`}
            style={{
              display: 'flex',
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transition: theme.transitions.easing.easeInOut,
              color:
                pathname === `/profile/${user.uid}`
                  ? theme.palette.primary[theme.palette.mode]
                  : 'inherit',
            }}
          >
            {/* <AccountCircleTwoTone /> */}
            <Avatar
              src={user.photoURL}
              alt={user.displayName}
              sx={{ width: 26, height: 26 }}
            />
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Navigation;
