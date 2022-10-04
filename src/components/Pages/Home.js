/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material';
import React, { Suspense, useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectPost } from '../../redux/slices/postsSlice';
import { AppCtx } from './../../App';
import PostsMain from './Home/PostsMain';

const ThemeMain = React.lazy(() => import('./Home/ThemeMain'));

const Home = () => {
  const { scrollToTop } = useContext(AppCtx);
  const { posts } = useSelector(selectPost);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='start'
        sx={{ height: '100vh', pb: 100 }}
      >
        <Suspense fallback={<div>Loading Themes...</div>}>
          <ThemeMain />
        </Suspense>
        {posts?.length > 0 && <PostsMain />}
      </Grid>
    </>
  );
};

export default React.memo(Home);
