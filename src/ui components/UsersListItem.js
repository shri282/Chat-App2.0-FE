import React from 'react'
import { Box, Avatar, Typography, styled } from '@mui/material';

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#E8E8E8',
  cursor: 'pointer',
  padding: theme.spacing(1, 1),
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: '#38B2AC',
    color: 'white',
  },
  width: '94%',
}));

function UsersListItem({ handleFunction, user}) {
  return (
     <UserBox onClick={handleFunction}>
      <Avatar
        sx={{ marginRight: 2, cursor: 'pointer' }}
        alt={user.name}
        src={user.pic}
        imgProps={{
          loading: 'lazy',
        }}
      />
      <Box>
        <Typography textTransform={'capitalize'}>   {user.name}</Typography>
        <Typography variant="caption">
          <b>Email: </b>{user.email}
        </Typography>
      </Box>
    </UserBox>
  )
}

export default UsersListItem