import React, { useState } from 'react';
import {
  Add,
  Check,
  CheckCircleOutline,
  CheckCircleOutlineTwoTone,
  CheckCircleTwoTone,
  ContentCopy,
  Delete,
  Edit,
  Event,
  ExpandMore,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  FormatQuote,
  MoreVert,
  MusicNote,
  Note,
  NoteAlt,
  OpenInNewTwoTone,
  PlayArrow,
  Share,
  TextSnippet,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  SwipeableDrawer,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { red } from '@mui/material/colors';
import BG from '../../assets/bg.jpg';
import WALL_SD from '../../assets/wallpaper-sd.jpg';
import { ADMIN, VIA } from '../../data';
import moment from 'moment';
import { pink, blue } from '../Pages/Auth/Login';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useHistory, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../../Firebase';
import { DeleteLineup, GetSong, HeartLineup } from '../../Firebase/songsApi';
import { useEffect } from 'react';
import { GetUserMetadata } from '../../Firebase/authApi';
import SongModal from './SongModal';

const LineupItem = ({ lineup, isBordered, isLast, isSongsExpanded }) => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const history = useHistory();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [drawerData, setDrawerData] = useState({ song: null, id: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [lineupSongs, setLineupSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({ song: null, status: false });

  console.log({ lineupSongs });

  useEffect(() => {
    lineup.songs.length > 0 && lineup.songs[0].title && GetSongsData();
  }, [lineup.songs]);

  const GetSongsData = async () => {
    const lineup_songs = [];
    lineup.songs.map(async (song) => {
      const songs_data = await GetSong({ song });
      lineup_songs.push({ ...songs_data, label: song.label });
    });

    console.log({ lineup_songs });
    setLineupSongs(lineup_songs);
  };

  useEffect(() => {
    console.log({ lineupSongs });
  }, [lineupSongs]);

  const handleExpandClick = (song, id) => {
    setDrawerData({ song, id });
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    history.push(`/lineup/edit/${lineup.id}`);
  };

  const handleDelete = async () => {
    DeleteLineup({ id: lineup.id });
  };

  const handleHeart = () => {
    const idx = lineup?.heart?.findIndex((h) => h === user.uid);
    console.log('HEARt', { idx, lineup });
    if (idx === -1 || idx === undefined) {
      HeartLineup({
        lineupId: lineup.id,
        userIds: [...lineup?.heart, user.uid],
      });
    }
  };

  const handleCopy = () => {
    const verse = document.querySelector('#verse');
    const pre_chorus = document.querySelector('#pre-chorus');
    const chorus = document.querySelector('#chorus');

    navigator.clipboard.writeText(
      `${verse ? `Verse:\r\n${verse.innerHTML}\r\n\r\n` : ''}${
        pre_chorus ? `Pre-chorus:\r\n${pre_chorus.innerHTML}\r\n\r\n` : ''
      }${chorus ? `Chorus:\r\n${chorus.innerHTML}` : ''}`
    );

    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'about-popper' : undefined;

  const handleClose = () => {};

  useEffect(() => {
    const date = moment(lineup.date).diff(new Date()) < 0;
  }, []);

  console.log({ lineup });

  const lineup_songs = lineup.songs[0].title ? lineupSongs : lineup.songs;

  return (
    <>
      <SongModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        getData={GetSongsData}
      />
      <Card
        sx={{
          maxWidth: '100%',
          mb: isBordered && isLast ? 0 : isBordered ? 1 : 2,
          border: 'none',
          borderRadius: isBordered ? 0 : '',
        }}
        variant={isBordered ? 'outlined' : 'elevation'}
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <CardHeader
            sx={{ pb: 0 }}
            avatar={
              <Link
                to={`/profile/${lineup?.worship_leader?.uid}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Avatar
                  sx={{
                    background: `linear-gradient(45deg, ${pink}, ${blue})`,
                    color: '#fff',
                  }}
                  aria-label='recipe'
                  src={lineup?.worship_leader?.photoURL}
                >
                  {lineup?.worship_leader.displayName.split('')[0]}
                </Avatar>
              </Link>
            }
            action={
              <>
                {(user.uid === lineup.worship_leader?.uid ||
                  user.uid === ADMIN) && (
                  <IconButton
                    aria-label='settings'
                    onClick={(event) =>
                      isOpen
                        ? setAnchorEl(null)
                        : setAnchorEl(event.currentTarget)
                    }
                  >
                    <MoreVert />
                  </IconButton>
                )}
                <PopperUnstyled
                  id={id}
                  open={isOpen}
                  anchorEl={anchorEl}
                  disablePortal
                  keepMounted
                  placement='left-end'
                  style={{ zIndex: 1001 }}
                >
                  <Card
                    variant='outlined'
                    sx={{ boxShadow: 'md', borderRadius: 'sm', p: 0 }}
                  >
                    <List>
                      <ListItem sx={{ py: 0 }}>
                        <Button
                          startIcon={<Edit fontSize='small' />}
                          color='inherit'
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </ListItem>
                      {user.uid === lineup.worship_leader?.uid && (
                        <ListItem sx={{ py: 0 }}>
                          <Button
                            startIcon={<Delete fontSize='small' />}
                            color='inherit'
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </ListItem>
                      )}
                    </List>
                  </Card>
                </PopperUnstyled>
              </>
            }
            title={
              <Link
                to={`/profile/${lineup.worship_leader?.uid}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {lineup.worship_leader?.displayName}
              </Link>
            }
            subheader={
              <small>
                {moment(lineup.date_created).startOf('minute').fromNow()}{' '}
                {lineup.date_updated && (
                  <span style={{ color: '#777' }}>
                    • Edited:{' '}
                    {moment(lineup.date_updated).startOf('minute').fromNow()}
                  </span>
                )}
              </small>
            }
          />
        </ClickAwayListener>

        <CardContent sx={{ py: 0 }}>
          <List sx={{ py: 0, mt: 1 }}>
            <Accordion
              expanded={isExpanded || isSongsExpanded}
              disableGutters
              sx={{ boxShadow: 'none', py: 0, background: 'none' }}
            >
              <AccordionSummary
                sx={{ px: 0 }}
                expandIcon={<ExpandMore />}
                aria-controls='panel1a-content'
                id='panel1a-header'
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon>
                    {moment(lineup.date).diff(new Date()) < 0 ? (
                      <CheckCircleTwoTone color='success' />
                    ) : (
                      <Event
                        fontSize='small'
                        color={
                          moment(lineup.date).diff(new Date()) >= 0
                            ? 'warning'
                            : 'inherit'
                        }
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <small>
                        {lineup?.service} •{' '}
                        <div style={{ color: theme.palette.text.secondary }}>
                          {moment(lineup.date).format('LL')}
                        </div>
                      </small>
                    }
                    // secondary={<small>Lineup Date</small>}
                  />
                </ListItem>
              </AccordionSummary>
              <Divider />
              <AccordionDetails sx={{ px: 0 }}>
                {lineup_songs
                  .filter((s) => s.song || s.title)
                  .map((s) => {
                    return (
                      <ListItem key={s.id}>
                        <ListItemText
                          primary={s.title || s.song}
                          secondary={s.label}
                          onClick={
                            user.uid === ADMIN ||
                            user.uid === lineup.worship_leader?.uid
                              ? () => setIsModalOpen({ song: s, status: true })
                              : () => {}
                          }
                        />
                        <IconButton
                          color='primary'
                          disabled={!s.lyrics?.verse}
                          onClick={() => handleExpandClick(s, 'Lyrics')}
                          sx={{ mr: 1 }}
                        >
                          <TextSnippet fontSize='small' />
                        </IconButton>
                        <IconButton
                          color='secondary'
                          onClick={() => handleExpandClick(s, 'Chords')}
                          disabled={!s.chords}
                          sx={{ mr: 1 }}
                        >
                          <MusicNote fontSize='small' />
                        </IconButton>
                        <IconButton color='error' disabled={!s.media}>
                          <PlayArrow fontSize='small' />
                        </IconButton>
                      </ListItem>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          </List>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites' onClick={handleHeart}>
            {lineup?.heart?.length > 0 ? (
              <Favorite color='error' />
            ) : (
              <FavoriteBorder onClick={handleHeart} />
            )}{' '}
          </IconButton>
          <small style={{ marginLeft: 6, fontSize: 14 }}>
            {lineup?.heart?.length}
          </small>
          <a
            href={`https://m.me/j/Aba8ddZutv5MvPbi/`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={() => {
              navigator.clipboard.writeText(
                `https://wan-belleview.web.app/lineup/${lineup.id}`
              );
            }}
          >
            <IconButton aria-label='share'>
              <Share />
            </IconButton>
          </a>
          {!isSongsExpanded && (
            <IconButton
              aria-label='view'
              onClick={() => history.push(`/lineup/${lineup.id}`)}
              name='View Lineup'
              sx={{ marginLeft: 'auto' }}
            >
              <OpenInNewTwoTone />
            </IconButton>
          )}
        </CardActions>
      </Card>

      <SwipeableDrawer
        anchor='right'
        open={expanded}
        onClose={() => handleExpandClick({ song: null, id: null })}
        sx={{
          '& > .MuiDrawer-paper': {
            background: `${theme.palette.background.default}`,
          },
        }}
      >
        <Box sx={{ width: 320, p: 2 }}>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ zIndex: 2 }}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Copied!
            </Alert>
          </Snackbar>
          <List>
            <ListItem>
              <ListItemText
                primary='Song Title:'
                secondary={
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <strong>{drawerData?.song?.title}</strong>
                    </div>
                    <div>
                      <small style={{ textTransform: 'capitalize' }}>
                        <span style={{ color: theme.palette.text.secondary }}>
                          Artist:
                        </span>{' '}
                        {drawerData?.song?.artist}
                      </small>
                    </div>
                    <div>
                      <small style={{ textTransform: 'capitalize' }}>
                        <span style={{ color: theme.palette.text.secondary }}>
                          Album:
                        </span>{' '}
                        {drawerData?.song?.album}
                      </small>
                    </div>
                  </div>
                }
                primaryTypographyProps={{
                  sx: {
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                  },
                }}
              />
            </ListItem>

            {(drawerData?.song?.lyrics?.verse ||
              drawerData?.song?.chords?.verse) && (
              <ListItem>
                <ListItemText
                  primary='Verse:'
                  secondary={
                    <TextField
                      id='verse'
                      value={
                        drawerData.id === 'Lyrics'
                          ? drawerData?.song?.lyrics?.verse
                          : drawerData?.song?.chords?.verse
                      }
                      fullWidth
                      disabled
                      variant='standard'
                      multiline
                      sx={{
                        '& textarea.Mui-disabled': {
                          '-webkit-text-fill-color': theme.palette.text.primary,
                          textTransform: 'uppercase',
                        },
                        '& > .Mui-disabled:before': {
                          borderBottomStyle: 'none !important',
                        },
                      }}
                    />
                  }
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '0.875rem',
                      color: theme.palette.text.primary,
                      opacity: 0.7,
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: '1rem',
                      color: theme.palette.text.primary,
                      textTransform: 'uppercase',
                    },
                  }}
                />
              </ListItem>
            )}

            {(drawerData?.song?.lyrics?.pre_chorus ||
              drawerData?.song?.chords?.pre_chorus) && (
              <ListItem>
                <ListItemText
                  secondary={
                    <TextField
                      id='pre-chorus'
                      value={
                        drawerData.id === 'Lyrics'
                          ? drawerData?.song?.lyrics?.pre_chorus
                          : drawerData?.song?.chords?.pre_chorus
                      }
                      fullWidth
                      disabled
                      variant='standard'
                      multiline
                      sx={{
                        '& textarea.Mui-disabled': {
                          '-webkit-text-fill-color': theme.palette.text.primary,
                          textTransform: 'uppercase',
                        },
                        '& > .Mui-disabled:before': {
                          borderBottomStyle: 'none !important',
                        },
                      }}
                    />
                  }
                  primary='Pre-chorus:'
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '0.875rem',
                      color: theme.palette.text.primary,
                      opacity: 0.7,
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: '1rem',
                      color: theme.palette.text.primary,
                      textTransform: 'uppercase',
                    },
                  }}
                />
              </ListItem>
            )}

            {(drawerData?.song?.lyrics?.chorus ||
              drawerData?.song?.chords?.chorus) && (
              <ListItem>
                <ListItemText
                  secondary={
                    <TextField
                      id='chorus'
                      value={
                        drawerData.id === 'Lyrics'
                          ? drawerData?.song?.lyrics?.chorus
                          : drawerData?.song?.chords?.chorus
                      }
                      fullWidth
                      disabled
                      variant='standard'
                      multiline
                      sx={{
                        '& textarea.Mui-disabled': {
                          '-webkit-text-fill-color': theme.palette.text.primary,
                          textTransform: 'uppercase',
                        },
                        '& > .Mui-disabled:before': {
                          borderBottomStyle: 'none !important',
                        },
                      }}
                    />
                  }
                  primary='Chorus:'
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '0.875rem',
                      color: theme.palette.text.primary,
                      opacity: 0.7,
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: '1rem',
                      color: theme.palette.text.primary,
                      textTransform: 'uppercase',
                    },
                  }}
                />
              </ListItem>
            )}
          </List>

          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleCopy} startIcon={<ContentCopy />}>
              Copy
            </Button>
          </div>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default LineupItem;
