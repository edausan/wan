import { Card, Skeleton } from '@mui/material';
import React from 'react';

const FriendsLoading = () => {
  return (
    <Card className='mb-4'>
      <div className='flex flex-row p-4 gap-4'>
        <Skeleton variant='text' width={100} />
        <Skeleton variant='text' width={100} />
      </div>
      <div className='flex flex-row items-center justify-between p-4 pt-0'>
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton variant='circular' width={50} height={50} />
      </div>
    </Card>
  );
};

export default FriendsLoading;
