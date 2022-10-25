/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useRef, lazy, Suspense } from "react";
import { Grid } from "@mui/material";
import { useState, createContext, useEffect } from "react";
import { RealtimeMetadata, RealtimeUsers } from "./Firebase/authApi";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp } from "./Firebase";
import Navigation from "./components/Navigation";
import { useDispatch } from "react-redux";
import { setPosts, setThemes, setUserPosts } from "./redux/slices/postsSlice";
import { setUser, setUsers } from "./redux/slices/usersSlice";
import { RealtimePosts, RealtimeThemes } from "./Firebase/postsApi";
import { GetRealtimeAssignments } from "./Firebase/assignmentApi";
import { setAssignments } from "./redux/slices/assignmentsSlice";
import {
  GetAllAlbumCovers,
  RealtimeLineups,
  RealtimeSongs,
} from "./Firebase/songsApi";
import { setLineups } from "./redux/slices/lineupsSlice";
import { setAlbumCovers, setSongs } from "./redux/slices/songsSlice";
import Loading from "./components/CustomComponents/Loading";

const Home = lazy(() => import("./components/Pages/Home"));
const Lineup = lazy(() => import("./components/Lineup/LineupMain"));
const Assignments = lazy(() => import("./components/Pages/Assignments"));
const NewLineup = lazy(() => import("./components/Lineup/NewLineup"));
const EditLineup = lazy(() => import("./components/Lineup/EditLineup"));
const Settings = lazy(() => import("./components/Pages/Settings"));
const Splash = lazy(() => import("./components/Pages/Auth/Splash"));
const EditProfile = lazy(() => import("./components/Pages/EditProfile"));
const ViewLineup = lazy(() => import("./components/Lineup/ViewLineup"));
const SetAssignment = lazy(() =>
  import("./components/Pages/Assignment/SetAssignment")
);
const Profile = lazy(() => import("./components/Pages/User/Profile"));
const Post = lazy(() => import("./components/Pages/Home/Post"));
const SongsMain = lazy(() => import("./components/Pages/Songs/SongsMain"));
const Theme = lazy(() => import("./components/Pages/Home/Theme"));

export const AppCtx = createContext();

const auth = getAuth(FirebaseApp);

