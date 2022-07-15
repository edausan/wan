import { DeleteTwoTone, EditTwoTone } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { DeletePost } from '../../../Firebase/postsApi';

const PostDrawer = ({ open, setOpen, post }) => {
  const handleDelete = async () => {
    try {
      const res = await DeletePost({ id: post.id });
      console.log({ handleDelete: res });
    } catch (error) {
      console.log(error.messahe);
    }
  };

  return (
    <Drawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <List className='min-h-[200px]'>
        <ListItemButton onClick={() => {}}>
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

export default PostDrawer;
