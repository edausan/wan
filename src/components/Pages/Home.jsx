/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import React, { Suspense, useEffect, useContext } from "react";
import { AppCtx } from "@/App";

const ThemeMain = React.lazy(() => import("./Home/ThemeMain"));
const PostsMain = React.lazy(() => import("./Home/PostsMain"));

const Home = () => {
  const { scrollToTop } = useContext(AppCtx);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="start"
        className="h-[100vh] max-w-[680px] mx-auto p-3"
      >
        <Suspense fallback={<></>}>
          <ThemeMain />
        </Suspense>
        <Suspense fallback={<></>}>
          <PostsMain />
        </Suspense>
      </Grid>
    </>
  );
};

export default Home;
