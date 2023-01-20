/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../redux/slices/postsSlice";
import { AppCtx } from "./../../App";
import PostsMain from "./Home/PostsMain";
import Chorder from "./Songs/Chorder/Chorder";

const ThemeMain = React.lazy(() => import("./Home/ThemeMain"));

const Home = () => {
  const { scrollToTop } = useContext(AppCtx);
  const { posts } = useSelector(selectPost);
  // const { posts } = RealtimePosts();

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
        {/* <Chorder /> */}
        <Suspense fallback={<div />}>
          <ThemeMain />
        </Suspense>
        {posts?.length > 0 && <PostsMain />}
      </Grid>
    </>
  );
};

export default React.memo(Home);
