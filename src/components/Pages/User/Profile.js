import React, { useContext } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AppCtx } from './../../../App';
import BG from '../../../assets/bg.jpg';
import { Ministries } from './../Auth/Signup';
import {
  AccountCircleOutlined,
  FormatQuote,
  FormatQuoteOutlined,
  GroupOutlined,
  VerifiedUser,
} from '@mui/icons-material';

const Profile = () => {
  const { currentUser } = useContext(AppCtx);
  console.log({ currentUser });
  return (
    <Card sx={{ maxWidth: 360, mb: 2 }}>
      <CardMedia component='img' height='140' image={BG} alt='green iguana' />
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={
                currentUser.user.displayName
                  ? currentUser.user.displayName
                  : currentUser.user.email
              }
              secondary={currentUser.user.email}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GroupOutlined />
            </ListItemIcon>
            <ListItemText
              primary={
                Ministries.filter(
                  (m) => m.id === currentUser.user_metadata?.ministry
                )[0]?.name
              }
              secondary={'Ministry'}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FormatQuote />
            </ListItemIcon>
            <ListItemText
              primary={currentUser?.user_metadata?.life_verse}
              secondary={'Life Verse'}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Link to='edit_profile' style={{ textDecoration: 'none' }}>
          <Button size='small'>Edit Profile</Button>
        </Link>
        {/* <Button size='small'>Learn More</Button> */}
      </CardActions>
    </Card>
  );
};

export default Profile;
