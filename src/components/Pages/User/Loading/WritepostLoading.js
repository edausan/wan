import { Card, Skeleton } from '@mui/material';
import React from 'react';

const WritepostLoading = () => {
  return (
    <Card className='mb-4'>
      <div className='p-4'>
        <Skeleton variant='rectangular' width='100%' />
      </div>

      <div className='p-4 pt-0 flex flex-row gap-4 items-center justify-end'>
        <Skeleton variant='rectangular' width={130} />
        <Skeleton variant='rectangular' width={100} />
      </div>
    </Card>
  );
};

export default WritepostLoading;
