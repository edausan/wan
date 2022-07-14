import React, { useCallback, useContext, useState, useEffect } from 'react';
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
  CardActions,
  CardContent,
  Select,
  MenuItem,
  Autocomplete,
  createFilterOptions,
  useTheme,
  Switch,
  FormGroup,
  FormControlLabel,
  Modal,
} from '@mui/material';
import {
  NoteAlt,
  MusicNote,
  PlayArrow,
  CloseOutlined,
  Close,
  TextSnippet,
} from '@mui/icons-material';
import AutocompleteSong from './AutocompleteSong';
import { NewLineupCtx } from './NewLineup';
import Lyrics from '../Modals/Lyrics';
import Chords from '../Modals/Chords';
import { GetSong } from '../../Firebase/songsApi';

const filter = createFilterOptions();

const initialState = {
  song_title: null,
  artist: null,
  album: null,
  lyrics: null,
  chords: null,
  media: null,
  from: null,
  song_id: null,
  is_new: false,
};

const LineupCard = ({ category, setLineupData, songs, isEdit, songData }) => {
  const { saving } = useContext(NewLineupCtx);
  const [cardData, setCardData] = useState(initialState);

  const [newSong, setNewSong] = useState(false);
  const [open, setOpen] = useState({ modal: null, status: false });
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    if (isEdit) {
      const song = songs.filter((s) => s.id === songData?.id)[0];

      console.log({ song, label: category.label });
      setCardData(song);
    } else {
      setCardData(initialState);
    }
  }, [songs, isEdit, songData]);

  useEffect(() => {
    setCardData(initialState);
  }, [newSong]);

  const handleFilterSongs = useCallback(() => {
    if (songs?.length > 0 && category.id) {
      const filtered = songs?.filter(
        (song) => song?.tags[0] === category?.tags[0]
      );
      setFilteredSongs(filtered);
    }
  }, [songs]);

  useEffect(() => {
    handleFilterSongs();
  }, [songs, handleFilterSongs]);

  const handleSetLineup = () => {
    setLineupData((lineupdata) => {
      console.log({ lineupdata, category });
      return lineupdata.map((song) => {
        if (song.label === category.label) {
          return cardData.title
            ? {
                ...song,
                ...cardData,
                is_new: newSong,
              }
            : category;
        }

        return song;
      });
    });
  };

  useEffect(() => {
    handleSetLineup();
  }, [cardData, newSong]);

  const handleUpdateCard = useCallback(
    (value) => {
      console.log({ value });
      setLineupData((lineupdata) => {
        console.log({ lineupdata });
        return lineupdata.map((song) => {
          console.log({ song, category });
          if (song.id === category.id) {
            return {
              ...song,
              ...value,
            };
          }

          return song;
        });
      });
      // setCardData(value);
    },
    [category]
  );

  return (
    <Grid item xs={12} md={12}>
      <Modal
        open={open.status}
        onClose={() => setOpen({ modal: null, status: false })}
      >
        {open.modal === 'lyrics' ? (
          <Lyrics
            setCardData={setCardData}
            setOpen={setOpen}
            open={open}
            cardData={cardData}
            category={category}
          />
        ) : (
          <Chords />
        )}
      </Modal>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          {/* <AutocompleteSong
            songs={filteredSongs}
            category={category}
            handleUpdateCard={handleUpdateCard}
          /> */}

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={newSong}
                  onChange={() => setNewSong(!newSong)}
                />
              }
              label='New'
            />
          </FormGroup>

          {newSong ? (
            <TextField
              label={category.label}
              fullWidth
              size='small'
              variant='standard'
              value={cardData.title || cardData.song_title}
              disabled={saving}
              onChange={(e) =>
                setCardData({ ...cardData, title: e.target.value })
              }
            />
          ) : (
            <FormControl variant='standard' fullWidth>
              <InputLabel>{category.label}</InputLabel>
              <Select
                onChange={(e) =>
                  setCardData({
                    ...songs?.filter((s) => s.id === e.target.value)[0],
                  })
                }
              >
                {filteredSongs.map((song) => {
                  return <MenuItem value={song.id}>{song.title}</MenuItem>;
                })}
              </Select>
            </FormControl>
          )}

          <Grid
            container
            sx={{ mt: 1, width: '100%' }}
            spacing={1}
            justifyContent='left'
          >
            <Grid item xs={6} md={6}>
              <TextField
                label='Artist'
                fullWidth
                size='small'
                variant='standard'
                value={cardData?.artist}
                disabled={saving}
                onChange={(e) =>
                  setCardData({ ...cardData, artist: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label='Album'
                fullWidth
                size='small'
                variant='standard'
                value={cardData?.album}
                disabled={saving}
                onChange={(e) =>
                  setCardData({ ...cardData, album: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button
            variant='text'
            color={!cardData.lyrics?.verse ? 'inherit' : 'primary'}
            disableElevation
            size='small'
            disabled={saving}
            sx={{ minWidth: '40px !important' }}
            onClick={() => setOpen({ modal: 'lyrics', status: true })}
          >
            <TextSnippet fontSize='small' />
          </Button>
          <Button
            variant='text'
            color={!cardData.chords ? 'inherit' : 'secondary'}
            disableElevation
            size='small'
            disabled={saving}
            sx={{ minWidth: '40px !important' }}
            onClick={() => setOpen({ modal: 'chords', status: true })}
          >
            <MusicNote fontSize='small' />
          </Button>
          {/* <Button
            variant='text'
            color={!category.media ? 'inherit' : 'error'}
            disableElevation
            size='small'
            disabled={saving}
            sx={{ minWidth: '40px !important' }}
            onClick={() =>import { NewLineupCtx } from './NewLineup';
import Lyrics from './../Modals/Lyrics';

              setOpen({
                id: 'Media',
                status: true,
                song_title: cardData.song || category.label,
                category,
              })
            }
          >
            <PlayArrow fontSize='small' />
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default React.memo(LineupCard);
