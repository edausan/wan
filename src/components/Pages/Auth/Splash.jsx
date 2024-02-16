import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import WAN_LOGO_NEW from "@assets/WAN_LOGO_NEW.png";
import SPLASH_BG from "@assets/splash-bg.webp";
import Login from "./Login";
import SignUp from "./Signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import Loading from "@components/CustomComponents/Loading";

const Splash = () => {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  const [screen, setScreen] = useState("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const blue = "#00addd";
  const pink = "#7400ff";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  useEffect(() => {
    // history.push(`/profile/${currentUser.user?.uid || params.id}`);
  }, []);

  const Screen = () => {
    switch (screen) {
      case "splash":
        return SplashScreen;
      case "login":
        return <Login setScreen={setScreen} />;
      case "signup":
        return <SignUp setScreen={setScreen} />;

      default:
        break;
    }
  };

  const SplashScreen = (
    <>
      <Grid
        container
        flexDirection="column"
        spacing={2}
        sx={{ p: 4, width: "100%", maxWidth: 345, zIndex: 1002 }}
      >
        <Grid item>
          <Button
            disableElevation
            variant="contained"
            className="bg-white text-black rounded-[25px] hover:text-white"
            fullWidth
            onClick={() => setScreen("login")}
          >
            LOGIN
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            fullWidth
            className="text-white hover:text-blue"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              borderRadius: 25,
            }}
            disableElevation
            onClick={() => setScreen("signup")}
          >
            SIGN UP
          </Button>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{
        height: "100vh",
        background: `url(${SPLASH_BG})`,
        backgroundSize: "cover",
        position: "relative",
        "&::before": {
          position: "absolute",
          top: 0,
          left: 0,
          content: '""',
          width: "100%",
          height: "100%",
          background: `linear-gradient(45deg, ${pink}, ${blue})`,
          zIndex: 1001,
          opacity: 0.97,
          backgroundBlendMode: "overlay",
        },
      }}
    >
      <Box className="w-full max-w-[500px] text-center z-[1002] flex justify-center">
        <img src={WAN_LOGO_NEW} alt="WAN | Belleview" style={{ width: "80%" }} />
      </Box>
      {/* {isLoggedIn && <Loading />} */}
      {/* {screen === "splash" && SplashScreen} */}
      {/* {screen === "login" && <Login setScreen={setScreen} />} */}
      <Login setScreen={setScreen} />
      {/* {screen === "signup" && <SignUp setScreen={setScreen} />} */}
    </Grid>
  );
};

export default React.memo(Splash);
