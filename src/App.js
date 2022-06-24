import './App.css';
import { Grid, Typography } from '@mui/material';
import Navigation from './components/Navigation';
import { useState, createContext, useEffect } from 'react';
import Home from './components/Pages/Home';
import Assignments from './components/Pages/Assignments';
import Lineup from './components/Lineup/LineupMain';
import { WAN_LOGO } from './data';
import { createAccount, RealtimeMetadata } from './Auth/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewLineup from './components/Lineup/NewLineup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Settings from './components/Pages/Settings';
import Login from './components/Pages/Auth/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseApp, Firestore } from './Firebase';
import Splash from './components/Pages/Auth/Splash';
import EditProfile from './components/Pages/EditProfile';
import { doc, onSnapshot, collection } from 'firebase/firestore';

export const AppCtx = createContext();

const auth = getAuth(FirebaseApp);
const user = auth.currentUser;

function App() {
  const { data } = RealtimeMetadata();
  const [currentUser, setCurrentUser] = useState({
    user: null,
    user_metadata: null,
  });

  const [worshipLeader, setWorshipLeader] = useState(0);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log({ data });
    setCurrentUser({ ...currentUser, user_metadata: data });
  }, [data]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setCurrentUser({ ...currentUser, user });
        // console.log({ user });
        // ...
      } else {
        console.log({ user });
        setCurrentUser({ ...currentUser, user });
        // User is signed out
        // ...
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
  };

  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
    },
  });

  useEffect(() => {
    document.body.style.background = mode ? '#eee' : '#121212';
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppCtx.Provider value={value}>
          {!currentUser?.user ? (
            <Splash />
          ) : (
            <main>
              <Grid container sx={{ justifyContent: 'center' }}>
                <Navigation />
                <Grid
                  item
                  sx={{
                    p: 2,
                    mt: 1,
                    pb: 10,
                    height: '100vh',
                    maxWidth: 500,
                    width: '100%',
                  }}
                >
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/assignments' component={Assignments} />
                    <Route exact path='/lineup' component={Lineup} />
                    <Route path='/lineup/new' component={NewLineup} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/edit_profile' component={EditProfile} />
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
