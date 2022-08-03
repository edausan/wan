/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Skeleton,
} from '@mui/material';
import { GetUserMetadata } from '../../../Firebase/authApi';
import {
  CommentTwoTone,
  EmojiEmotionsTwoTone,
  FavoriteTwoTone,
  MoreVert,
  SentimentVeryDissatisfiedTwoTone,
  ShareTwoTone,
  ThumbUpOffAltOutlined,
  ThumbUpTwoTone,
} from '@mui/icons-material';
import PostDrawer from './PostDrawer';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../../Firebase';
import ReactionDrawer from './ReactionDrawer';
import { GetPost, ReactPost } from '../../../Firebase/postsApi';
import { Link, useParams } from 'react-router-dom';
import ReactionsModal from './ReactionsModal';
import PostComments from './PostComments';
import TextArea from './../../CustomComponents/TextArea';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../redux/slices/usersSlice';
import { selectPost } from '../../../redux/slices/postsSlice';
import { AppCtx } from '../../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Post = ({ post: current }) => {
  const params = useParams();
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;
  const { scrollToTop } = useContext(AppCtx);

  const users = useSelector(selectUsers);
  const { posts } = useSelector(selectPost);

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [openReacions, setOpenReactions] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [post, setPost] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (current?.post.id) {
      handlePost(current, 'if');
    } else if (posts.length <= 0 && params?.id) {
      handleGetPost();
    } else if (posts.length > 0) {
      const filtered = posts.filter(
        (p) => p.post.uid === params?.id || p.post.id === params?.id
      )[0];
      handlePost(filtered, 'else');
    }
  }, [current, params, posts]);

  const handleGetPost = async () => {
    try {
      const id = params?.id;
      const user = await GetUserMetadata({ id });
      const res = await GetPost({ id });
      if (res.id && user.uid) {
        handlePost({ post: res, user }, 'else if');
      }
    } catch (error) {}
  };

  const handlePost = (postData, from) => {
    // console.log({ postData, from, current });
    setMsg(postData?.post?.message?.split('#')[0].trim());
    const tags = postData?.post?.message?.split('#').filter((t, i) => i !== 0);
    setHashtags(tags);
    setPost(postData.post);
    setUser(postData.user);
  };

  useEffect(() => {
    setFriends(users.users);
  }, [users]);

  useEffect(() => {
    setReactionsOpen(false);
    reaction && handleReact();
  }, [reaction]);

  const handleReact = async () => {
    try {
      const idx =
        post?.reactions?.findIndex((r) => r.uid === userProfile.uid) === -1;
      const reacts =
        idx === -1
          ? post?.reactions
          : post?.reactions.filter((r) => r.uid !== userProfile.uid);
      const reactions = [
        ...reacts,
        {
          uid: userProfile.uid,
          reaction,
        },
      ];
      await ReactPost({ postId: post?.id, reactions });
      setReaction(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReactions = (reaction, list) => {
    switch (reaction) {
      case 'love':
        return {
          icon: <FavoriteTwoTone className='text-red-500' />,
          color: 'text-red-500',
        };
      case 'like':
        return {
          icon: <ThumbUpTwoTone className='text-blue-500' />,
          color: 'text-blue-500',
        };
      case 'haha':
        return {
          icon: <EmojiEmotionsTwoTone className='text-yellow-500' />,
          color: 'text-yellow-500',
        };
      case 'sad':
        return {
          icon: (
            <SentimentVeryDissatisfiedTwoTone className='text-purple-500' />
          ),
          color: 'text-purple-500',
        };

      default:
        return {
          icon: null,
          color: '#ccc',
        };
    }
  };
  const handleHeart = async () => {};

  useEffect(() => {
    if (post?.media_type === 'video/mp4') {
      const media = post?.media
        .split('video/upload')
        .join('video/upload/f_jpg');
      console.log({ media });
    }
  }, [post]);

  return (
    <Card className='w-full'>
      <ReactionsModal
        setOpen={setOpenReactions}
        open={openReacions}
        friends={friends}
        reactions={post?.reactions}
        handleReactions={handleReactions}
      />
      <CardHeader
        avatar={
          <Link to={`/profile/${post?.uid}`}>
            {user?.photoURL ? (
              <Avatar src={user?.photoURL} aria-label='recipe'>
                {user?.displayName.split('')[0]}
              </Avatar>
            ) : (
              <Skeleton variant='circular' width={40} height={40} />
            )}
          </Link>
        }
        action={
          <IconButton aria-label='settings' onClick={() => setOpen(true)}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Link to={`/profile/${post?.uid}`}>
            {user?.displayName ? (
              <span className='text-sm'>{user?.displayName}</span>
            ) : (
              <Skeleton variant='text' />
            )}
          </Link>
        }
        subheader={
          <span className='text-xs'>
            {post?.date_created ? (
              post?.date_created
            ) : (
              <Skeleton variant='text' />
            )}
          </span>
        }
      />
      {post?.media_type === 'video/mp4' ? (
        <CardMedia
          src={post?.media}
          component='video'
          controls
          preload='none'
          poster={post?.media.split('video/upload').join('video/upload/f_jpg')}
        />
      ) : (
        <LazyLoadImage
          alt='demonstration1'
          effect='blur'
          placeholder={<Skeleton variant='rectangular' height={350} />}
          src={post?.media}
        />
      )}
      <CardContent>
        <TextArea
          value={msg}
          size='.85rem'
          styles={{ lineHeight: '1.35rem' }}
        />
        {/* <TextField
          disabled
          multiline
          value={msg}
          fullWidth
          className='first:px-0'
          sx={{
            border: 'none',
            '& > .MuiOutlinedInput-root': {
              p: 0,
              border: 'none',
              '& textarea': {
                border: 'none',
                '-webkit-text-fill-color': '#fff',
                fontSize: '0.875rem',
              },
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        /> */}

        <div>
          {hashtags?.map((hash) => {
            return (
              <Link to='#' className='no-underline text-sky-500 italic'>
                #{hash}
              </Link>
            );
          })}
        </div>
        {/* <p className='text-sm'>{post?.message}</p> */}
      </CardContent>
      {post?.reactions?.length > 0 && (
        <>
          <Divider />
          <CardContent
            onClick={() => setOpenReactions(true)}
            className='p-2 flex flex-row items-center'
          >
            <AvatarGroup
              className='self-start'
              max={5}
              sx={{
                '& > .MuiAvatar-root': {
                  width: 20,
                  height: 20,
                },
                '& .MuiAvatarGroup-avatar': {
                  border: '3px solid #282626',
                  '&:first-child': {
                    display: post?.reactions?.length > 3 ? 'none' : 'flex',
                  },
                  //   p: '.25rem',
                  //   background: '#333',
                },
              }}
            >
              {post?.reactions?.map((r) => {
                const user = friends?.filter((f) => f.uid === r?.uid)[0];
                return (
                  <Avatar
                    alt={user?.displayName}
                    src={user?.photoURL}
                    className={`text-[8px] !bg${
                      handleReactions(r.reaction)?.color.split('text')[1]
                    }`}
                  >
                    {/* {handleReactions(r.reaction)?.icon} */}
                  </Avatar>
                );
              })}
            </AvatarGroup>
            <div className='text-xs ml-2'>
              {post?.reactions?.map((r, i) => {
                const user = friends?.filter((f) => f.uid === r?.uid)[0];
                if (i <= 1) {
                  return (
                    <>
                      <span>
                        {i >= 1 && ', '}
                        {user?.displayName}
                      </span>
                    </>
                  );
                }
              })}

              {post?.reactions?.length > 2 && (
                <span>
                  {' '}
                  and {post?.reactions?.length - 2} other
                  {post?.reactions?.length - 2 > 1 && 's'}
                </span>
              )}
            </div>
          </CardContent>
        </>
      )}
      <Divider />

      <CardActions className='justify-center grid grid-cols-3 p-1'>
        <Button
          className='col-span-1 ml-0'
          variant='text'
          onClick={() => setReactionsOpen(true)}
          startIcon={
            post?.reactions?.findIndex((r) => r?.uid === userProfile?.uid) !==
              -1 || reaction ? (
              handleReactions(
                reaction ||
                  post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
                    ?.reaction
              )?.icon
            ) : (
              <ThumbUpOffAltOutlined
                className='text-white/40'
                onClick={handleHeart}
              />
            )
          }
        >
          <span
            className={`!capitalize text-xs ${
              handleReactions(
                reaction ||
                  post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
                    ?.reaction
              )?.color
            }`}
          >
            {reaction?.charAt(0).toUpperCase() + reaction?.slice(1) ||
              post?.reactions
                ?.filter((r) => r?.uid === userProfile?.uid)[0]
                ?.reaction?.charAt(0)
                .toUpperCase() +
                post?.reactions
                  ?.filter((r) => r?.uid === userProfile?.uid)[0]
                  ?.reaction?.slice(1) || (
                <span className='text-white/40'>Like</span>
              )}
          </span>
        </Button>
        <Button
          variant='text'
          className={`!ml-0 ${
            post?.comments?.length > 0 ? 'text-sky-500' : 'text-white/40'
          } col-span-1`}
          startIcon={<CommentTwoTone className='w-[16px] h-[16px]' />}
          onClick={() => setOpenComments(true)}
        >
          <span className='!capitalize text-xs'>
            Comment
            {post?.comments?.length > 1 ? (
              <span className='lowercase'>s</span>
            ) : (
              ''
            )}{' '}
            <span>({post?.comments?.length})</span>
          </span>
        </Button>
        <Button
          variant='text'
          color='inherit'
          className='ml-0 text-white/40 col-span-1'
          startIcon={<ShareTwoTone className='w-[16px] h-[16px]' />}
        >
          <span className='!capitalize text-xs'>Share</span>
        </Button>
      </CardActions>

      {post?.comments?.length > 0 && (
        <>
          <Divider />
          <CardContent className='!pb-1 p-1'>
            <PostComments
              open={openComments}
              setOpen={setOpenComments}
              post={post}
              preview
            />
          </CardContent>
        </>
      )}

      <ReactionDrawer
        open={reactionsOpen}
        setOpen={setReactionsOpen}
        setReaction={setReaction}
        reaction={
          reaction ||
          post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
            ?.reaction
        }
        post={post}
      />
      <PostDrawer open={open} setOpen={setOpen} post={post} />
      <PostComments open={openComments} setOpen={setOpenComments} post={post} />
    </Card>
  );
};

export default React.memo(Post);
