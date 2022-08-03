import {
  TextField,
  Typography,
  Card,
  CardActions,
  IconButton,
  List,
  ListItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { UpdateLyrics } from '../../Firebase/songsApi';

const Lyrics = ({ setCardData, cardData, setOpen, category }) => {
  const [lyrics, setLyrics] = useState({
    verse: null,
    pre_chorus: null,
    chorus: null,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  console.log({ Lyrics: cardData });

  useEffect(() => {
    if (cardData.lyrics?.verse) {
      console.log(cardData.lyrics);
      setLyrics(cardData.lyrics);
    }
  }, []);

  useEffect(() => {
    setCardData((cardData) => ({ ...cardData, lyrics }));
  }, [lyrics]);

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'about-popper' : undefined;

  const handleSaveLyrics = async () => {
    try {
      setUpdating(true);
      const res = await UpdateLyrics({ id: cardData.id, lyrics });
      console.log({ res });
      setUpdating(false);
      setUpdated(true);

      setTimeout(() => {
        setUpdated(false);
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Snackbar
        open={updated}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          Lyrics Successfully Updated!
        </Alert>
      </Snackbar>
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
          {cardData.title || category.label} <small>| Lyrics</small>
        </Typography>

        <TextField
          label='Verse'
          fullWidth
          variant='standard'
          multiline
          value={lyrics.verse}
          onChange={(e) => setLyrics({ ...lyrics, verse: e.target.value })}
          sx={{ mb: 2 }}
          maxRows={5}
        />
        <TextField
          label='Pre-chorus'
          fullWidth
          variant='standard'
          multiline
          value={lyrics.pre_chorus}
          sx={{ mb: 2 }}
          maxRows={5}
          onChange={(e) => setLyrics({ ...lyrics, pre_chorus: e.target.value })}
        />
        <TextField
          label='Chorus'
          fullWidth
          variant='standard'
          multiline
          value={lyrics.chorus}
          onChange={(e) => setLyrics({ ...lyrics, chorus: e.target.value })}
          maxRows={5}
        />

        <CardActions className='mt-2 px-0 pb-4 justify-end'>
          {cardData.id && !cardData.is_new ? (
            <button
              className='py-1 px-3 bg-green-600 text-white rounded-md'
              onClick={handleSaveLyrics}
              disabled={updating}
            >
              Save Lyrics
            </button>
          ) : (
            <Button
              size='small'
              onClick={() =>
                setOpen({ id: null, status: false, song_title: null })
              }
            >
              Done
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Lyrics;
