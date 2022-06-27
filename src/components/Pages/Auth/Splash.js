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
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { AppCtx } from '../../../App';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import WAN_LOGO_WHITE from '../../../assets/WAN_LOGO_WHITE.png';
import { Link, useHistory, useParams } from 'react-router-dom';
import Login from './Login';
import SignUp from './Signup';

const Splash = () => {
  const params = useParams();
  const { currentUser } = useContext(AppCtx);
  const history = useHistory();
  const [screen, setScreen] = useState('splash');

  const blue = '#00addd';
  const pink = '#f51088';

  useEffect(() => {
    // history.push(`/profile/${currentUser.user?.uid || params.id}`);
  }, []);

  const Screen = () => {
    switch (screen) {
      case 'splash':
        return SplashScreen;
      case 'login':
        return <Login setScreen={setScreen} />;
      case 'signup':
        return <SignUp setScreen={setScreen} />;

      default:
        break;
    }
  };

  const SplashScreen = (
    <>
      <Box sx={{ width: '100%', mb: 4, textAlign: 'center' }}>
        <img
          src={WAN_LOGO_WHITE}
          alt='WAN | Belleview'
          style={{ width: '80%' }}
        />
      </Box>

      <Grid container flexDirection='column' spacing={2} sx={{ p: 4, mt: 10 }}>
        <Grid item>
          <Button
            variant='outlined'
            fullWidth
            sx={{
              color: '#fff',
              borderColor: '#fff',
              borderRadius: 25,
            }}
            disableElevation
            onClick={() => setScreen('signup')}
          >
            SIGN UP
          </Button>
        </Grid>
        <Grid item>
          <Button
            disableElevation
            variant='contained'
            sx={{ color: '#000', backgroundColor: '#fff', borderRadius: 25 }}
            fullWidth
            onClick={() => setScreen('login')}
          >
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      sx={{
        height: '100vh',
        background: `linear-gradient(45deg, ${pink}, ${blue})`,
      }}
    >
      {Screen()}
    </Grid>
  );
};

export default Splash;
