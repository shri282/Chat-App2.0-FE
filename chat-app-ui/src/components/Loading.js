import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Loading({ width = 300}) {
  return (
    <Box sx={{ width: width, margin:'10px' }}>
      <Skeleton height={50} />
      <Skeleton height={50} animation="wave" />
      <Skeleton height={50} animation={false} />
      <Skeleton height={50} />
      <Skeleton height={50} animation="wave" />
      <Skeleton height={50} animation={false} />
    </Box>
  )
}

export default Loading