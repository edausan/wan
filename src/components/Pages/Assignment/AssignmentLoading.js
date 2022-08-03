import { Card, Skeleton } from '@mui/material';
import React from 'react';

const AssignmentLoading = () => {
  return (
    <Card fullWidth className='w-full mb-4'>
      <div className='flex flex-row gap-2 p-3'>
        <Skeleton variant='circular' className='w-[40px] h-[40px]' />
        <Skeleton variant='text' width='55%' />
      </div>

      {[1, 2, 3].map((num) => {
        return <Services />;
      })}
    </Card>
  );
};

const Services = () => {
  return (
    <div className='flex flex-row gap-2 p-4 px-7 items-center'>
      <Skeleton variant='circular' className='w-[25px] h-[25px]' />
      <Skeleton variant='text' width='45%' />
      <Skeleton variant='text' width='15%' className='ml-4' />
    </div>
  );
};

export default AssignmentLoading;
