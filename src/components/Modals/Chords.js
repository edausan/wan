import {
  TextField,
  Typography,
  Card,
  CardActions,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const Chords = ({ setCardData, cardData, category, setOpen }) => {
  const [chords, setChords] = useState({
    verse: null,
    pre_chorus: null,
    chorus: null,
  });

  useEffect(() => {
    if (cardData.chords?.verse) {
      console.log(cardData.chords);
      setChords(cardData.chords);
    }
  }, []);

  useEffect(() => {
    setCardData((data) => ({ ...data, chords }));
  }, [chords]);

  return (
    <Card
      sx={{
        width: '90%',
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 2,
        pb: 0,
        boxSizing: 'border-box',
        // minHeight: 500,
      }}
    >
      <Typography variant='h6' sx={{ mb: 2 }}>
        {cardData.title || category.label} <small>| Chords</small>
      </Typography>

      <TextField
        label='Verse'
        fullWidth
        variant='standard'
        multiline
        value={chords.verse}
        onChange={(e) => setChords({ ...chords, verse: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label='Pre-chorus'
        fullWidth
        variant='standard'
        multiline
        value={chords.pre_chorus}
        sx={{ mb: 2 }}
        onChange={(e) => setChords({ ...chords, pre_chorus: e.target.value })}
      />
      <TextField
        label='Chorus'
        fullWidth
        variant='standard'
        multiline
        value={chords.chorus}
        onChange={(e) => setChords({ ...chords, chorus: e.target.value })}
      />
      <CardActions sx={{ justifyContent: 'right', mt: 2 }}>
        <Button
          size='small'
          onClick={() => setOpen({ id: null, status: false, song_title: null })}
        >
          Done
        </Button>
      </CardActions>
    </Card>
  );
};

export default Chords;
