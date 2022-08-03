import { ContentCopy, YouTube } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Snackbar,
  SwipeableDrawer,
  Tab,
  TextField,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import LazyLoad from 'react-lazyload';
import SPOTIFY_LOGO from '../../assets/spotify_logo.png';

const SongDetailsDrawer = ({
  expanded,
  handleExpandClick,
  handleClose,
  drawerData,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    const verse = document.querySelector('#verse');
    const pre_chorus = document.querySelector('#pre-chorus');
    const chorus = document.querySelector('#chorus');

    navigator.clipboard.writeText(
      `${verse ? `Verse:\r\n${verse.innerHTML}\r\n\r\n` : ''}${
        pre_chorus ? `Pre-chorus:\r\n${pre_chorus.innerHTML}\r\n\r\n` : ''
      }${chorus ? `Chorus:\r\n${chorus.innerHTML}` : ''}`
    );

    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  console.log(`SONG DETAILS`);

  return (
    <SwipeableDrawer
      anchor='right'
      open={expanded}
      onClose={() => handleExpandClick({ song: null, id: null })}
      sx={{
        '& > .MuiDrawer-paper': {
          background: `${theme.palette.background.default}`,
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemText
            primary='Song Title:'
            secondary={
              <div>
                <div style={{ marginBottom: 8 }}>
                  <strong>{drawerData?.song?.title}</strong>
                </div>
                <div>
                  <small style={{ textTransform: 'capitalize' }}>
                    <span style={{ color: theme.palette.text.secondary }}>
                      Artist:
                    </span>{' '}
                    {drawerData?.song?.artist}
                  </small>
                </div>
                <div>
                  <small style={{ textTransform: 'capitalize' }}>
                    <span style={{ color: theme.palette.text.secondary }}>
                      Album:
                    </span>{' '}
                    {drawerData?.song?.album}
                  </small>
                </div>
              </div>
            }
            primaryTypographyProps={{
              sx: {
                fontSize: '0.875rem',
                color: theme.palette.text.primary,
                opacity: 0.7,
              },
            }}
            secondaryTypographyProps={{
              sx: {
                fontSize: '1rem',
                color: theme.palette.text.primary,
                textTransform: 'uppercase',
              },
            }}
          />
        </ListItem>
      </List>

      {(drawerData?.song?.media?.youtube ||
        drawerData?.song?.media?.spotify) && (
        <Media media={drawerData?.song?.media} />
      )}
      <Box sx={{ width: 320, px: 2 }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ zIndex: 2 }}
        >
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            Copied!
          </Alert>
        </Snackbar>
        <List>
          {(drawerData?.song?.lyrics?.verse ||
            drawerData?.song?.chords?.verse) && (
            <ListItem>
              <ListItemText
                primary='Verse:'
                secondary={
                  <TextField
                    id='verse'
                    value={
                      drawerData.id === 'Lyrics'
                        ? drawerData?.song?.lyrics?.verse
                        : drawerData?.song?.chords?.verse
                    }
                    fullWidth
                    disabled
                    variant='standard'
                    multiline
                    sx={{
                      '& textarea.Mui-disabled': {
                        '-webkit-text-fill-color': theme.palette.text.primary,
                        textTransform: 'uppercase',
                      },
                      '& > .Mui-disabled:before': {
                        borderBottomStyle: 'none !important',
                      },
                    }}
                  />
                }
                primaryTypographyProps={{
                  sx: {
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                  },
                }}
              />
            </ListItem>
          )}

          {(drawerData?.song?.lyrics?.pre_chorus ||
            drawerData?.song?.chords?.pre_chorus) && (
            <ListItem>
              <ListItemText
                secondary={
                  <TextField
                    id='pre-chorus'
                    value={
                      drawerData.id === 'Lyrics'
                        ? drawerData?.song?.lyrics?.pre_chorus
                        : drawerData?.song?.chords?.pre_chorus
                    }
                    fullWidth
                    disabled
                    variant='standard'
                    multiline
                    sx={{
                      '& textarea.Mui-disabled': {
                        '-webkit-text-fill-color': theme.palette.text.primary,
                        textTransform: 'uppercase',
                      },
                      '& > .Mui-disabled:before': {
                        borderBottomStyle: 'none !important',
                      },
                    }}
                  />
                }
                primary='Pre-chorus:'
                primaryTypographyProps={{
                  sx: {
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                  },
                }}
              />
            </ListItem>
          )}

          {(drawerData?.song?.lyrics?.chorus ||
            drawerData?.song?.chords?.chorus) && (
            <ListItem>
              <ListItemText
                secondary={
                  <TextField
                    id='chorus'
                    value={
                      drawerData.id === 'Lyrics'
                        ? drawerData?.song?.lyrics?.chorus
                        : drawerData?.song?.chords?.chorus
                    }
                    fullWidth
                    disabled
                    variant='standard'
                    multiline
                    sx={{
                      '& textarea.Mui-disabled': {
                        '-webkit-text-fill-color': theme.palette.text.primary,
                        textTransform: 'uppercase',
                      },
                      '& > .Mui-disabled:before': {
                        borderBottomStyle: 'none !important',
                      },
                    }}
                  />
                }
                primary='Chorus:'
                primaryTypographyProps={{
                  sx: {
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                  },
                }}
              />
            </ListItem>
          )}

          {(drawerData?.song?.lyrics?.bridge ||
            drawerData?.song?.chords?.bridge) && (
            <ListItem>
              <ListItemText
                secondary={
                  <TextField
                    id='bridge'
                    value={
                      drawerData.id === 'Lyrics'
                        ? drawerData?.song?.lyrics?.bridge
                        : drawerData?.song?.chords?.bridge
                    }
                    fullWidth
                    disabled
                    variant='standard'
                    multiline
                    sx={{
                      '& textarea.Mui-disabled': {
                        '-webkit-text-fill-color': theme.palette.text.primary,
                        textTransform: 'uppercase',
                      },
                      '& > .Mui-disabled:before': {
                        borderBottomStyle: 'none !important',
                      },
                    }}
                  />
                }
                primary='Bridge:'
                primaryTypographyProps={{
                  sx: {
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    opacity: 0.7,
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    textTransform: 'uppercase',
                  },
                }}
              />
            </ListItem>
          )}
        </List>

        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleCopy} startIcon={<ContentCopy />}>
            Copy
          </Button>
        </div>
      </Box>
    </SwipeableDrawer>
  );
};

const Media = ({ media }) => {
  const [value, setValue] = useState('1');
  const handleSpotify = (url) => {
    if (url.includes('copy-link')) {
      const new_url = `${url.split('?')[0]}?utm_source=generator&theme=0`;
      return new_url;
    }

    return url;
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(e, newValue) => setValue(newValue)}>
            <Tab
              disabled={!media?.youtube}
              label={
                <div className='flex flex-row items-center gap-2'>
                  <YouTube
                    color='error'
                    className={`${!media?.youtube ? 'text-white/25' : ''}`}
                  />{' '}
                  YouTube
                </div>
              }
              value='1'
              className='text-xs'
            />
            <Tab
              disabled={!media?.spotify}
              label={
                <div className='flex flex-row items-center gap-2'>
                  <img
                    src={SPOTIFY_LOGO}
                    alt=''
                    className={`w-[25px] ${
                      !media?.spotify ? 'grayscale opacity-30' : ''
                    }`}
                  />{' '}
                  Spotify
                </div>
              }
              value='2'
              className='text-xs'
            />
          </TabList>
        </Box>
        <TabPanel value='1' className='p-0'>
          {media?.youtube && (
            <LazyLoad>
              <iframe
                className='w-[100%] h-[160px]'
                title='test'
                src={media?.youtube}
                frameborder='0'
                allowfullscreen=''
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              />
            </LazyLoad>
          )}
        </TabPanel>
        <TabPanel value='2' className='p-0'>
          {media?.spotify && (
            <LazyLoad>
              <iframe
                className='w-[100%] h-[80px]'
                title='test'
                src={handleSpotify(media?.spotify)}
                frameborder='0'
                allowfullscreen=''
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
              />
            </LazyLoad>
          )}
        </TabPanel>
      </TabContext>
    </>
  );
};

export default React.memo(SongDetailsDrawer);
