import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

const VideoItem = ({ video, setCurrentVideo }) => {
  const { snippet } = video;
  const { url, height, width } = snippet.thumbnails.default;

  return (
    <Card sx={{ p: 1, mb: 1 }} onClick={() => setCurrentVideo(video)}>
      <Grid container spacing={1}>
        <Grid item xs={4} md={4}>
          <img src={url} alt={snippet.title} style={{ width: '100%' }} />
        </Grid>

        <Grid item xs={8} md={8}>
          <small>
            <strong>{snippet.title}</strong>
          </small>
        </Grid>
      </Grid>
    </Card>
  );
};

export default VideoItem;
