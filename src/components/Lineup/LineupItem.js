/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState } from 'react';
import {
  CheckCircleTwoTone,
  Event,
  ExpandMore,
  Favorite,
  FavoriteBorder,
  MoreVert,
  MusicNote,
  OpenInNewTwoTone,
  PlayArrow,
  ShareOutlined,
  TextSnippet,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { ADMIN } from '../../data';
import moment from 'moment';
import { pink, blue } from '../Pages/Auth/Login';
import { useHistory, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../../Firebase';
import { DeleteLineup, GetSong, HeartLineup } from '../../Firebase/songsApi';
import { useEffect } from 'react';
// import LineupItemDrawer from './LineupItemDrawer';
// import SongDetailsDrawer from './SongDetailsDrawer';
// import EditSong from '../Pages/Songs/EditSong';

const EditSong = React.lazy(() => import('../Pages/Songs/EditSong'));
const SongDetailsDrawer = React.lazy(() => import('./SongDetailsDrawer'));
const LineupItemDrawer = React.lazy(() => import('./LineupItemDrawer'));

const LineupItem = ({ lineup, isBordered, isLast, isSongsExpanded }) => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const history = useHistory();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [drawerData, setDrawerData] = useState({ song: null, id: null });
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [lineupSongs, setLineupSongs] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSongDrawer, setOpenSongDrawer] = useState({
    song: null,
    status: false,
  });

  useEffect(() => {
    lineup.songs.length > 0 && lineup.songs[0].title && GetSongsData();
  }, [lineup.songs]);

  const GetSongsData = async () => {
    const lineup_songs = [];
    lineup.songs.map(async (song) => {
      const songs_data = await GetSong({ song });
      lineup_songs.push({ ...songs_data, label: song.label });
    });

    setLineupSongs(lineup_songs);
  };

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

  const handleClose = () => {};

  const lineup_songs = lineup.songs[0].title ? lineupSongs : lineup.songs;

  return (
    <>
      <Suspense fallback={<div></div>}>
        <SongDetailsDrawer
          drawerData={drawerData}
          expanded={expanded}
          handleClose={handleClose}
          handleCopy={handleCopy}
          handleExpandClick={handleExpandClick}
          open={open}
        />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <EditSong drawer={openSongDrawer} setOpen={setOpenSongDrawer} />
      </Suspense>

      <Suspense fallback={<div></div>}>
        <LineupItemDrawer
          setOpen={setOpenDrawer}
          open={openDrawer}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          user={user}
          lineup={lineup}
        />
      </Suspense>

      <Card
        sx={{
          maxWidth: '100%',
          mb: isBordered && isLast ? 0 : isBordered ? 1 : 2,
          border: 'none',
          borderRadius: isBordered ? 0 : '',
        }}
        variant={isBordered ? 'outlined' : 'elevation'}
      >
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
                  onClick={() => setOpenDrawer(true)}
                >
                  <MoreVert />
                </IconButton>
              )}
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

        <CardContent sx={{ py: 0 }}>
          <List sx={{ py: 0, mt: 1 }}>
            <Accordion
              expanded={isExpanded || isSongsExpanded}
              disableGutters
              sx={{ boxShadow: 'none', py: 0, background: 'none' }}
            >
              <AccordionSummary
                sx={{ px: 0, pr: 1 }}
                expandIcon={<ExpandMore />}
                aria-controls='panel1a-content'
                id='panel1a-header'
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
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
                      <small className='text-xs'>
                        {lineup?.service}
                        <div
                          style={{ color: theme.palette.text.secondary }}
                          className='text-xs'
                        >
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
                          onClick={() =>
                            setOpenSongDrawer({ song: s, status: true })
                          }
                          primary={
                            <span className='text-sm'>{s.title || s.song}</span>
                          }
                          secondary={
                            <span className='text-xs text-white/40'>
                              {s.label}
                            </span>
                          }
                          // onClick={() =>
                          //   setIsModalOpen({ song: s, status: true })
                          // }
                        />
                        <IconButton
                          color='primary'
                          disabled={
                            !s.lyrics?.verse &&
                            !s.lyrics?.pre_chorus &&
                            !s.lyrics?.chorus
                          }
                          onClick={() => handleExpandClick(s, 'Lyrics')}
                          sx={{ mr: 1 }}
                        >
                          <TextSnippet fontSize='small' />
                        </IconButton>
                        <IconButton
                          color='secondary'
                          onClick={() => handleExpandClick(s, 'Chords')}
                          disabled={
                            !s.chords?.verse &&
                            !s.chords?.pre_chorus &&
                            !s.chords?.chorus
                          }
                          sx={{ mr: 1 }}
                        >
                          <MusicNote fontSize='small' />
                        </IconButton>
                        <IconButton
                          color='error'
                          disabled={!s?.media?.youtube && !s?.media?.spotify}
                        >
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
            {lineup?.heart?.findIndex((h) => h === user.uid) >= 0 ? (
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
            className='ml-2'
          >
            <IconButton aria-label='share'>
              <ShareOutlined fontSize='small' />
            </IconButton>
          </a>
          {/* <a
						href={`https://m.me/j/Aba8ddZutv5MvPbi/`}
						style={{textDecoration: "none", color: "inherit"}}
						onClick={() => {
							navigator.clipboard.writeText(`https://wan-belleview.web.app/lineup/${lineup.id}`)
						}}
					>
						<IconButton aria-label="share">
							<Share />
						</IconButton>
					</a>
					{!isSongsExpanded && (
						<IconButton
							aria-label="view"
							onClick={() => history.push(`/lineup/${lineup.id}`)}
							name="View Lineup"
							sx={{marginLeft: "auto"}}
						>
							<OpenInNewTwoTone />
						</IconButton>
					)} */}
          <IconButton
            aria-label='view'
            onClick={() => history.push(`/lineup/${lineup.id}`)}
            name='View Lineup'
            sx={{ marginLeft: 'auto' }}
          >
            <OpenInNewTwoTone fontSize='small' />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default LineupItem;
