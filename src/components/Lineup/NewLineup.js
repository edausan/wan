import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  TextField,
  Modal,
  Card,
  SpeedDial,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { LINEUP } from '../../data';
import { AppCtx } from '../../App';
import LineupCard from './LineupCard';
import Lyrics from '../Modals/Lyrics';
import Chords from '../Modals/Chords';
import Media from '../Modals/Media';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  AddLineup,
  AddSongs,
  RealtimeSongs,
  UpdateLineup,
} from '../../Firebase/songsApi';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../Firebase';
import { MusicNoteTwoTone, Save } from '@mui/icons-material';

const NewLineup = () => {
  const params = useParams();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  const history = useHistory();
  const [open, setOpen] = useState({
    id: null,
    status: false,
    song_title: null,
  });

  const { index, setIndex, lineups, scrollToTop } = useContext(AppCtx);
  const [date, setDate] = useState(new Date());
  const [lineupData, setLineupData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [service, setService] = useState(null);
  const [songs, setSongs] = useState([]);

  const { data } = RealtimeSongs();

  useEffect(() => {
    scrollToTop();
    setSongs(data);
  }, [data]);

  useEffect(() => {
    getSundayOfCurrentWeek();
  }, []);

  useEffect(() => {
    if (params.id) {
      const filtered = lineups.filter((l) => l.id === params.id)[0];
      console.log({ filtered });
      setService(filtered.service);
      setDate(filtered.date);
      setLineupData(filtered.songs);
    } else {
      setLineupData(LINEUP);
    }
  }, [LINEUP, params.id]);

  const handleDateChange = (newValue) => {
    console.log({ newValue });
    setDate(newValue);
  };

  const handleSave = async () => {
    console.log({ song: lineupData[0].song });
    if (lineupData[0].song) {
      setSaving(true);

      const saved = await AddLineup({
        lineup: {
          date_created: moment(new Date()).format('LLLL'),
          songs: lineupData,
          worship_leader: user.displayName,
          user: {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
          },
          date: moment(date).format('LLLL'),
          service,
        },
      });

      handleSaveSongs();

      console.log({ saved });

      if (saved.id) {
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
          setSaved(false);
          history.push('/lineup');
        }, 1000);
      }
    }
  };

  const handleSaveSongs = () => {
    const filtered = lineupData
      .map((l) => {
        const idx = songs.findIndex((s) => s.label === l.song);
        // if (idx >= 0 && l.lyrics === null) {

        // }

        if (idx === -1) {
          return l;
        }
        return null;
      })
      .filter((l) => l !== null);

    console.log({ filtered });

    const updated_songs = filtered
      .map((lineup) => {
        delete lineup.id;
        return {
          ...lineup,
          label: lineup.song,
          id: lineup.song?.toLowerCase().split(' ').join('-'),
          date_created: moment(new Date()).format('LLLL'),
        };
      })
      .filter((l) => l.song);

    console.log({ updated_songs });
    AddSongs({ songs: updated_songs });
  };

  const handleUpdate = async () => {
    setSaving(true);

    console.log({ user });

    const res = await UpdateLineup({
      id: params.id,
      lineup: {
        service,
        songs: lineupData,
        date: moment(date).format('LLLL'),
        date_updated: moment(new Date()).format('LLLL'),
        updated_by: {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      },
    });

    console.log({ res });

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
        history.push('/lineup');
      }, 1000);
    }, 1000);
  };

  const getSundayOfCurrentWeek = () => {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;

    const sunday = new Date(today.setDate(last));
    setDate(sunday);
    return sunday;
  };

  const ModalContent = () => {
    switch (open.id) {
      case 'Lyrics':
        return (
          <Lyrics
            setLineupData={setLineupData}
            song={open}
            lineupData={lineupData}
            setOpen={setOpen}
          />
        );
      case 'Chords':
        return (
          <Chords
            setLineupData={setLineupData}
            song={open}
            lineupData={lineupData}
            setOpen={setOpen}
          />
        );
      case 'Media':
        return (
          <Media
            setLineupData={setLineupData}
            song={open}
            lineupData={lineupData}
          />
        );

      default:
        break;
    }
  };

  const handleClose = () => {
    setSaved(false);
  };

  return (
    <section
      style={{
        position: 'relative',
        paddingBottom: 100,
      }}
    >
      <Snackbar
        open={saved}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {params.id
            ? 'Lineup successfully updated'
            : 'New Lineup successfully created!'}
        </Alert>
      </Snackbar>

      {lineupData[0]?.song && service && (
        <SpeedDial
          onClick={params.id ? handleUpdate : handleSave}
          color={lineupData[0]?.song ? 'primary' : '#ccc'}
          ariaLabel='Save Lineup'
          sx={{ position: 'fixed', bottom: 66, right: 16 }}
          icon={<Save />}
        />
      )}
      {/* <SpeedDial
        onClick={handleSaveSongs}
        color='success'
        ariaLabel='Save Songs'
        sx={{ position: 'fixed', bottom: 130, right: 16 }}
        icon={<MusicNoteTwoTone />}
      /> */}

      <Modal
        open={open.status}
        onClose={() => setOpen({ id: null, status: false, song_title: null })}
      >
        {ModalContent()}
      </Modal>

      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2, mb: 2 }}>
            <FormControl fullWidth variant='standard' required sx={{ mb: 2 }}>
              <InputLabel id='service-type'>Service</InputLabel>
              <Select
                labelId='service-type'
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <MenuItem value='Worship Service | Belleview'>
                  Worship Service | Belleview
                </MenuItem>
                <MenuItem value='Worship Service | Lumina'>
                  Worship Service | Lumina
                </MenuItem>
                <MenuItem value='Youth Service'>Youth Service</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                required
                inputFormat='dddd LL'
                label='Date'
                value={date}
                onChange={(value) => handleDateChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size='small'
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          {lineupData.length > 0 &&
            lineupData.map((category, idx) => {
              return (
                <LineupCard
                  songs={songs}
                  saving={saving}
                  setLineupData={setLineupData}
                  key={category.id + idx}
                  category={category}
                  setOpen={setOpen}
                />
              );
            })}
        </Grid>
      </Grid>
    </section>
  );
};

export default NewLineup;
