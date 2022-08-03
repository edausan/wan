import { Clear, EditOutlined, YouTube } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Tab,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyLoad from 'react-lazyload';
import SPOTIFY_LOGO from '../../../assets/spotify_logo.png';

const EditSongTabs = ({ song, setSongDetails, updating }) => {
  const [value, setValue] = useState('1');

  console.log('EDIT SONG TABS');

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={(e, newValue) => setValue(newValue)}>
          <Tab label='Lyrics' value='1' className='text-xs' />
          <Tab label='Chords' value='2' className='text-xs' />
          <Tab label='Media' value='3' className='text-xs' />
        </TabList>
      </Box>
      <TabPanel value='1'>
        <SongParts
          part={song?.lyrics}
          lyrics
          setDetails={setSongDetails}
          song={song}
          updating={updating}
        />
      </TabPanel>
      <TabPanel value='2'>
        <SongParts
          part={song?.chords}
          setDetails={setSongDetails}
          song={song}
          updating={updating}
        />
      </TabPanel>
      <TabPanel value='3' className='p-0'>
        <Media setDetails={setSongDetails} song={song} />
      </TabPanel>
    </TabContext>
  );
};

export const UrlId = (url) => {
  if (url.includes('spotify')) {
    const id = url?.split('track/')[1].split('?')[0];
    console.log({ id });
    // <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5uj2wWw0gnNqkVqGNWbGrf?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    const sp_url = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
    return sp_url;
    //https://open.spotify.com/track/0xqQDpsGBrVUhp4LJA4K7f?si=Lq_gp7DRRZCvYLJC0qq8yA&utm_source=copy-link
  } else {
    const id = url?.split('be/')[1];
    const yt_url = `https://www.youtube.com/embed/${id}`;
    return yt_url;
  }
};

const Media = React.memo(({ setDetails, song }) => {
  const [ytUrl, setYtURL] = useState(null);
  const [spotifyUrl, setSpotifyURL] = useState(null);
  const [youtube, setYoutube] = useState(null);
  const [spotify, setSpotify] = useState(null);
  const [isEditYt, setIsEditYt] = useState(false);
  const [isEditSpotify, setIsEditSpotify] = useState(false);
  const [value, setValue] = useState('1');

  const handleURL = (e) => {
    const link = e.target.value;
    if (link.includes('spotify')) {
      const embed_url = UrlId(link);
      setSpotify(link);
      setSpotifyURL(embed_url);
      setDetails({ ...song, media: { ...song?.media, spotify: embed_url } });
    } else {
      const embed_url = UrlId(link);
      setYoutube(link);
      setYtURL(embed_url);
      setDetails({ ...song, media: { ...song?.media, youtube: embed_url } });
    }
  };

  useEffect(() => {
    console.log({ song });
    if (song?.media?.youtube && !ytUrl) {
      // const value = UrlId(song?.media?.youtube);
      setYtURL(song?.media?.youtube);
      setYoutube(song?.media?.youtube);
    } else if (song?.media?.spotify && !spotifyUrl) {
      setSpotifyURL(song?.media?.spotify);
      setSpotify(song?.media?.spotify);
    }
  }, [song]);

  useEffect(() => {
    console.log({ ytUrl, spotifyUrl });
  }, [ytUrl, spotifyUrl]);

  return (
    <div className='max-w-[100%] mt-4'>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(e, newValue) => setValue(newValue)}>
            <Tab
              label={
                <div className='flex flex-row items-center gap-2'>
                  <YouTube color='error' /> YouTube
                </div>
              }
              value='1'
              className='text-xs'
            />
            <Tab
              label={
                <div className='flex flex-row items-center gap-2'>
                  <img src={SPOTIFY_LOGO} alt='' className='w-[25px]' /> Spotify
                </div>
              }
              value='2'
              className='text-xs'
            />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <div className='flex flex-row gap-2 items-center pb-2 px-0'>
            <TextField
              variant='standard'
              size='small'
              label='Paste Youtube Link'
              fullWidth
              onChange={handleURL}
              disabled={!isEditYt}
              className='YT [&>label]:text-xs [&>div>input]:text-xs'
            />
            <IconButton onClick={() => setIsEditYt(!isEditYt)}>
              {isEditYt ? (
                <Clear fontSize='small' />
              ) : (
                <EditOutlined fontSize='small' />
              )}
            </IconButton>
          </div>
          <LazyLoad>
            <iframe
              className='w-[100%] h-[200px]'
              title='test'
              src={ytUrl}
              frameborder='0'
            />
          </LazyLoad>
        </TabPanel>

        <TabPanel value='2'>
          <div className='flex flex-row gap-2 items-center pb-2 px-0'>
            <TextField
              variant='standard'
              size='small'
              label='Paste Spotify Link'
              fullWidth
              onChange={handleURL}
              disabled={!isEditSpotify}
              className='SPOTIFY [&>label]:text-xs [&>div>input]:text-xs'
            />
            <IconButton onClick={() => setIsEditSpotify(!isEditSpotify)}>
              {isEditSpotify ? (
                <Clear fontSize='small' />
              ) : (
                <EditOutlined fontSize='small' />
              )}
            </IconButton>
          </div>
          <LazyLoad>
            <iframe
              className='w-[100%] h-[80px]'
              title='test'
              src={spotifyUrl}
              frameborder='0'
              allowfullscreen=''
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            />
          </LazyLoad>
        </TabPanel>
      </TabContext>
    </div>
  );
});

const SongParts = ({ part, lyrics, setDetails, song, updating }) => {
  const [edit, setEdit] = useState(true);
  const handleChange = (songPart, value) => {
    console.log({ songPart, value });
    lyrics
      ? setDetails({
          ...song,
          lyrics: {
            ...song.lyrics,
            [songPart]: value,
          },
        })
      : setDetails({
          ...song,
          chords: {
            ...song.chords,
            [songPart]: value,
          },
        });
  };

  useEffect(() => {
    updating && setEdit(true);
  }, [updating]);

  return (
    <div className='flex gap-4 flex-col'>
      <TextField
        variant='standard'
        fullWidth
        label='Verse'
        defaultValue={part?.verse}
        multiline
        className='VERSE [&>div>textarea]:text-sm [&>label]:text-sm'
        maxRows={5}
        // disabled={edit}
        onChange={(e) => handleChange('verse', e.target.value)}
      />
      <TextField
        variant='standard'
        fullWidth
        label='Pre Chorus'
        defaultValue={part?.pre_chorus}
        multiline
        className='VERSE [&>div>textarea]:text-sm [&>label]:text-sm'
        maxRows={5}
        // disabled={edit}
        onChange={(e) => handleChange('pre_chorus', e.target.value)}
      />
      <TextField
        variant='standard'
        fullWidth
        label='Chorus'
        defaultValue={part?.chorus}
        multiline
        className='VERSE [&>div>textarea]:text-sm [&>label]:text-sm'
        maxRows={5}
        // disabled={edit}
        onChange={(e) => handleChange('chorus', e.target.value)}
      />
      <TextField
        variant='standard'
        fullWidth
        label='Bridge'
        defaultValue={part?.bridge}
        multiline
        className='VERSE [&>div>textarea]:text-sm [&>label]:text-sm'
        maxRows={5}
        // disabled={edit}
        onChange={(e) => handleChange('bridge', e.target.value)}
      />
    </div>
  );
};

export default React.memo(EditSongTabs);
