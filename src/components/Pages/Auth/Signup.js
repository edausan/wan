import {
  LoginOutlined,
  Visibility,
  VisibilityOff,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AppCtx } from '../../../App';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import WAN_LOGO from '../../../assets/WAN_LOGO.png';
import WAN_LOGO_WHITE from '../../../assets/WAN_LOGO_WHITE.png';
import { CreateAccount } from '../../../Firebase/authApi';
import { useEffect } from 'react';

export const Ministries = [
  {
    name: 'Jesus’ Army of Musicians (JAM)',
    id: 'JAM',
  },
  {
    name: 'Voices in Adoration (VIA)',
    id: 'VIA',
  },
  {
    name: 'TEAM (Triune, Elyondoulos, Acts, Movenerate)',
    id: 'TEAM',
  },
  {
    name: 'Multimedia Arts Network (MAN)',
    id: 'MAN',
  },
];

const SignUp = ({ setScreen }) => {
  const theme = useTheme();
  const { setMode, mode, setCurrentUser, setIsLoggedIn } = useContext(AppCtx);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: null,
    password: null,
    ministry: null,
  });
  const [userId, setUserId] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log({ user });
    if (user.email === 'admin.wan@gmail.com') {
      setUser({ ...user, password: 'admin@wan', ministry: 'ADMIN' });
    }
  }, [user.email]);

  const handleSignup = async () => {
    setIsSigning(true);
    setError(null);
    try {
      const response = await CreateAccount({ ...user });

      console.log({ response });

      if (response.auth) {
        setUserId(response.auth.currentUser.uid);
      } else {
        const err_msg =
          response.code === 'auth/email-already-in-use'
            ? 'Email already in use'
            : response.code === 'auth/wrong-password'
            ? `The email or password that you've entered doesn't match any account.`
            : response.code === 'auth/invalid-email'
            ? 'Invalid Email'
            : 'No internet connection.';
        setError(err_msg);
        setIsSigning(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const blue = '#00addd';
  const pink = '#f51088';

  return (
    <>
      <IconButton
        onClick={() => setMode(!mode)}
        sx={{ position: 'fixed', left: 20, bottom: 20, zIndex: 1002 }}
      >
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Card
        sx={{
          py: 2,
          px: 4,
          textAlign: 'center',
          m: 2,
          width: 'auto',
          maxWidth: 345,
          background: '#ffffff22',
          backdropFilter: 'blur(5px)',
          boxSizing: 'border-box',
          boxShadow: '0 10px 30px -5px rgba(0,0,0,.1)',
          zIndex: 1002,
        }}
      >
        <Box sx={{ width: '100%', mb: 4 }}>
          <img
            // src={theme.palette.mode === "dark" ? WAN_LOGO_WHITE : WAN_LOGO}
            src={WAN_LOGO_WHITE}
            alt='WAN | Belleview'
            style={{ width: '100%' }}
          />
        </Box>
        <Typography variant='body1' sx={{ mb: 2 }}>
          SIGN UP
        </Typography>

        {error && (
          <Alert
            severity='error'
            sx={{ mb: 1, textAlign: 'left', fontSize: 12 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              variant='standard'
              label='Email Address'
              fullWidth
              type='email'
              disabled={isSigning}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel id='password'>Password</InputLabel>
              <Input
                variant='standard'
                label='Password'
                labelId='password'
                fullWidth
                type={show ? 'text' : 'password'}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                disabled={isSigning}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShow(!show)}
                      onMouseDown={() => setShow(!show)}
                      edge='end'
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl variant='standard' fullWidth>
              <InputLabel id='ministry'>Ministry</InputLabel>
              <Select
                labelId='ministry'
                label='Ministry'
                size='small'
                sx={{ fontSize: 14 }}
                onChange={(e) => setUser({ ...user, ministry: e.target.value })}
              >
                {Ministries.map((ministry) => {
                  return (
                    <MenuItem value={ministry.id}>{ministry.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4}>
                <LoadingButton
                  color='primary'
                  loadingPosition='start'
                  variant='text'
                  fullWidth
                  disableElevation
                  disabled={isSigning}
                  onClick={() => setScreen('login')}
                >
                  Login
                </LoadingButton>
              </Grid>
              <Grid item xs={8} md={8}>
                <Button
                  variant='contained'
                  disableElevation
                  fullWidth
                  onClick={handleSignup}
                  loading={isSigning}
                  startIcon={<LoginOutlined />}
                  sx={{
                    background: blue,
                  }}
                  disabled={!user.email || !user.password || isSigning}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default SignUp;