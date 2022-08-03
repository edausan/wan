import { SendTwoTone, DeleteTwoTone } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Drawer,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FirebaseApp } from '../../../Firebase';
import { PostComment } from '../../../Firebase/postsApi';

const PostComments = ({ open, setOpen, post, preview }) => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setComments(post?.comments?.length > 0 ? post.comments : []);
  }, [post]);

  const handleDelete = async (comment) => {
    try {
      await PostComment({
        postId: post.id,
        comments: comments.filter(
          (c) =>
            c.date_created !== comment.date_created &&
            c.user.uid === comment.user.uid
        ),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSend = async () => {
    setSending(true);
    try {
      const data = {
        comment,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        date_created: moment().valueOf(),
      };

      await PostComment({
        postId: post.id,
        comments: [...comments, data],
      });

      setSending(false);
      setComment(null);
    } catch (error) {
      setSending(false);
      console.log(error.message);
    }
  };

  return preview ? (
    <List className='p-0'>
      {comments
        .filter((c, i) => i <= 1)
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .map((comment, idx) => {
          return (
            <Comment
              key={`${idx}${comment.user.uid}`}
              comment={comment}
              handleDelete={handleDelete}
              user={user}
            />
          );
        })}
    </List>
  ) : (
    <Drawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <Card>
        <CardContent>
          <List>
            {comments
              // .sort(
              //   (a, b) => new Date(b.date_created) - new Date(a.date_created)
              // )
              .map((comment, idx) => {
                return (
                  <Comment
                    key={`${idx}${comment.user.uid}`}
                    comment={comment}
                    handleDelete={handleDelete}
                    user={user}
                  />
                );
              })}
          </List>
        </CardContent>
        {!preview && (
          <CardActions>
            <List className='w-full'>
              <ListItem>
                <ListItemIcon>
                  <Avatar src={user?.photoURL} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <FormControl sx={{ m: 1 }} fullWidth>
                      {/* <InputLabel htmlFor='comment'></InputLabel> */}
                      {sending ? (
                        <div>{comment}</div>
                      ) : (
                        <OutlinedInput
                          disabled={sending}
                          placeholder='Write a comment...'
                          fullWidth
                          id='comment'
                          type='text'
                          onChange={(e) => setComment(e.target.value)}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleSend}
                              >
                                <SendTwoTone />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    </FormControl>
                  }
                />
              </ListItem>
            </List>
          </CardActions>
        )}
      </Card>
    </Drawer>
  );
};

const Comment = ({ comment, handleDelete, user }) => {
  return (
    <ListItem>
      <ListItemIcon className='min-w-[42px]'>
        <Avatar src={comment?.user?.photoURL} className='w-[26px] h-[26px]' />
      </ListItemIcon>
      <ListItemText
        primary={<span className='text-sm'>{comment?.user?.displayName}</span>}
        secondary={<span className='text-xs'>{comment?.comment}</span>}
      />
      {user?.uid === comment?.user?.uid && (
        <IconButton onClick={() => handleDelete(comment)}>
          <DeleteTwoTone fontSize='small' />
        </IconButton>
      )}
    </ListItem>
  );
};

export default PostComments;
