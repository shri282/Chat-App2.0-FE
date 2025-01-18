import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { useChatContext } from '../context/ChatProvider';
import ProfileModel from './ProfileModel';
import UpdateGCModel from './UpdateGCModel';

function ChatMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user, selectedChat } = useChatContext();
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openEditGroupModel, setopenEditGroupModel] = React.useState(false)

  const handleProfileOpen = () => {
    handleClose();
    setOpenProfile(true);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const editGroupHandler = () => {
    handleClose();
    setopenEditGroupModel(true);
  }


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', paddingRight:'-5px' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileOpen}>
            <Avatar /> View Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete Chat
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          Search
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NotificationsOffIcon />
          </ListItemIcon>
          Mute Notifications
        </MenuItem>
        {
          selectedChat && selectedChat.isGroupChat && 
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <GroupRemoveIcon />
            </ListItemIcon>
            Leave Group
          </MenuItem>
        }
        {
          selectedChat && selectedChat.isGroupChat && 
          selectedChat.groupAdmin._id === user._id && 
          <MenuItem onClick={editGroupHandler}>
            <ListItemIcon>
              <GroupRemoveIcon />
            </ListItemIcon>
            Edit Group
          </MenuItem>
        }
      </Menu>
      <Box
      display={'none'}
      >
        {
          <ProfileModel setOpenProfile={setOpenProfile} openProfile={openProfile} user={selectedChat.users[0]._id === user._id ? selectedChat.users[1] : selectedChat.users[0]} />
        }
        {
          selectedChat && <UpdateGCModel selectedGroupChat={selectedChat} openEditGroupModel={openEditGroupModel} setopenEditGroupModel={setopenEditGroupModel} user={user} />
        }
      </Box>
    </React.Fragment>
  )
}

export default ChatMenu;