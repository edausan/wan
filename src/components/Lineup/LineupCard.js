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
  CardActions,
  CardContent,
  Select,
  MenuItem,
  Autocomplete,
  createFilterOptions,
  useTheme,
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

const filter = createFilterOptions();

const LineupCard = ({
  category: cat,
  setOpen,
  setLineupData,
  saving,
  songs,
}) => {
  // const params = useParams();
  const theme = useTheme();
  const [cardData, setCardData] = useState({
    song: null,
    artist: null,
    album: null,
    lyrics: null,
    chords: null,
    media: null,
    from: null,
  });

  const [category, setCategory] = useState({
    label: null,
    song: null,
    artist: null,
    album: null,
    id: null,
  });

  useEffect(() => {
    console.log({ cardData });
  }, [cardData]);

  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    if (songs?.length > 0) {
      const filtered = songs.filter((song) => song.tags[0] === cat.tags[0]);
      setFilteredSongs(filtered);
    }
  }, [songs]);

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
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Autocomplete
            freeSolo
            id='song-auto'
            options={
              filteredSongs.sort((a, b) => b.label?.localeCompare(a.label)) ||
              []
            }
            fullWidth
            size='small'
            value={cardData.song || category.song}
            // groupBy={(option) => option.tags[0]}
            onChange={(e, value) => {
              if (typeof value === 'string') {
                setCardData({
                  ...cardData,
                  songs: value,
                  from: "typeof value === 'string'",
                });
              } else if (value && value.inputValue) {
                // Create a new value from the user input
                setCardData({
                  ...cardData,
                  song: value.inputValue,
                  from: 'value && value.inputValue',
                });
              } else {
                setCardData({
                  song: value.label || e.target.value,
                  lyrics: value.lyrics || cardData.lyrics,
                  chords: value.chords || cardData.chords,
                  artist: value.artist || cardData.artist,
                  album: value.album || cardData.album,
                  media: null,
                  from: 'else',
                });
              }
            }}
            renderInput={(params) => {
              return (
                <TextField
                  variant='standard'
                  {...params}
                  label={category.label}
                />
              );
            }}
            renderOption={(props, option) => (
              <li {...props}>{option.title || option.label}</li>
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.label
              );

              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.label;
            }}
          />

          {/* <TextField
            label={category.label}
            fullWidth
            size='small'
            variant='standard'
            disabled={saving}
            value={cardData.song || category.song}
            onChange={(e) => setCardData({ ...cardData, song: e.target.value })}
          /> */}
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
                value={cardData.artist || category.artist}
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
                value={cardData.album || category.album}
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
          {/* <Button
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
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default LineupCard;
