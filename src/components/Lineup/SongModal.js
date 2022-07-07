import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { SaveTwoTone, CloseTwoTone, EditTwoTone } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { UpdateSong } from '../../Firebase/songsApi';

const SongModal = ({ isOpen, setIsOpen, getData }) => {
  const theme = useTheme();
  const { status, song } = isOpen;
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);

  const [lyrics, setLyrics] = useState({
    verse: null,
    pre_chorus: null,
    chorus: null,
  });

  useEffect(() => {
    const song_lyrics = isOpen.song?.lyrics;
    isOpen.status &&
      song_lyrics?.verse &&
      setLyrics({
        verse: song_lyrics.verse,
        pre_chorus: song_lyrics.pre_chorus,
        chorus: song_lyrics.chorus,
      });

    return () => {
      setLyrics({
        verse: null,
        pre_chorus: null,
        chorus: null,
      });

      setEdit(false);
      setUpdated(false);
    };
  }, [isOpen]);

  const handleUpdateSong = () => {
    if (lyrics.verse || lyrics.chorus) {
      setEdit(false);
      const res = UpdateSong({ song: { ...isOpen?.song, lyrics } });
      getData();
      console.log({ handleUpdateSong: res });

      setTimeout(() => {
        setUpdated(true);
        getData();
      }, 1000);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleClose = () => {
    setUpdated(false);
  };

  const commonStyles = {
    '& textarea.MuiInput-input, & textarea.MuiInput-input > div': {
      textTransform: 'uppercase',
      //   '-webkit-text-fill-color': theme.palette.text.primary,
    },
  };

  return (
    <>
      <Modal
        open={status}
        onClose={() => setIsOpen({ song: null, status: false })}
        sx={{ zIndex: 1005 }}
      >
        <Card
          sx={{
            width: '90%',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxSizing: 'border-box',
            background: theme.palette.background.default,
          }}
        >
          <Snackbar
            open={updated}
            autoHideDuration={2000}
            onClose={handleClose}
            message='Song Updated'
            sx={{ zIndex: 1007 }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity='success'>{isOpen.song?.title} updated!</Alert>
          </Snackbar>
          <CardHeader title={song?.title} subheader={song?.label} />
          <CardContent>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab label='Lyrics' {...a11yProps(0)} />
              <Tab label='Chords' {...a11yProps(1)} />
              <Tab label='Media' {...a11yProps(2)} disabled />
            </Tabs>

            <TabPanel value={value} index={0}>
              <TextField
                label='Verse'
                fullWidth
                variant='standard'
                multiline
                value={lyrics.verse}
                onChange={(e) =>
                  setLyrics({ ...lyrics, verse: e.target.value })
                }
                sx={{
                  mb: 2,
                  ...commonStyles,
                }}
                disabled={!edit}
              />
              <TextField
                label='Pre-chorus'
                fullWidth
                variant='standard'
                multiline
                value={lyrics.pre_chorus}
                sx={{
                  mb: 2,
                  ...commonStyles,
                }}
                onChange={(e) =>
                  setLyrics({ ...lyrics, pre_chorus: e.target.value })
                }
                disabled={!edit}
              />
              <TextField
                label='Chorus'
                fullWidth
                variant='standard'
                multiline
                value={lyrics.chorus}
                onChange={(e) =>
                  setLyrics({ ...lyrics, chorus: e.target.value })
                }
                sx={{
                  ...commonStyles,
                }}
                className='CHORUS'
                disabled={!edit}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Chords
            </TabPanel>
            <TabPanel value={value} index={2}>
              Media
            </TabPanel>
          </CardContent>
          <CardActions sx={{ justifyContent: 'right' }}>
            <Button
              startIcon={<CloseTwoTone />}
              color='inherit'
              onClick={() => setIsOpen({ song: null, status: false })}
            >
              Close
            </Button>
            {edit ? (
              <Button startIcon={<SaveTwoTone />} onClick={handleUpdateSong}>
                Update Song
              </Button>
            ) : (
              <Button
                startIcon={<EditTwoTone />}
                color='warning'
                onClick={() => setEdit(true)}
              >
                Edit Song
              </Button>
            )}
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default SongModal;
