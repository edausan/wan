import React from 'react';
import { CircularProgress } from '@mui/material';

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <CircularProgress />
    </div>
  );
}

export default Loading;
