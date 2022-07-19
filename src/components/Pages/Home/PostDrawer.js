import {
  DeleteTwoTone,
  EditTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
} from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { FirebaseApp } from '../../../Firebase';
import { DeletePost } from '../../../Firebase/postsApi';

const PostDrawer = ({ open, setOpen, post }) => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const handleDelete = async () => {
    try {
      console.log({ post });
      const res = await DeletePost({ id: post?.id });
      console.log({ handleDelete: res });
    } catch (error) {
      console.log(error.messahe);
    }
  };

  return (
    <Drawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <List>
        <Link to={`/post/${post?.id}`}>
          <ListItemButton>
            <ListItemIcon>
              <VisibilityTwoTone />
            </ListItemIcon>
            <ListItemText primary='View Post' />
          </ListItemButton>
        </Link>

        {post?.uid === user?.uid && (
          <>
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
          </>
        )}
      </List>
    </Drawer>
  );
};

export default PostDrawer;
