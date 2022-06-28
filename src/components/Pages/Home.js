import { Card, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UploadPhoto } from '../../Firebase/authApi';

const Home = () => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ height: '100vh' }}
    >
      <Card sx={{ p: 2 }}>
        <Typography>Home</Typography>
      </Card>
    </Grid>
  );
};

export default Home;
