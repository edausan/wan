import './App.css';
import { useRef } from 'react';
import { Grid, Typography, Zoom } from '@mui/material';
import { useState, createContext, useEffect } from 'react';
import { WAN_LOGO } from './data';
import { createAccount, RealtimeMetadata } from './Firebase/authApi';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseApp, Firestore } from './Firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import Navigation from './components/Navigation';
import Home from './components/Pages/Home';
import Assignments from './components/Pages/Assignments';
import Lineup from './components/Lineup/LineupMain';
import NewLineup from './components/Lineup/NewLineup';
import EditLineup from './components/Lineup/EditLineup';
import Settings from './components/Pages/Settings';
import Login from './components/Pages/Auth/Login';
import Splash from './components/Pages/Auth/Splash';
import EditProfile from './components/Pages/EditProfile';
import ProfilePage from './components/Pages/Profile';
import APP_BG from './assets/bg.jpg';
import APP_BG_3 from './assets/bg3.jpg';
import ViewLineup from './components/Lineup/ViewLineup';
import SetAssignment from './components/Pages/Assignment/SetAssignment';
import Profile from './components/Pages/User/Profile';
import Notification from './components/Pages/Notification/Notification';
import Post from './components/Pages/Home/Post';

export const AppCtx = createContext();

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

function App() {
  const defaultTheme = useTheme();
  const { data } = RealtimeMetadata();
  const [currentUser, setCurrentUser] = useState({
    user: null,
    user_metadata: null,
  });

  const [worshipLeader, setWorshipLeader] = useState(0);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lineups, setLineups] = useState([]);
  const [isExtended, setIsExtended] = useState(true);
  const [scrollRef, setScrollRef] = useState(null);

  const bodyRef = useRef(null);

  const scrollToTop = () => {
    bodyRef.current.scroll({ top: 0 });
  };

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      console.log('PHONE!!!');
    }
  }, []);

  useEffect(() => {
    setCurrentUser({ ...currentUser, user_metadata: data });
  }, [data]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ ...currentUser, user });
      } else {
        setCurrentUser({ ...currentUser, user });
      }
    });
  }, []);

  const value = {
    setWorshipLeader,
    worshipLeader,
    setIndex,
    index,
    setMode,
    mode,
    setCurrentUser,
    currentUser,
    setIsLoggedIn,
    isLoggedIn,
    setLineups,
    lineups,
    isExtended,
    bodyRef,
    scrollToTop,
  };

  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
      background: {
        paper: mode ? '#ffffff85' : '#121212e6',
        // default: mode ? "#ffffff85" : "#121212c9"
      },
    },
  });

  useEffect(() => {
    document.body.style.background = mode ? '#eee' : '#121212';
  }, [mode]);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.target?.scrollTop) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppCtx.Provider value={value}>
          {!currentUser?.user ? (
            <Splash />
          ) : (
            <main>
              <Grid
                onScroll={onScroll}
                container
                id='scroll-body'
                ref={bodyRef}
                sx={{
                  justifyContent: 'center',
                  backgroundSize: 'cover',
                  backgroundAttachment: 'fixed',
                  overflow: 'auto',
                  maxHeight: '100vh',
                  backgroundOpacity: 0.5,
                  position: 'relative',
                  pb: 100,
                  '&::before': {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    content: '""',
                    width: '100%',
                    height: '100%',
                    background: `url(${APP_BG_3}) no-repeat`,
                    backgroundSize: 'auto 100%',
                    backgroundPosition: 'center',
                    zIndex: 1000,
                    opacity: 0.5,
                    transform: 'translate(-50%, -50%)',
                  },
                  '& .MuiCard-root': {
                    backdropFilter: 'blur(8px)',
                  },
                }}
              >
                <Navigation />
                <Grid
                  item
                  sx={{
                    p: 1,
                    mt: 1,
                    // maxHeight: '100vh',
                    maxWidth: 500,
                    width: '100%',
                    // overlfow: 'auto',
                    zIndex: 1001,
                    pb: 100,
                  }}
                >
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/assignments' component={Assignments} />
                    <Route path='/assignments/new' component={SetAssignment} />
                    <Route
                      exact
                      path='/assignments/:id'
                      component={SetAssignment}
                    />
                    <Route exact path='/lineup' component={Lineup} />
                    <Route path='/lineup/new' component={NewLineup} />
                    <Route exact path='/lineup/:id' component={ViewLineup} />
                    <Route path='/lineup/edit/:id' component={EditLineup} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/edit_profile' component={EditProfile} />
                    <Route path='/profile/:id' component={Profile} />
                    <Route path='/notifications' component={Notification} />
                    <Route path='/post/:id' component={Post} />
                  </Switch>
                </Grid>
              </Grid>
            </main>
          )}
        </AppCtx.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
