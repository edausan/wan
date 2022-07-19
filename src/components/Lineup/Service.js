import { ChurchTwoTone } from '@mui/icons-material';
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const Service = ({ setOpen, open, service, setService }) => {
  // const [services, setService] = useState(null)
  useEffect(() => {
    setOpen(false);
  }, [service]);
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Select Worship Service</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem
          autoFocus={service === 'Worship Service | Belleview'}
          button
          onClick={() => setService('Worship Service | Belleview')}
        >
          <ListItemAvatar>
            <Avatar>
              <ChurchTwoTone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Belleview' />
        </ListItem>

        <ListItem
          autoFocus={service === 'Worship Service | Lumina'}
          button
          onClick={() => setService('Worship Service | Lumina')}
        >
          <ListItemAvatar>
            <Avatar>
              <ChurchTwoTone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Lumina' />
        </ListItem>
        <ListItem
          autoFocus={service === 'Youth Service'}
          button
          onClick={() => setService('Youth Service')}
        >
          <ListItemAvatar>
            <Avatar>
              <ChurchTwoTone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Youth Service' />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default Service;
