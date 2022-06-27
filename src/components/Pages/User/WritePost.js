import { Send } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';
import React from 'react';

const WritePost = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 0 }}>
        <TextField
          fullWidth
          variant='standard'
          placeholder={`How's your day? Share it with us.`}
          multiline
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'right' }}>
        <Button startIcon={<Send />}>Share</Button>
      </CardActions>
    </Card>
  );
};

export default WritePost;
