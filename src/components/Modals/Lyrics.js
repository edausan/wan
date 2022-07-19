import {
  TextField,
  Typography,
  Card,
  CardActions,
  IconButton,
  List,
  ListItem,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import ClickAwayListener from '@mui/base/ClickAwayListener';

const Lyrics = ({ setCardData, cardData, setOpen, category }) => {
  const [lyrics, setLyrics] = useState({
    verse: null,
    pre_chorus: null,
    chorus: null,
  });

  const [anchorEl, setAnchorEl] = useState(null);

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
      />
      <TextField
        label='Pre-chorus'
        fullWidth
        variant='standard'
        multiline
        value={lyrics.pre_chorus}
        sx={{ mb: 2 }}
        onChange={(e) => setLyrics({ ...lyrics, pre_chorus: e.target.value })}
      />
      <TextField
        label='Chorus'
        fullWidth
        variant='standard'
        multiline
        value={lyrics.chorus}
        onChange={(e) => setLyrics({ ...lyrics, chorus: e.target.value })}
      />

      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <CardActions sx={{ justifyContent: 'right', mt: 2 }}>
          <IconButton
            size='small'
            color={isOpen ? 'secondary' : 'inherit'}
            onClick={(event) =>
              isOpen ? setAnchorEl(null) : setAnchorEl(event.currentTarget)
            }
          >
            <Add />
          </IconButton>
          <PopperUnstyled
            id={id}
            open={isOpen}
            anchorEl={anchorEl}
            disablePortal
            keepMounted
            placement='left-start'
          >
            <Card
              variant='outlined'
              sx={{ my: 2, boxShadow: 'md', borderRadius: 'sm' }}
            >
              <List role='menu'>
                <ListItem role='listitem'>
                  <Button startIcon={<Add />} color='inherit'>
                    Verse
                  </Button>
                </ListItem>
                <ListItem role='none'>
                  <Button startIcon={<Add />} color='inherit'>
                    Chorus
                  </Button>
                </ListItem>
                <ListItem role='none'>
                  <Button startIcon={<Add />} color='inherit'>
                    Refrain
                  </Button>
                </ListItem>
              </List>
            </Card>
          </PopperUnstyled>

          <Button
            size='small'
            onClick={() =>
              setOpen({ id: null, status: false, song_title: null })
            }
          >
            Done
          </Button>
        </CardActions>
      </ClickAwayListener>
    </Card>
  );
};

export default Lyrics;