function App() {
  const dispatch = useDispatch();
  const { data } = RealtimeMetadata();
  const { posts: Posts } = RealtimePosts();
  const { data: Users } = RealtimeUsers();
  // const { data: AssignmentsData } = GetRealtimeAssignments();
  // const { data: Lineups } = RealtimeLineups();
  const { data: Songs } = RealtimeSongs();
  const { data: Themes } = RealtimeThemes();
  const { AlbumCovers, GetCovers } = GetAllAlbumCovers();

  const [currentUser, setCurrentUser] = useState({
    user: null,
    user_metadata: null,
  });

  const [worshipLeader, setWorshipLeader] = useState(0);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const bodyRef = useRef(null);

  const scrollToTop = () => {
    bodyRef.current.scroll({ top: 0 });
  };

  useEffect(() => {
    Themes.length > 0 && dispatch(setThemes(Themes));
  }, [Themes]);

  useEffect(() => {
    GetCovers();
    Songs.length > 0 && dispatch(setSongs(Songs));
  }, [Songs]);

  useEffect(() => {
    AlbumCovers.length > 0 && dispatch(setAlbumCovers(AlbumCovers));
  }, [AlbumCovers]);

  // useEffect(() => {
  //   Lineups.length > 0 && dispatch(setLineups(Lineups));
  // }, [Lineups]);

  // useEffect(() => {
  //   console.log({ AssignmentsData });
  //   AssignmentsData.length > 0 && dispatch(setAssignments(AssignmentsData));
  // }, [AssignmentsData]);

  useEffect(() => {
    setPostsData();
  }, [Posts, Users]);

  useEffect(() => {
    currentUser.user_metadata && dispatch(setUser(currentUser));
  }, [currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && data) {
        setCurrentUser({ user, user_metadata: data });
      } else {
        setCurrentUser({ user, user_metadata: data });
      }
    });
  }, [data]);

  const setPostsData = () => {
    if (Posts.length > 0 && Users.length > 0) {
      const with_user = Posts.map((post) => {
        return {
          post,
          user: Users?.filter((u) => u.uid === post.uid)[0],
        };
      });
      dispatch(setUsers(Users));
      dispatch(setPosts(with_user));
      dispatch(
        setUserPosts(
          with_user.filter((p) => p.post?.uid === auth.currentUser?.uid)
        )
      );
    }
  };

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
    setPostsData,
    bodyRef,
    scrollToTop,
  };

  const theme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
      background: {
        paper: mode ? "#ffffff" : "#121212",
        // default: mode ? "#ffffff85" : "#121212c9"
      },
    },
  });

  useEffect(() => {
    document.body.style.background = mode ? "#eee" : "#242526e8";
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppCtx.Provider value={value}>
          {!currentUser?.user ? (
            <Suspense fallback={<Loading />}>
              <Splash />
            </Suspense>
          ) : (
            <main>
              <Grid
                // onScroll={onScroll}
                container
                id="scroll-body"
                ref={bodyRef}
                sx={{
                  justifyContent: "center",
                  backgroundSize: "cover",
                  backgroundAttachment: "fixed",
                  overflow: "auto",
                  maxHeight: "100vh",
                  backgroundOpacity: 0.5,
                  position: "relative",
                  pb: 100,
                  "&::before": {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    content: '""',
                    width: "100%",
                    height: "100%",
                    // background: `url(${APP_BG_3}) no-repeat`,
                    backgroundSize: "auto 100%",
                    backgroundPosition: "center",
                    zIndex: 1000,
                    opacity: 0.5,
                    transform: "translate(-50%, -50%)",
                  },
                  "& .MuiCard-root": {
                    backdropFilter: "blur(8px)",
                  },
                }}
              >
                <Navigation />
                {/* <Grid
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
                > */}
                {/* <SwipeableViews>
                    <Home />
                    <Assignments />
                  </SwipeableViews> */}

                <div className="p-3 pt-0 w-full z-[1001] pb-[80px] max-w-[680px] mx-auto">
                  <Switch>
                    <Route exact path="/">
                      <Suspense fallback={<Loading />}>
                        <Home />
                      </Suspense>
                    </Route>
                    <Route exact path="/assignments">
                      <Suspense fallback={<Loading />}>
                        <Assignments />
                      </Suspense>
                    </Route>
                    <Route path="/assignments/new">
                      <Suspense fallback={<Loading />}>
                        <SetAssignment />
                      </Suspense>
                    </Route>
                    <Route exact path="/assignments/:id">
                      <Suspense fallback={<Loading />}>
                        <SetAssignment />
                      </Suspense>
                    </Route>
                    <Route exact path="/lineup">
                      <Suspense fallback={<Loading />}>
                        <Lineup />
                      </Suspense>
                    </Route>
                    <Route path="/lineup/new">
                      <Suspense fallback={<Loading />}>
                        <NewLineup />
                      </Suspense>
                    </Route>
                    <Route exact path="/lineup/:id">
                      <Suspense fallback={<Loading />}>
                        <ViewLineup />
                      </Suspense>
                    </Route>
                    <Route path="/lineup/edit/:id">
                      <Suspense fallback={<Loading />}>
                        <EditLineup />
                      </Suspense>
                    </Route>
                    <Route path="/settings">
                      <Suspense fallback={<Loading />}>
                        <Settings />
                      </Suspense>
                    </Route>
                    <Route path="/edit_profile">
                      <Suspense fallback={<Loading />}>
                        <EditProfile />
                      </Suspense>
                    </Route>
                    <Route path="/profile/:id">
                      <Suspense fallback={<Loading />}>
                        <Profile />
                      </Suspense>
                    </Route>
                    <Route path="/post/:id">
                      <Suspense fallback={<Loading />}>
                        <Post />
                      </Suspense>
                    </Route>
                    <Route path="/songs">
                      <Suspense fallback={<Loading />}>
                        <SongsMain />
                      </Suspense>
                    </Route>
                    <Route path="/theme/:id">
                      <Suspense fallback={<Loading />}>
                        <Theme />
                      </Suspense>
                    </Route>
                  </Switch>
                </div>
              </Grid>
            </main>
          )}
        </AppCtx.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
