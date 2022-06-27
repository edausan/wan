import {
  AccountCircle,
  Assignment,
  Brightness4,
  Brightness7,
  Home,
  Settings,
  SpeakerNotes,
  Topic,
} from '@mui/icons-material';
import {
  BottomNavigation,
  Paper,
  BottomNavigationAction,
  Icon,
  Grid,
  useTheme,
  IconButton,
  Button,
} from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { AppCtx } from './../App';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../Firebase';

const Navigation = () => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const location = useLocation();
  const { pathname } = location;
  const theme = useTheme();
  const { setMode, mode, currentUser } = useContext(AppCtx);
  const [page, setPage] = useState('Home');

  useEffect(() => {
    // console.log({ location });
  }, [location]);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        width: '100%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        boxShadow: '0 -5px 10px rgba(0,0,0,.1)',
      }}
    >
      <Grid
        container
        sx={{
          background: theme.palette.mode,
        }}
        justifyContent='center'
      >
        <Grid item flex={1}>
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
            <Home />
          </Link>
        </Grid>
        <Grid item flex={1}>
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
            <Assignment />
          </Link>
        </Grid>
        <Grid item flex={1}>
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
            <SpeakerNotes />
          </Link>
        </Grid>
        {/* <Grid item flex={1}>
          <Link
            to='/settings'
            style={{
              display: 'flex',
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
              transition: theme.transitions.easing.easeInOut,
              color:
                pathname === '/settings'
                  ? theme.palette.primary[theme.palette.mode]
                  : 'inherit',
            }}
          >
            <Settings />
          </Link>
        </Grid> */}
        <Grid item flex={1}>
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
            <AccountCircle />
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Navigation;
