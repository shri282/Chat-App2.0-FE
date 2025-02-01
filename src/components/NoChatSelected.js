import React from 'react'
import { Box, Typography } from '@mui/material'

function NoChatSelected() {
  return (
    <Box
      width= {'60%'}
      height= {'100%'}
      display= {'flex'}
      flexDirection={'column'}
      bgcolor={'white'}
      boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'}
      marginBottom={'16px'}
      overflow= {'hidden'}
    >
        <Box
          display={'flex'}
          width={'100%'}
          height={'100%'}
          flexDirection={'column'}
          alignItems={'center'}
          paddingTop={20}
        >
          <img width={250} alt='sa' src='https://static.whatsapp.net/rsrc.php/v3/yX/r/dJq9qKG5lDb.png'></img>
          <Box
           display={'flex'}
           flexDirection={'column'}
           alignItems={'center'}
          >
            <Typography variant='h5'>ChatterBox</Typography>
            <Typography variant='body2'>Please select a chat to start messaging</Typography>
          </Box>
        </Box>
    </Box>
  )
}

export default NoChatSelected