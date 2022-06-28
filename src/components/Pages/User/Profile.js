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
  hexToRgb,
  Grid,
} from '@mui/material';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AppCtx } from './../../../App';
import BG from '../../../assets/bg.jpg';
import { Ministries } from './../Auth/Signup';
import {
  AccountCircleOutlined,
  ChevronRight,
  Edit,
  Favorite,
  FavoriteBorderOutlined,
  FormatQuote,
  FormatQuoteOutlined,
  GroupOutlined,
  Settings,
  VerifiedUser,
  VisibilityOutlined,
} from '@mui/icons-material';
import { GetUserMetadata, RealtimeUsers } from '../../../Firebase/authApi';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../../../Firebase';
import { GetLineup } from '../../../Firebase/songsApi';
import LineupItem from './../../Lineup/LineupItem';
import WritePost from './WritePost';
import { Glass } from '../../../data';

const Profile = () => {
  const theme = useTheme();

  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;

  const params = useParams();
  const history = useHistory();
  const { currentUser } = useContext(AppCtx);
  console.log({ currentUser });
  const [user, setUser] = useState(null);
  const [userlineup, setUserlineup] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  const { data } = RealtimeUsers();

  useEffect(() => {
    setFriends(data);
    console.log({ USERS: data });
  }, [data]);

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
      <Card
        sx={{
          mb: 2,
          position: 'relative',
          backdropFilter: 'blur(5px)',
        }}
      >
        {params.id === userProfile?.uid && (
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
            onClick={() => history.push('/settings')}
          >
            <Settings />
          </IconButton>
        )}

        <CardMedia component='img' height='140' image={BG} alt='green iguana' />
        <CardContent sx={{ position: 'relative', mt: '-70px', pb: 0 }}>
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
          <label
            htmlFor='icon-button-file'
            style={{
              position: 'absolute',
              top: 80,
              left: 94,
              opacity: 0.8,
            }}
          >
            <IconButton
              color='inherit'
              aria-label='upload picture'
              component='span'
              sx={{
                background: '#757575ba',
                '&:visited, &:focus ,&:active, &:hover': {
                  background: '#757575ba',
                },
              }}
            >
              <FavoriteBorderOutlined />
            </IconButton>
          </label>
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

        <CardContent>
          <Typography variant='body2' sx={{ mb: 1 }}>
            Friends
          </Typography>
          <Grid
            container
            spacing={1}
            justifyContent='left'
            alignItems='stretch'
          >
            {friends
              .filter((f) => f.uid !== params.id)
              .filter((f) => f.uid)
              .map((f) => {
                return (
                  <Grid
                    item
                    alignItems='stretch'
                    display='flex'
                    sx={{ width: 75 }}
                  >
                    {f.uid ? (
                      <Link
                        to={`/profile/${f.uid}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          width: '100%',
                        }}
                      >
                        <Card
                          sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                          variant='outlined'
                        >
                          {f.photoURL ? (
                            <CardMedia
                              component='img'
                              alt={f.displayName}
                              src={f.photoURL}
                              height={55}
                              sx={{ p: 0 }}
                            />
                          ) : (
                            <Avatar sx={{ margin: '10px auto 5px' }} />
                          )}

                          <CardContent
                            sx={{
                              padding: '8px',
                              paddingBottom: '8px !important',
                            }}
                          >
                            <Typography
                              variant='caption'
                              sx={{
                                textOverflow: 'ellipsis',
                                width: 50,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <div
                                style={{
                                  textOverflow: 'ellipsis',
                                  width: 50,
                                  textAlign: 'center',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                }}
                              >
                                {f.displayName
                                  ? f.displayName.split(' ')[0]
                                  : f.email.split('@gmail.com')[0]}
                              </div>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Link>
                    ) : (
                      <Card
                        sx={{
                          p: 1,
                          justifyContent: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          height: 'auto',
                        }}
                      >
                        <CardMedia
                          component='div'
                          alt={f.displayName || f.email}
                        >
                          <Avatar aria-label='recipe' src={f.photoURL}></Avatar>
                        </CardMedia>
                        <CardContent>
                          <Typography variant='caption' sx={{ mt: 1 }}>
                            <div
                              style={{
                                textOverflow: 'ellipsis',
                                width: 37,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                              }}
                            >
                              {f.displayName
                                ? f.displayName.split(' ')[0]
                                : f.email.split('@gmail.com')[0]}
                            </div>
                          </Typography>
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                );
              })}
          </Grid>
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

      {params.id === userProfile?.uid && <WritePost />}

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
            console.log({ l });
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
