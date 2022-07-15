import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { GetUserMetadata } from '../../../Firebase/authApi';
import {
  DeleteTwoTone,
  EmojiEmotionsTwoTone,
  FavoriteTwoTone,
  MoreVert,
  SentimentVeryDissatisfiedTwoTone,
  ThumbUpOffAlt,
  ThumbUpOffAltOutlined,
  ThumbUpOffAltTwoTone,
  ThumbUpTwoTone,
} from '@mui/icons-material';
import PostDrawer from './PostDrawer';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../../Firebase';
import ReactionDrawer from './ReactionDrawer';
import { ReactPost } from '../../../Firebase/postsApi';

const Post = ({ post, friends }) => {
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [reactionsOpen, setReactionsOpen] = useState(false);

  useEffect(() => {
    handleUSer();
  }, [post]);

  useEffect(() => {}, []);

  useEffect(() => {
    setReactionsOpen(false);
    reaction && handleReact();
  }, [reaction]);

  const handleReact = async () => {
    try {
      const idx =
        post.reactions?.findIndex((r) => r.uid === userProfile.uid) === -1;
      const reacts =
        idx === -1
          ? post.reactions
          : post.reactions.filter((r) => r.uid !== userProfile.uid);
      const reactions = [
        ...reacts,
        {
          uid: userProfile.uid,
          reaction,
        },
      ];
      const res = await ReactPost({ postId: post.id, reactions });
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
        break;
    }
  };

  const handleUSer = async () => {
    try {
      const user = await GetUserMetadata({ id: post.uid });
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleHeart = async () => {};

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={user?.photoURL} aria-label='recipe'>
            {user?.displayName.split('')[0]}
          </Avatar>
        }
        action={
          post?.uid === userProfile?.uid && (
            <IconButton aria-label='settings' onClick={() => setOpen(true)}>
              <MoreVert />
            </IconButton>
          )
        }
        title={user?.displayName}
        subheader={post?.date_created}
      />
      {post.media && <CardMedia src={post.media} component='img' />}
      <CardContent>
        <p>{post.message}</p>
      </CardContent>
      {post?.reactions?.length > 0 && (
        <>
          <Divider />
          <CardContent className='p-2 flex flex-row'>
            <AvatarGroup
              className='self-start'
              max={4}
              sx={{
                '& > .MuiAvatar-root': {
                  width: 20,
                  height: 20,
                },
                '& .MuiAvatarGroup-avatar': {
                  border: '3px solid #282626',
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
          </CardContent>
        </>
      )}
      <Divider />

      <CardActions>
        <Button
          variant='text'
          aria-label='add to favorites'
          onClick={() => setReactionsOpen(true)}
          startIcon={
            post?.reactions.findIndex((r) => r.uid === userProfile.uid) !==
              -1 || reaction ? (
              handleReactions(
                reaction ||
                  post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
                    ?.reaction
              )?.icon
            ) : (
              <ThumbUpOffAltOutlined onClick={handleHeart} />
            )
          }
        >
          <span
            className={`!capitalize ${
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
                  ?.reaction?.slice(1) ||
              'React'}
          </span>
        </Button>
      </CardActions>

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
    </Card>
  );
};

export default Post;
