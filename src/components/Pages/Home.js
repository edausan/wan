import { Card, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UploadPhoto } from '../../Firebase/authApi';
import { AppCtx } from './../../App';
import PostsMain from './Home/PostsMain';
import Theme from './Home/Theme';

const Home = () => {
  const { scrollToTop } = useContext(AppCtx);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='start'
      sx={{ height: '100vh' }}
    >
      <Theme />
      <PostsMain />
      {/* <Card sx={{ p: 2 }}>
        <Typography>Home</Typography>
      </Card> */}
    </Grid>
  );
};

export default Home;
