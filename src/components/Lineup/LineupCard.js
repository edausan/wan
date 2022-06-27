import React, { useState } from 'react';
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Card,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import {
  NoteAlt,
  MusicNote,
  PlayArrow,
  CloseOutlined,
  Close,
  TextSnippet,
} from '@mui/icons-material';
import { useEffect } from 'react';

const LineupCard = ({ category: cat, setOpen, setLineupData, saving }) => {
  // const params = useParams();
  const [cardData, setCardData] = useState({
    song: null,
    artist: null,
    album: null,
    lyrics: null,
    chords: null,
    media: null,
  });

  const [category, setCategory] = useState({
    label: null,
    song: null,
    artist: null,
    album: null,
    id: null,
  });

  useEffect(() => {
    setCategory(cat);
  }, [cat]);

  useEffect(() => {
    setLineupData((lineupdata) => {
      return lineupdata.map((song) => {
        if (song.id === category.id) {
          return {
            ...song,
            ...cardData,
          };
        }

        return song;
      });
    });
  }, [cardData]);

  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 2, mb: 2 }}>
        <TextField
          label={category.label}
          fullWidth
          size='small'
          variant='standard'
          disabled={saving}
          value={cardData.song || category.song}
          onChange={(e) => setCardData({ ...cardData, song: e.target.value })}
        />

        <Grid container sx={{ mt: 1 }} spacing={1} justifyContent='left'>
          <Grid item xs={6} md={3}>
            <TextField
              label='Artist'
              fullWidth
              size='small'
              variant='standard'
              value={cardData.artist || category.artist}
              disabled={saving}
              onChange={(e) =>
                setCardData({ ...cardData, artist: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              label='Album'
              fullWidth
              size='small'
              variant='standard'
              value={cardData.album || category.album}
              disabled={saving}
              onChange={(e) =>
                setCardData({ ...cardData, album: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={6} md={6} sx={{ textAlign: 'left' }}>
            <Button
              variant='text'
              color={!category.lyrics?.verse ? 'inherit' : 'primary'}
              disableElevation
              size='small'
              disabled={saving}
              sx={{ minWidth: '40px !important' }}
              onClick={() =>
                setOpen({
                  id: 'Lyrics',
                  status: true,
                  song_title: cardData.song || category.label,
                  category,
                })
              }
            >
              <TextSnippet fontSize='small' />
            </Button>
            <Button
              variant='text'
              color={!category.chords ? 'inherit' : 'secondary'}
              disableElevation
              size='small'
              disabled={saving}
              sx={{ minWidth: '40px !important' }}
              onClick={() =>
                setOpen({
                  id: 'Chords',
                  status: true,
                  song_title: cardData.song || category.label,
                  category,
                })
              }
            >
              <MusicNote fontSize='small' />
            </Button>
            <Button
              variant='text'
              color={!category.media ? 'inherit' : 'error'}
              disableElevation
              size='small'
              disabled={saving}
              sx={{ minWidth: '40px !important' }}
              onClick={() =>
                setOpen({
                  id: 'Media',
                  status: true,
                  song_title: cardData.song || category.label,
                  category,
                })
              }
            >
              <PlayArrow fontSize='small' />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default LineupCard;
