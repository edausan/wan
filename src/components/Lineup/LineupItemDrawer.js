import { DeleteTwoTone, EditTwoTone } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { ADMIN } from '../../data';

const LineupItemDrawer = ({
  open,
  setOpen,
  handleDelete,
  handleEdit,
  user,
  lineup,
}) => {
  return (
    <Drawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <List>
        {(user.uid === ADMIN || user.uid === lineup.worship_leader?.uid) && (
          <ListItemButton onClick={handleEdit}>
            <ListItemIcon>
              <EditTwoTone />
            </ListItemIcon>
            <ListItemText primary='Edit' />
          </ListItemButton>
        )}
        {user.uid === lineup.worship_leader?.uid && (
          <ListItemButton onClick={handleDelete}>
            <ListItemIcon>
              <DeleteTwoTone />
            </ListItemIcon>
            <ListItemText primary='Delete' />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default LineupItemDrawer;
