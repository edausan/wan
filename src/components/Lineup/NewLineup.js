import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Button,
  Modal,
  Card,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';

import { Add, Edit } from '@mui/icons-material';

import { LINEUP, VIA } from '../../data';
import { AppCtx } from '../../App';
import LineupCard from './LineupCard';
import Lyrics from '../Modals/Lyrics';
import Chords from '../Modals/Chords';
import Media from '../Modals/Media';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const NewLineup = () => {
  const [open, setOpen] = useState({ id: '', status: false });
  const { index, setIndex } = useContext(AppCtx);
  const [wl, setWl] = useState();
  const [date, setDate] = useState(new Date());
  const [lineupData, setLineupData] = useState([]);

  useEffect(() => {
    setLineupData(LINEUP);
  }, [LINEUP]);

  useEffect(() => {
    setLineupData(LINEUP);
  }, [LINEUP]);

  const handleDateChange = (newValue) => {
    console.log({ newValue });
    setDate(newValue);
  };

  const ModalContent = () => {
    switch (open.id) {
      case 'Lyrics':
        return <Lyrics />;
      case 'Chords':
        return <Chords />;
      case 'Media':
        return <Media />;

      default:
        break;
    }
  };

  return (
    <section
      style={{
        position: 'relative',
      }}
    >
      <Modal
        open={open.status}
        onClose={() => setOpen({ id: '', status: false })}
      >
        <Card
          sx={{
            width: '90%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: 2,
            boxSizing: 'border-box',
            minHeight: 500,
          }}
        >
          {ModalContent()}
        </Card>
      </Modal>

      <Grid container justifyContent='center' spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <FormControl fullWidth variant='standard' sx={{ mb: 2 }}>
              <InputLabel id='wl'>Worship Leader</InputLabel>
              <Select
                labelId='wl'
                label='Worship Leader'
                value={wl}
                onChange={(e) => setWl(e.target.value)}
                fullWidth
                size='small'
              >
                {VIA.map((via, idx) => {
                  return (
                    <MenuItem key={via.id + idx} value={via.id}>
                      {via.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
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
          {lineupData.map((category, idx) => {
            return (
              <LineupCard
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
