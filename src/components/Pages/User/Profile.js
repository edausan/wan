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
  Modal,
  CardHeader,
  ListItemAvatar,
} from '@mui/material';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AppCtx } from './../../../App';
import BG from '../../../assets/bg.jpg';
import { Ministries } from './../Auth/Signup';
import {
  AccountCircle,
  AccountCircleOutlined,
  CachedTwoTone,
  ChevronRight,
  Edit,
  Favorite,
  FavoriteBorderOutlined,
  FavoriteTwoTone,
  FormatQuote,
  FormatQuoteOutlined,
  GroupOutlined,
  Settings,
  VerifiedUser,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  GetUserMetadata,
  HeartProfile,
  RealtimeUsers,
} from '../../../Firebase/authApi';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../../../Firebase';
import { GetLineup } from '../../../Firebase/songsApi';
import WritePost from './WritePost';
import FriendsModal from './FriendsModal';
import PhotoHeart from './PhotoHeart';
import UserTabs from './Tabs';
import { RealtimePosts } from '../../../Firebase/postsApi';
import TextArea from '../../CustomComponents/TextArea';

const Profile = () => {
  const theme = useTheme();

  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;

  const params = useParams();
  const history = useHistory();
  const { currentUser, bodyRef, scrollToTop } = useContext(AppCtx);
  const [user, setUser] = useState(null);
  const [userlineup, setUserlineup] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);

  const { data } = RealtimeUsers();
  const { posts } = RealtimePosts();

  useEffect(() => {
    setOpen(false);
    scrollToTop();
    setFriends(data);
  }, [data]);

  useEffect(() => {
    const filtered = posts.filter((p) => p.uid === params.id);
    if (filtered.length > 0) {
      setUserPosts(filtered);
    }
  }, [posts, params]);

  useEffect(() => {
    setOpenFriends(false);

    if (params.id !== 'undefined' && currentUser.user.uid !== params.id) {
      handleGetUser();
    } else {
      setUser({ ...currentUser.user, ...currentUser.user_metadata });
    }
  }, [params, currentUser]);

  // useEffect(() => {
  //   console.log({ params });

  // }, [params])

  const handleGetUser = async () => {
    try {
      const userData = await GetUserMetadata({ id: params.id });
      setUser(userData);
      userData?.ministry === 'VIA' && handleLineups();
    } catch (error) {
      console.log({ handleGetUser_ERR: error });
    }
  };

  const handleLineups = async () => {
    const userLineups = await GetLineup({ id: params.id });
    console.log({ userLineups });
    setUserlineup(
      userLineups.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      )
    );
  };

  const handleHeart = () => {
    console.log({ user });
    const idx = user?.photoHeart?.findIndex((h) => h === userProfile.uid);

    if (idx === -1) {
      HeartProfile({
        heart: {
          photoHeart: user?.photoHeart
            ? [...user?.photoHeart, userProfile?.uid]
            : [userProfile?.uid],
        },
        id: params.id,
      });

      handleGetUser();
    }
  };

  const handleToOther = () => {
    setOpen(false);
  };

  return (
    <>
      <FriendsModal
        open={openFriends}
        setOpen={setOpenFriends}
        user={user}
        friends={friends}
      />

      <PhotoHeart
        friends={friends}
        handleToOther={handleToOther}
        open={open}
        setOpen={setOpen}
        user={user}
      />

      <Card
        sx={{
          mb: 2,
          position: 'relative',
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

        <IconButton
          sx={{ position: 'absolute', top: 8, right: 50, color: '#fff' }}
          onClick={() => window.location.reload()}
        >
          <CachedTwoTone />
        </IconButton>

        <CardMedia
          component='img'
          height='140'
          image={BG}
          alt='A Healing Hope'
          className='min-h-[140px]'
        />
        <CardContent sx={{ position: 'relative', mt: '-70px', pb: 0 }}>
          <Avatar
            onClick={() => setOpen(true)}
            alt={user?.displayName}
            src={user?.photoURL}
            className='w-[100px] h-[100px]'
            sx={{
              border: `6px solid ${
                theme.palette.mode === 'dark' ? '#282828' : '#fff'
              }`,
            }}
          />
          <label
            className='absolute top-[80px] left-[80px] opacity-[0.8]'
            htmlFor='icon-button-file'
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
              onClick={handleHeart}
            >
              {user?.photoHeart?.findIndex((h) => h === userProfile.uid) >=
              0 ? (
                <Favorite
                  color='error'
                  onClick={
                    user?.photoHeart?.findIndex(
                      (h) => h === userProfile.uid
                    ) === -1
                      ? handleHeart
                      : () => setOpen(true)
                  }
                />
              ) : (
                <FavoriteBorderOutlined />
              )}
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
                  user?.ministry === 'ADMIN'
                    ? 'Administrator'
                    : Ministries.filter((m) => m.id === user?.ministry)[0]
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
                  user?.life_verse ? (
                    <TextArea value={user?.life_verse} />
                  ) : (
                    <Skeleton variant='text' height={50} />
                  )
                }
                secondary={'Life Verse'}
              />
            </ListItem>
          </List>
        </CardContent>
        <Divider />

        <CardContent>
          <Typography
            variant='body2'
            sx={{ mb: 1, alignItems: 'center', display: 'flex' }}
            onClick={() => setOpenFriends(true)}
          >
            Friends •{' '}
            {
              friends.filter((f) => f.uid !== params.id).filter((f) => f.uid)
                .length
            }
            <Button
              size='small'
              variant='text'
              sx={{
                fontSize: 12,
                ml: 1,
                pb: 0,
                pt: '2px',
                textTransform: 'capitalize',
              }}
              onClick={() => setOpenFriends(true)}
            >
              Show more
            </Button>
          </Typography>
          <Grid
            container
            spacing={1}
            justifyContent='center'
            alignItems='stretch'
          >
            {friends
              .filter((f) => f.uid !== params.id)
              .filter((f) => f.uid)
              .slice(0, 5)
              .map((f) => {
                return (
                  <Grid
                    item
                    alignItems='stretch'
                    display='flex'
                    justifyContent='center'
                    sx={{ width: 60 }}
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
                            position: 'relative',
                            minHeight: 62,
                            maxHeight: 62,
                            overflow: 'hidden',
                          }}
                          variant='outlined'
                        >
                          {f.photoURL ? (
                            <CardMedia
                              component='img'
                              alt={f.displayName}
                              src={f.photoURL}
                              height={60}
                              sx={{ p: 0 }}
                            />
                          ) : (
                            <Avatar sx={{ m: 'auto', mt: '3px' }} />
                          )}

                          <CardContent
                            sx={{
                              padding: '2px',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              paddingBottom: '2px !important',
                              background: theme.palette.background.paper,
                              backdropFilter: 'blur(1px)',
                            }}
                          >
                            <Typography
                              variant='caption'
                              sx={{
                                textOverflow: 'ellipsis',
                                width: 50,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontSize: 12,
                              }}
                            >
                              <div
                                style={{
                                  textOverflow: 'ellipsis',
                                  // width: 50,
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
        <UserTabs userlineup={userlineup} userPosts={userPosts} user={user} />
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

export default Profile;
