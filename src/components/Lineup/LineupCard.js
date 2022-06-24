import React from 'react';
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Card,
  IconButton,
} from '@mui/material';
import {
  NoteAlt,
  MusicNote,
  PlayArrow,
  CloseOutlined,
} from '@mui/icons-material';

const LineupCard = ({ category, setOpen }) => {
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 2, mb: 2 }}>
        <FormControl fullWidth>
          <TextField
            label={category.label}
            fullWidth
            size='small'
            variant='standard'
          />
        </FormControl>

        <Grid container sx={{ mt: 1 }} spacing={1} justifyContent='left'>
          <Grid item xs={6} md={3}>
            <TextField
              label='Artist'
              fullWidth
              size='small'
              variant='standard'
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              label='Album'
              fullWidth
              size='small'
              variant='standard'
            />
          </Grid>

          <Grid item xs={6} md={6} sx={{ textAlign: 'left' }}>
            <Button
              variant='text'
              color='primary'
              disableElevation
              size='small'
              sx={{ minWidth: '40px !important' }}
              onClick={() => setOpen({ id: 'Lyrics', status: true })}
            >
              <NoteAlt fontSize='small' />
            </Button>
            <Button
              variant='text'
              color='secondary'
              disableElevation
              size='small'
              sx={{ minWidth: '40px !important' }}
              onClick={() => setOpen({ id: 'Chords', status: true })}
            >
              <MusicNote fontSize='small' />
            </Button>
            <Button
              variant='text'
              color='error'
              disableElevation
              size='small'
              sx={{ minWidth: '40px !important' }}
              onClick={() => setOpen({ id: 'Media', status: true })}
            >
              <PlayArrow fontSize='small' />
            </Button>
          </Grid>
          {/* <Grid item xs={2} md={2}>
            
          </Grid>
          <Grid item xs={2} md={2}>
            
          </Grid> */}
          {/* <Grid item xs={6} md={6} display='flex' justifyContent='right'>
            <Button
              variant='text'
              color='inherit'
              disableElevation
              size='small'
              sx={{ minWidth: '40px !important' }}
            >
              <CloseOutlined fontSize='small' />
            </Button>
          </Grid> */}
        </Grid>
      </Card>
    </Grid>
  );
};

export default LineupCard;
