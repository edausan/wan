import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { AppCtx } from './../../App';
import BG from '../../assets/bg.jpg';
import wallpaper from '../../assets/wallpaper-hd.jpg';
import { UpdateProfile } from '../../Auth/auth';
import { GetUserMetadata, SetUserMetadata } from './../../Auth/auth';
import { Ministries } from './Auth/Signup';
import { useHistory } from 'react-router-dom';

const EditProfile = () => {
  const history = useHistory();
  const { currentUser } = useContext(AppCtx);
  const [userDetails, setUserDetails] = useState({
    displayName: currentUser.user.displayName,
    life_verse: currentUser?.user_metadata?.life_verse,
    photoURL: currentUser.user.photoURL,
    ministry: currentUser?.user_metadata?.ministry,
  });

  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await UpdateProfile({ ...userDetails });
      console.log({ response });

      if (response === undefined) {
        setSuccess(true);
        setTimeout(() => {
          setUpdating(false);
          setSuccess(false);
          history.push('/settings');
        }, 1000);
      }
    } catch (error) {
      console.log({ error });
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Updating Profile Success!
        </Alert>
      </Snackbar>
      <CardMedia
        component='img'
        height='140'
        image={BG}
        sx={{ backgroundSize: 'stretch' }}
      />
      <CardContent>
        <TextField
          disabled
          label='Email'
          fullWidth
          variant='standard'
          value={currentUser.user.email}
        />

        <TextField
          label='Name'
          fullWidth
          variant='standard'
          sx={{ mt: 3 }}
          value={userDetails.displayName}
          disabled={updating}
          onChange={(e) =>
            setUserDetails({ ...userDetails, displayName: e.target.value })
          }
        />

        <FormControl variant='standard' fullWidth sx={{ mt: 3 }}>
          <InputLabel id='ministry'>Ministry</InputLabel>
          <Select
            labelId='ministry'
            label='Ministry'
            size='small'
            disabled={updating}
            value={userDetails.ministry}
            sx={{ fontSize: 14 }}
            onChange={(e) =>
              setUserDetails({ ...userDetails, ministry: e.target.value })
            }
          >
            {Ministries.map((ministry) => {
              return <MenuItem value={ministry.id}>{ministry.name}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <TextField
          label='Life Verse'
          fullWidth
          variant='standard'
          sx={{ mt: 3 }}
          multiline
          disabled={updating}
          value={userDetails.life_verse}
          onChange={(e) =>
            setUserDetails({ ...userDetails, life_verse: e.target.value })
          }
        />
      </CardContent>

      <CardActions>
        <Button
          size='small'
          disabled={!userDetails.displayName && updating}
          onClick={handleUpdate}
        >
          Update Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;
