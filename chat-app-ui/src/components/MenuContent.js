import React from 'react'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Fade, Divider, Avatar } from '@mui/material';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import { useChatContext } from '../context/ChatProvider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModelCp from './ModelCp';

function MenuContent() {
  const { user } = useChatContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

  return (
    <div style={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
      <Button>
        <NotificationsIcon sx={{ paddingRight:'10px'}} />
      </Button>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Avatar alt="Remy Sharp" sx={{ marginRight:'5px'}} src={user.pic} />
        { user.name }
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem sx={{ width: '120px', padding:'0'}} onClick={handleClose} disableRipple>
          <ModelCp user={user}>
              <Person2Icon sx={{ paddingRight:'10px'}} />
              Profile
          </ModelCp>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem sx={{ width: '120px', paddingLeft:'10px'}} onClick={handleClose} disableRipple>
          <div onClick={logoutHandler} style={{ color:'black', display:'flex', alignItems:'center', fontSize:'15px', textTransform:'capitalize'}}>
            <LogoutIcon sx={{ paddingRight:'10px'}} />
            Logout
          </div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MenuContent