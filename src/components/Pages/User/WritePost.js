import { ImageTwoTone, Send } from '@mui/icons-material';
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
import { FirebaseApp } from '../../../Firebase';
import { CreatePost, UploadPostMedia } from '../../../Firebase/postsApi';

const WritePost = () => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  // const reader = new FileReader();
  const [imageUpload, setImageUpload] = useState(null);
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handlePost = async () => {
    setUploading(true);
    try {
      const post = {
        uid: user.uid,
        message,
        media: photoURL,
        date_created: moment().format('dddd LL'),
        reactions: [],
        comments: [],
      };
      const res = await CreatePost({ post });
      console.log({ res });

      if (res?.id) {
        setSuccess(true);
        setUploading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    photoURL && handlePost();
  }, [photoURL]);

  const handleUploadMedia = async () => {
    if (imageUpload) {
      const { photoURL } = await UploadPostMedia({ imageUpload });
      setPhotoURL(photoURL);
    }
  };

  const displayImage = (e) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0]);
      var reader = new FileReader();
      reader.onload = function (e) {
        console.log({ img: e.target.result });
        setImg(e.target.result);
        // document.querySelector('#profileDisplay').setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      {img && <CardMedia image={img} />}
      <CardMedia component='img' src={img} />
      <CardContent sx={{ pb: 0 }}>
        <TextField
          fullWidth
          variant='standard'
          placeholder={`How's your day? Share it with us.`}
          multiline
          onChange={(e) => setMessage(e.target.value)}
          disabled={uploading}
        />
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
          onClick={imageUpload ? handleUploadMedia : handlePost}
          disabled={uploading || !message}
        >
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default WritePost;
