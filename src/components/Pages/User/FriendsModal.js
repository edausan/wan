import { AccountCircle, Favorite, Group } from '@mui/icons-material';
import {
  Modal,
  Card,
  CardContent,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const FriendsModal = ({ open, setOpen, user, friends, handleToOther }) => {
  const theme = useTheme();
  const params = useParams();
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Card
        sx={{
          // p: 2,
          width: '90%',
          minWidth: 300,
          maxWidth: 400,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxSizing: 'border-box',
        }}
      >
        <CardContent
          sx={{
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1002,
            background: theme.palette.background.paper,
            backdropFilter: 'blur(5px)',
            borderBottom: `1px solid ${theme.palette.background.default}`,
          }}
        >
          <IconButton sx={{ p: 0, mr: '6px' }}>
            <Group />
          </IconButton>
          <Typography variant='caption'>
            Friends •{' '}
            {
              friends.filter((f) => f.uid !== params.id).filter((f) => f.uid)
                .length
            }
          </Typography>
        </CardContent>
        {/* <Divider /> */}

        <CardContent
          sx={{
            maxHeight: 400,
            overflow: 'auto',
            position: 'relative',
            zIndex: 1001,
            pt: '57px',
          }}
        >
          <List>
            {friends
              .filter((f) => f.uid !== params.id)
              .filter((f) => f.uid)
              .map((friend) => {
                return (
                  <Link
                    to={`/profile/${friend?.uid}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItem onClick={() => setOpen(false)}>
                      <ListItemAvatar>
                        <Avatar src={friend?.photoURL}>
                          <AccountCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          friend?.displayName
                            ? friend?.displayName
                            : friend?.email
                        }
                        // secondary={
                        //   friends?.filter((f) => f.uid === h)[0]?.ministry
                        // }
                      />
                    </ListItem>
                  </Link>
                );
              })}
          </List>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default FriendsModal;
