import { DeleteTwoTone, EditTwoTone } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { DeleteAssignment } from '../../../Firebase/assignmentApi';

const AssignmentDrawer = ({ open, setOpen, assignment }) => {
  const handleDelete = async () => {
    try {
      DeleteAssignment({ id: assignment.id });
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Drawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <List>
        <ListItemButton disabled>
          <ListItemIcon>
            <EditTwoTone />
          </ListItemIcon>
          <ListItemText primary='Edit' />
        </ListItemButton>
        <ListItemButton onClick={handleDelete}>
          <ListItemIcon>
            <DeleteTwoTone />
          </ListItemIcon>
          <ListItemText primary='Delete' />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AssignmentDrawer;
