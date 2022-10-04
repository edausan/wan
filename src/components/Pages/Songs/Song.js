import {
  LyricsTwoTone,
  MusicNote,
  TextSnippet,
  YouTube,
} from '@mui/icons-material';
import {
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Skeleton,
} from '@mui/material';
import React, { Suspense } from 'react';
import SPOTIFY_LOGO from '../../../assets/spotify_logo.png';
import ALBUM_PLACEHOLDER from '../../../assets/music_placeholder.jpg';

const Song = ({ song, setOpenDrawer, openDrawer, handleExpandClick }) => {
  return (
    <Card
      key={song?.id}
      className='phone:col-span-2 laptop:col-span-1 flex flex-row'
    >
      <Suspense
        fallback={<Skeleton variant='rectangular' width={50} height='100%' />}
      >
        <CardMedia
          component='img'
          image={song?.cover || ALBUM_PLACEHOLDER}
          className={`w-[50px] min-w-[50px] overflow-hidden`}
        />
      </Suspense>
      <div className='flex-1 flex flex-row'>
        <CardHeader
          onClick={() => setOpenDrawer({ song, status: true })}
          className='flex-1 pt-2 pb-3 pl-2'
          title={
            <p className='text-xs font-bold truncate desktop:max-w-[160px] laptop:max-w-[140px] phone:max-w-[170px] box-border'>
              {song?.title}
            </p>
          }
          titleTypographyProps={{ sx: { lineHeight: 0.8 } }}
          subheader={
            <div className='text-xs flex flex-col'>
              <span className='mr-2 flex-1 text-white/50 '>
                {/* <small className='block'>Artist:</small> */}
                {song?.artist || (
                  <span className='text-white/20 text-[.55rem]'>
                    + Add Artist
                  </span>
                )}
              </span>
              <span className='flex-1'>
                {song?.album || (
                  <span className='text-white/10 text-[.55rem]'>
                    + Add Album
                  </span>
                )}
              </span>
            </div>
          }
          action={<div></div>}
        />
        <div className='flex flex-row pr-2 items-center'>
          <IconButton
            className='px-1 w-[28px] h-[28px]'
            color='primary'
            disabled={
              !song?.lyrics?.verse &&
              !song?.lyrics?.pre_chorus &&
              !song?.lyrics?.chorus &&
              !song?.lyrics?.bridge
            }
            onClick={() => handleExpandClick(song, 'Lyrics')}
          >
            <LyricsTwoTone fontSize='small' className='w-[16x] h-[16px]' />
          </IconButton>
          <IconButton
            className='px-1 w-[28px] h-[28px]'
            color='secondary'
            onClick={() => handleExpandClick(song, 'Chords')}
            disabled={
              !song?.chords?.verse &&
              !song?.chords?.pre_chorus &&
              !song?.chords?.chorus &&
              !song?.chords?.bridge
            }
          >
            <MusicNote fontSize='small' className='w-[16x] h-[16px]' />
          </IconButton>
          <div className='px-1 flex flex-col justify-center items-center gap-1'>
            <YouTube
              fontSize='small'
              className='w-[16x] h-[16px]'
              color={!song?.media?.youtube ? 'disabled' : 'error'}
            />
            <img
              src={SPOTIFY_LOGO}
              alt=''
              className={`w-[16px] ${
                !song?.media?.spotify ? 'grayscale opacity-30' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Song;
