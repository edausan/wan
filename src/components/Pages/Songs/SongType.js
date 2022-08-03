import { MusicNoteTwoTone } from '@mui/icons-material';
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';

const SongType = ({ open, setOpen, setSongType }) => {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle className='text-sm'>Select Song Type</DialogTitle>
      <List>
        <ListItemButton onClick={() => setSongType('Joyful')}>
          <ListItemIcon>
            <Avatar>
              <MusicNoteTwoTone />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary='Joyful Song' />
        </ListItemButton>

        <ListItemButton onClick={() => setSongType('Solemn')}>
          <ListItemIcon>
            <Avatar>
              <MusicNoteTwoTone />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary='Solemn Song' />
        </ListItemButton>
      </List>
    </Dialog>
  );
};

export default SongType;
