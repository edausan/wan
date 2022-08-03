import { FavoriteBorder, ShareOutlined } from '@mui/icons-material';
import { Card, Skeleton } from '@mui/material';
import React from 'react';

const LineupLoading = () => {
  return (
    <Card className='mb-4'>
      <div className='flex flex-row gap-2 p-3'>
        <Skeleton variant='circular' className='w-[40px] h-[40px]' />
        <Skeleton variant='text' width='55%' />
      </div>

      <div className='flex flex-row gap-2 p-4 px-7 items-center'>
        <Skeleton variant='circular' className='w-[25px] h-[25px]' />
        <div className='w-[100%]'>
          <Skeleton variant='text' width='45%' />
          <Skeleton variant='text' width='25%' />
        </div>
      </div>

      <div className='flex flex-row gap-4 p-3 items-center'>
        <FavoriteBorder color='disabled' />
        <ShareOutlined fontSize='small' color='disabled' />
      </div>
    </Card>
  );
};

export default LineupLoading;
