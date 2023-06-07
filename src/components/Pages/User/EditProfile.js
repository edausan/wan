import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Input,
  IconButton,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AppCtx } from "@/App";
import BG from "@/assets/bg.jpg";
import { UpdateProfile, UploadPhoto } from "@/Firebase/authApi";
import { Ministries } from "@components/Pages/Auth/Signup";
import { useHistory } from "react-router-dom";
import {
  AccountCircleOutlined,
  FormatQuote,
  GroupOutlined,
  PhotoCamera,
} from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import useResize from "@hooks/useResize";

const EditProfile = () => {
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;

  const theme = useTheme();
  const history = useHistory();
  const { currentUser, scrollToTop } = useContext(AppCtx);
  const [userDetails, setUserDetails] = useState({
    displayName: currentUser.user.displayName,
    life_verse: currentUser?.user_metadata?.life_verse,
    ministry: currentUser?.user_metadata?.ministry,
  });

  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [imageUpload, setImageUpload] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  const { resized, processfile } = useResize({ quality: 0.9 });

  useEffect(() => {
    scrollToTop();
    if (imageUpload === null) return;
    // handleUploadPhoto();
    imageUpload && processfile(imageUpload);
  }, [imageUpload, processfile, scrollToTop]);

  useEffect(() => {
    resized && handleUploadPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resized]);

  const handleUploadPhoto = async () => {
    const { photoURL, updateProfile } = await UploadPhoto({
      id: currentUser.user?.uid,
      imageUpload: resized,
    });

    if (photoURL) {
      setImageUpload(null);
      setPhotoURL(photoURL);
    }
  };

  useEffect(() => {
    const name = userDetails.displayName === currentUser?.user?.displayName;
    const verse = userDetails.life_verse === currentUser?.user_metadata?.life_verse;
    const ministry = userDetails.ministry === currentUser?.user_metadata?.ministry;
    const status = name && verse && ministry;
    setDisableUpdate(status);
  }, [
    currentUser?.user?.displayName,
    currentUser?.user_metadata?.life_verse,
    currentUser?.user_metadata?.ministry,
    userDetails,
  ]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await UpdateProfile({ ...userDetails });
      if (response === undefined) {
        setSuccess(true);
        setTimeout(() => {
          setUpdating(false);
          setSuccess(false);
          history.push(`/profile/${userProfile.uid}`);
        }, 1000);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <Card sx={{ maxWidth: 360, mb: 2 }}>
      <Snackbar
        open={success}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Updating Profile Success!
        </Alert>
      </Snackbar>

      {photoURL && (
        <Snackbar
          open={true}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setPhotoURL(null)} severity="success" sx={{ width: "100%" }}>
            Uploading Profile Photo Success!
          </Alert>
        </Snackbar>
      )}
      <CardMedia component="img" height="140" image={BG} sx={{ backgroundSize: "stretch" }} />
      <CardContent sx={{ position: "relative", mt: "-65px", pb: 0 }}>
        <Avatar
          alt={currentUser?.user?.displayName}
          src={currentUser?.user?.photoURL}
          sx={{
            width: 100,
            height: 100,
            border: `6px solid ${theme.palette.mode === "dark" ? "#1e1e1e" : "#fff"}`,
          }}
        />
        <label
          htmlFor="icon-button-file"
          style={{
            position: "absolute",
            top: 80,
            left: 94,
            opacity: 0.8,
          }}
        >
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            sx={{ display: "none" }}
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <IconButton
            color="inherit"
            aria-label="upload picture"
            component="span"
            sx={{
              background: "#757575ba",
              "&:visited, &:focus ,&:active, &:hover": {
                background: "#757575ba",
              },
            }}
          >
            <PhotoCamera />
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
                <TextField
                  fullWidth
                  variant="standard"
                  value={userDetails.displayName}
                  disabled={updating}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      displayName: e.target.value,
                    })
                  }
                />
              }
              secondary={currentUser.user.email}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GroupOutlined />
            </ListItemIcon>
            <ListItemText
              primary={
                <Select
                  fullWidth
                  variant="standard"
                  labelId="ministry"
                  size="small"
                  disabled
                  value={userDetails.ministry}
                  sx={{ fontSize: 14 }}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      ministry: e.target.value,
                    })
                  }
                >
                  {Ministries.map((ministry) => {
                    return <MenuItem value={ministry.id}>{ministry.name}</MenuItem>;
                  })}
                </Select>
              }
              secondary="Ministry"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FormatQuote />
            </ListItemIcon>
            <ListItemText
              primary={
                <TextField
                  fullWidth
                  variant="standard"
                  multiline
                  disabled={updating}
                  value={userDetails.life_verse}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      life_verse: e.target.value,
                    })
                  }
                />
              }
              secondary="Life Verse"
            />
          </ListItem>
        </List>
      </CardContent>

      <CardActions sx={{ justifyContent: "right", diplay: "flex" }}>
        <Button
          size="small"
          disabled={!userDetails.displayName && updating}
          onClick={() => history.push(`/profile/${userProfile.uid}`)}
        >
          Cancel
        </Button>
        <Button
          size="small"
          disabled={(!userDetails.displayName && updating) || disableUpdate}
          onClick={handleUpdate}
        >
          Update Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(EditProfile);
