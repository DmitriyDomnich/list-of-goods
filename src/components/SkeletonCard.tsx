import React, { useMemo } from 'react';
import { Skeleton } from '@mui/material';

type Props = {
  length: number;
};

const SkeletonCard = ({ length }: Props) => {
  const emptyArray = useMemo(() => Array.from({ length }), [length]);

  return (
    <>
      {emptyArray.map((_, index) => (
        <div
          key={index}
          className='flex flex-col p-2 flex-grow sm:flex-grow-0 sm:basis-1/2 lg:basis-1/3'
        >
          <Skeleton variant='text' className='h-8' />
          <Skeleton variant='rectangular' width='100%' height={60} />
          <Skeleton variant='rounded' width='100%' height={60} />
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
