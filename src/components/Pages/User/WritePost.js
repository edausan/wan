import {
  ImageTwoTone,
  Send,
  SignalCellularNullOutlined,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  TextField,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseApp } from '../../../Firebase';
import { CreatePost, UploadPostMedia } from '../../../Firebase/postsApi';
import useResize from '../../../hooks/useResize';

const WritePost = () => {
  const history = useHistory();
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  // const reader = new FileReader();
  const [imageUpload, setImageUpload] = useState(null);
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  // const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { resized, processfile } = useResize({ quality: 1 });

  useEffect(() => {
    imageUpload && processfile(imageUpload);
    console.log({ imageUpload });
  }, [imageUpload]);

  useEffect(() => {
    console.log({ resized });
    setPhotoURL(resized);
  }, [resized]);

  const handlePost = async () => {
    setUploading(true);
    try {
      const post = {
        uid: user.uid,
        message,
        media: photoURL,
        date_created: moment().format('LLLL'),
        reactions: [],
        comments: [],
      };
      const res = await CreatePost({ post });
      console.log({ id: res.id });

      if (res?.id) {
        // setSuccess(true);
        setTimeout(() => {
          setMessage(null);
          setImageUpload(null);
          setPhotoURL(null);
          setUploading(false);
          history.push(`/profile/${user.uid}`);
        }, 500);
        // setSuccess(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayImage = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      {photoURL && <CardMedia component='img' image={photoURL} id='preview' />}
      {/* <CardMedia component='img' src={img} /> */}
      <CardContent sx={{ pb: 0 }}>
        {/* <div id='preview'></div> */}
        {uploading ? (
          <div>{message}</div>
        ) : (
          <TextField
            fullWidth
            variant='standard'
            placeholder={`How's your day? Share it with us.`}
            multiline
            onChange={(e) => setMessage(e.target.value)}
            disabled={uploading}
            value={message}
          />
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'right' }}>
        <label
          htmlFor='icon-button-file'
          // sx={{
          //   position: 'absolute',
          //   top: 80,
          //   left: 94,
          //   opacity: 0.8,
          // }}
        >
          {/* <Input
            accept='image/*'
            id='icon-button-file'
            type='file'
            sx={{ display: 'none' }}
            onChange={(e) => setImageUpload(e.target.files[0])}
          /> */}
          <IconButton
            component='label'
            aria-label='upload picture'
            disabled={uploading}
          >
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={displayImage}
            />
            <ImageTwoTone color='inherit' />
          </IconButton>
        </label>
        <Button
          startIcon={<Send />}
          onClick={handlePost}
          disabled={uploading || !message}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default WritePost;
