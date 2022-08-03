/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectPost } from '../../redux/slices/postsSlice';
import { AppCtx } from './../../App';
import PostsMain from './Home/PostsMain';
import Theme from './Home/Theme';

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
        <Theme />
        {/* <Suspense fallback={<div>Loading..</div>}>
          <LazyPosts />
        </Suspense> */}
        {posts?.length > 0 && <PostsMain />}
        {/* <Card sx={{ p: 2 }}>
        <Typography>Home</Typography>
      </Card> */}
      </Grid>
    </>
  );
};

export default React.memo(Home);
