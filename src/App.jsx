/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useRef, lazy, Suspense, useState, createContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { RealtimeMetadata } from "@/Firebase/authApi";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import Navigation from "@components/Navigation";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/usersSlice";
import Loading from "@components/CustomComponents/Loading";
import { ReactQueryDevtools } from "react-query/devtools";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import Routes from "./Routes";

// Components
const Splash = lazy(() => import("./components/Pages/Auth/Splash"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      // staleTime: 1000 * 60 * 60 * 24, // 24 hours
      // refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

export const AppCtx = createContext();

const auth = getAuth(FirebaseApp);

function App() {
  const dispatch = useDispatch();
  const { data } = RealtimeMetadata();

  const [currentUser, setCurrentUser] = useState({
    user: null,
    user_metadata: null,
  });

  const [worshipLeader, setWorshipLeader] = useState(0);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const bodyRef = useRef(null);

  const scrollToTop = () => {
    bodyRef.current.scroll({ top: 0 });
  };

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
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools
				initialIsOpen={true}
				position="top-left"
				panelProps={{
					style: {
						position: "fixed",
						top: 0,
						left: 0,
					},
				}}
			/> */}
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
                  container
                  id="scroll-body"
                  ref={bodyRef}
                  sx={{
                    position: "relative",
                    "&::before": {
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      content: '""',
                      width: "100%",
                      height: "100%",
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

                  <div className="pt-0 w-full z-[1001] mx-auto pb-[60px]">
                    <Routes />
                  </div>
                </Grid>
              </main>
            )}
          </AppCtx.Provider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
