import React, { useContext, useEffect, useState } from 'react';
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
  Avatar,
  useTheme,
  Divider,
  Skeleton,
  IconButton,
  Box,
  Tabs,
  Tab,
  TextField,
  Chip,
} from '@mui/material';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AppCtx } from './../../../App';
import BG from '../../../assets/bg.jpg';
import { Ministries } from './../Auth/Signup';
import {
  AccountCircleOutlined,
  ChevronRight,
  Edit,
  FormatQuote,
  FormatQuoteOutlined,
  GroupOutlined,
  Settings,
  VerifiedUser,
  VisibilityOutlined,
} from '@mui/icons-material';
import { GetUserMetadata } from '../../../Firebase/authApi';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../../../Firebase';
import { GetLineup } from '../../../Firebase/songsApi';
import LineupItem from './../../Lineup/LineupItem';
import WritePost from './WritePost';

const Profile = () => {
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;

  const params = useParams();
  const history = useHistory();
  const theme = useTheme();
  const { currentUser } = useContext(AppCtx);
  console.log({ currentUser });
  const [user, setUser] = useState(null);
  const [userlineup, setUserlineup] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    console.log(params.id);
    handleLineups();
    if (params.id !== 'undefined' && currentUser.user.uid !== params.id) {
      handleGetUser();
    } else {
      setUser({ ...currentUser.user, ...currentUser.user_metadata });
    }
  }, [params, currentUser]);

  const handleGetUser = async () => {
    try {
      const userData = await GetUserMetadata({ id: params.id });
      setUser(userData);
    } catch (error) {
      console.log({ handleGetUser_ERR: error });
    }
  };

  const handleLineups = async () => {
    const userLineups = await GetLineup({ id: params.id });
    setUserlineup(
      userLineups.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      )
    );
    console.log({ userLineups });
  };

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <>
      <Card sx={{ mb: 2, position: 'relative' }}>
        {params.id === userProfile?.uid && (
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
            onClick={() => history.push('/settings')}
          >
            <Settings />
          </IconButton>
        )}

        <CardMedia component='img' height='140' image={BG} alt='green iguana' />
        <CardContent sx={{ position: 'relative', mt: '-65px', pb: 0 }}>
          <Avatar
            alt='Remy Sharp'
            src={user?.photoURL}
            sx={{
              width: 100,
              height: 100,
              border: `6px solid ${
                theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff'
              }`,
            }}
          />
        </CardContent>
        <CardContent sx={{ pt: 0 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  user?.displayName
                    ? user?.displayName
                    : user?.email || <Skeleton variant='text' />
                }
                secondary={user?.email}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <GroupOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  Ministries.filter((m) => m.id === user?.ministry)[0]
                    ?.name || <Skeleton variant='text' />
                }
                secondary={'Ministry'}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FormatQuote />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ sx: { fontSize: 14 } }}
                primary={
                  user?.life_verse || (
                    <Skeleton variant='rectangular' width={210} height={118} />
                  )
                }
                secondary={'Life Verse'}
              />
            </ListItem>
          </List>
        </CardContent>
        <Divider />
        {params.id === userProfile?.uid && (
          <CardActions sx={{ justifyContent: 'right', diplay: 'flex', p: 0 }}>
            {/* <Link
              to='/edit_profile'
              style={{ textDecoration: 'none', width: '100%', flex: 1 }}
            >
              <Button
                startIcon={<VisibilityOutlined />}
                size='small'
                fullWidth
                sx={{ px: 2, py: 2 }}
              >
                View Profile
              </Button>
            </Link> */}
            <Link
              to='/edit_profile'
              style={{ textDecoration: 'none', width: '100%', flex: 1 }}
            >
              <Button
                startIcon={<Edit />}
                size='small'
                fullWidth
                sx={{ px: 2, py: 1 }}
              >
                Edit Profile
              </Button>
            </Link>
          </CardActions>
        )}
      </Card>

      <WritePost />

      <Card>
        <BasicTabs userlineup={userlineup} userPosts={userPosts} />
      </Card>

      {/* {params.id === userProfile?.uid && (
        <Card sx={{ mb: 1 }}>
          <Button
            fullWidth
            startIcon={<Settings />}
            endIcon={<ChevronRight />}
            color='inherit'
            onClick={() => history.push('/settings')}
            sx={{
              justifyContent: 'left',
              px: 2,
              py: 2,
              '& > .MuiButton-endIcon': {
                flex: 1,
                justifyContent: 'right',
              },
            }}
          >
            Settings
          </Button>
        </Card>
      )} */}
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 1,
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const BasicTabs = ({ userlineup, userPosts }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Lineup' {...a11yProps(0)} />
          <Tab label='Posts' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {userlineup.length > 0 ? (
          userlineup.map((l, i) => {
            return (
              <LineupItem
                key={l.id}
                lineup={l}
                isBordered
                isLast={userlineup.length - 1 === i}
              />
            );
          })
        ) : (
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            No lineup yet.
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {userPosts.length > 0 ? (
          userPosts.map((p) => {
            return <LineupItem key={p.id} lineup={p} isBordered />;
          })
        ) : (
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            No post yet.
          </Typography>
        )}
      </TabPanel>
    </Box>
  );
};

export default Profile;
