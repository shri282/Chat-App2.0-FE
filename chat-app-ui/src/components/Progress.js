import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

const Progress = ({ loading }) => {

  return (
    <>
        <Box sx={{ height: 40 }}>
        <Fade
            in={loading}
            style={{
                transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
            >
            <CircularProgress />
        </Fade>
        </Box>
    </>
      
  );
}

export default Progress;
