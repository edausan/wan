/* eslint-disable react-hooks/exhaustive-deps */
import { AddPhotoAlternateTwoTone, Clear, Send } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { FirebaseApp } from "@/Firebase";
import { CreatePost } from "@/Firebase/postsApi";
import useResize from "@/hooks/useResize";

const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/edausan15";
const CLOUDINARY_UPLOAD_PRESET = "uploads";

const WritePost = () => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  // const reader = new FileReader();
  const [imageUpload, setImageUpload] = useState(null);
  const [message, setMessage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  // const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { resized, processfile } = useResize({ quality: 0.9 });
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [media, setMedia] = useState({ secure_url: null });

  useEffect(() => {
    setMedia({ secure_url: resized });
  }, [resized]);

  const handleDeleteFromCloud = async () => {
    setPhotoURL(null);
    setImageUpload(null);
    setMedia({ secure_url: null });
  };

  const handleUploadToCloud = async () => {
    setUploadingMedia(true);
    const form = new FormData();

    try {
      form.append("file", imageUpload);
      form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const is_video = imageUpload?.type.includes("video");
      // const url = `${CLOUDINARY_API}`;
      const url = `${CLOUDINARY_API}/${is_video ? "video" : "image"}/upload`;
      const res = await fetch(url, {
        method: "POST",
        body: form,
        mode: "cors",
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded',
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Headers': 'Origin',
        //   'Access-Control-Allow-Credentials': true,
        // },
      }).then((r) => r.json());

      if (res) {
        setPhotoURL(res);
        setUploadingMedia(false);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    imageUpload && imageUpload.type.includes("image") && processfile(imageUpload);
  }, [imageUpload]);

  useEffect(() => {
    photoURL && handlePost();
  }, [photoURL]);

  const handlePost = async () => {
    setUploading(true);
    try {
      const post = {
        uid: user.uid,
        message,
        media: photoURL.secure_url,
        date_created: moment().format("LLLL"),
        reactions: [],
        comments: [],
        media_type: imageUpload.type,
      };
      const res = await CreatePost({ post });

      if (res?.id) {
        // setSuccess(true);
        setTimeout(() => {
          setMedia({ secure_url: null });
          setMessage(null);
          setImageUpload(null);
          setPhotoURL(null);
          setUploading(false);
          // history.push(`/profile/${user.uid}`);
        }, 500);
        // setSuccess(false);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const displayImage = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 50000000) {
      setImageUpload(file);

      if (file.type.includes("video")) {
        const vid = URL.createObjectURL(file);
        setMedia({ secure_url: vid });
      }
    } else {
      alert("File is too large.");
    }
  };

  return (
    <>
      <Dialog open={uploadingMedia}>
        <div className="flex flex-col items-center p-4">
          <CircularProgress />
          <span className="animate-pulse text-xs mt-2">Uploading Media</span>
        </div>
      </Dialog>
      <Card className="mb-4 relative shadow-md" elevation={0}>
        {media.secure_url && (
          <IconButton
            className="absolute z-[1003] top-[16px] right-[16px] bg-gray-800 hover:bg-gray-700"
            onClick={handleDeleteFromCloud}
          >
            <Clear />
          </IconButton>
        )}
        {media.secure_url && (
          <CardMedia
            component={imageUpload?.type.includes("image") ? "img" : "video"}
            image={media.secure_url}
            id="preview"
            autoPlay
            controls
          />
        )}
        {/* <CardMedia component='img' src={img} /> */}
        <CardContent sx={{ pb: 0 }}>
          {/* <div id='preview'></div> */}
          {uploading ? (
            <div>{message}</div>
          ) : (
            <TextField
              fullWidth
              variant="standard"
              placeholder={`How's your day? Share it with us.`}
              multiline
              onChange={(e) => setMessage(e.target.value)}
              disabled={uploading}
              value={message}
            />
          )}
        </CardContent>
        <CardActions className="justify-end">
          <label htmlFor="icon-button-file">
            <Button
              component="label"
              aria-label="upload picture"
              disabled={uploading}
              startIcon={<AddPhotoAlternateTwoTone color="success" />}
            >
              <input hidden accept="image/*,video/*" type="file" onChange={displayImage} />
              <span className="!capitalize text-sm">Photo/Video</span>
            </Button>
          </label>
          <Button
            startIcon={<Send />}
            onClick={media ? handleUploadToCloud : () => {}}
            disabled={uploading || !message || !media}
          >
            <span className="!capitalize text-sm ">Share</span>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default WritePost;
