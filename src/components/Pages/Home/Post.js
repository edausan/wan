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
  Modal,
  TextField,
} from '@mui/material';
import { GetUserMetadata, RealtimeUsers } from '../../../Firebase/authApi';
import {
  CommentTwoTone,
  DeleteTwoTone,
  EmojiEmotionsTwoTone,
  FavoriteTwoTone,
  MoreVert,
  SendTwoTone,
  SentimentVeryDissatisfiedTwoTone,
  ShareTwoTone,
  ThumbUpOffAlt,
  ThumbUpOffAltOutlined,
  ThumbUpOffAltTwoTone,
  ThumbUpTwoTone,
} from '@mui/icons-material';
import PostDrawer from './PostDrawer';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../../Firebase';
import ReactionDrawer from './ReactionDrawer';
import { GetPost, ReactPost } from '../../../Firebase/postsApi';
import { Link, useParams } from 'react-router-dom';
import ReactionsModal from './ReactionsModal';
import { AppCtx } from '../../../App';
import PostComments from './PostComments';
import TextArea from './../../CustomComponents/TextArea';

const Post = ({ post: current, friends: wan }) => {
  const params = useParams();
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;
  const { scrollToTop } = useContext(AppCtx);
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

  const { data } = RealtimeUsers();

  useEffect(() => {
    setMsg(current?.message.split('#')[0].trim());
    const tags = current?.message.split('#').filter((t, i) => i !== 0);
    setHashtags(tags);
    setPost(current);
  }, [current]);

  useEffect(() => {
    setFriends(wan || data);
  }, [wan, data]);

  useEffect(() => {
    handleUSer();
  }, [post]);

  useEffect(() => {
    params.id && getPost();
  }, [params]);

  useEffect(() => {
    setReactionsOpen(false);
    reaction && handleReact();
  }, [reaction]);

  const getPost = async () => {
    scrollToTop();
    try {
      const post = await GetPost({ id: params.id });
      console.log({ post });
      setPost(post);
      setMsg(post?.message.split('#')[0].trim());
      const tags = post?.message.split('#').filter((t, i) => i !== 0);
      setHashtags(tags);
    } catch (error) {
      console.log(error.message);
    }
  };

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
      const res = await ReactPost({ postId: post?.id, reactions });
      console.log({ handleReact: res });
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

  const handleUSer = async () => {
    try {
      const user = await GetUserMetadata({ id: post?.uid });
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleHeart = async () => {};

  return (
    <Card>
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
            <Avatar src={user?.photoURL} aria-label='recipe'>
              {user?.displayName.split('')[0]}
            </Avatar>
          </Link>
        }
        action={
          <IconButton aria-label='settings' onClick={() => setOpen(true)}>
            <MoreVert />
          </IconButton>
        }
        title={
          <Link to={`/profile/${post?.uid}`}>
            <span className='text-sm'>{user?.displayName}</span>
          </Link>
        }
        subheader={<span className='text-xs'>{post?.date_created}</span>}
      />
      {post?.media && <CardMedia src={post?.media} component='img' />}
      <CardContent>
        <TextArea value={msg} />
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

      <CardActions className='justify-center grid grid-cols-3 p-0'>
        <Button
          className='col-span-1 ml-0'
          variant='text'
          onClick={() => setReactionsOpen(true)}
          startIcon={
            post?.reactions.findIndex((r) => r?.uid === userProfile?.uid) !==
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

export default Post;
