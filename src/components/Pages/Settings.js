import {
  Brightness4,
  Brightness7,
  ChevronRight,
  LogoutOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AppCtx } from '../../App';
import { SignOut } from '../../Firebase/authApi';
import BG from '../../assets/bg.jpg';
import Profile from './User/Profile';

const Settings = () => {
  const history = useHistory();
  const theme = useTheme();
  const { setMode, mode, currentUser, scrollToTop } = useContext(AppCtx);
  const [toggleMode, setToggleMode] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section style={{ paddingBottom: 100 }}>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={<ListSubheader>Settings</ListSubheader>}
      >
        <ListItem onClick={() => setMode(!mode)}>
          <ListItemIcon>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </ListItemIcon>
          <ListItemText
            id='dark-mode'
            primary='Dark Mode'
            primaryTypographyProps={{ color: theme.palette.text.primary }}
          />
          <Switch
            edge='end'
            onChange={() => setMode(!mode)}
            checked={!mode}
            inputProps={{
              'aria-labelledby': 'dark-mode',
            }}
          />
        </ListItem>
        <ListItem
          onClick={() => {
            history.push('/');
            SignOut();
          }}
        >
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText
            id='switch-list-label-bluetooth'
            primary='Logout'
            primaryTypographyProps={{ color: theme.palette.text.primary }}
          />
          <IconButton
            onClick={() => {
              history.push('/');
              SignOut();
            }}
          >
            <ChevronRight />
          </IconButton>
        </ListItem>
      </List>
    </section>
  );
};

export default Settings;
