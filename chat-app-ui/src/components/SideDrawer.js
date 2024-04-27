import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Button, Drawer, Tooltip } from '@mui/material';
import Toster from './Toster.js';
import axios from '../config/axios.js';
import Loading from './Loading.js';
import UsersListItem from './UsersListItem.js';
import { useChatContext } from '../context/ChatProvider.js';
import Progress from './Progress.js';

function SideDrawer() {
  const { chats, setChats, accessToken } = useChatContext();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toster, setToster] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [users, setUsers] = React.useState({
    isLoading: false,
    data: [],
    searchQuery: '',
    error : null
  });

  const handleClose = () => {
    setToster({
      open: false,
      severity: "success",
      message: "",
    });
  };

  const toggleDrawer = (doOpen) => {
    setOpen(doOpen);
  }

  const searchHandler = (event) => {
    setUsers({
      ...users,
      searchQuery: event.target.value
    });
  }

  const handleFunction = async(userId) => {
    console.log('User clicked');
    setLoading(true);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }  
      }
      const { data } = await axios.post('/api/chats/openChat', { userId: userId }, config);
      if(!chats.find((chat) => chat._id === data._id)){
        setChats((prevChats) => {
          return [data, ...prevChats];
        });
        setLoading(false);
      }else {
        setLoading(false);
        setToster({
          open: true,
          severity: "error",
          message: "the chat was already created",
        });
      };
    } catch(error) {
      console.log(error);
    }
  }

  const getUsersHandler = async() => {
    if(users.searchQuery === '') {
      setToster({
        open: true,
        severity: "error",
        message: "Please enter a valid search query",
      });
      return;
    };

    try {
      setUsers((users) =>{
        return {
          isLoading: true,
          data: [],
          searchQuery: '',
          error : null
        }
      });
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }  
      }
      // API call to get users
      const searchQuery = users.searchQuery;
      const response = await axios.get(`/api/users/fetchUsers?search=${searchQuery}`, config);
      setUsers((prevUsers) => {
        return {
          ...prevUsers,
          isLoading: false,
          data: response.data
        }
      });
      setToster({
        open: true,
        severity: "success",
        message: "Users fetched successfully",
      });   
    } catch(error) {
      console.log(error);
      setUsers((prevUsers) => {
        return {
          ...prevUsers,
          isLoading: false,
          error: error.message
        }
      });
      setToster({
        open: true,
        severity: "error",
        message: error.message,
      });
    }
  }

  return (
    <div>
      <Tooltip 
      title="search users to chat" 
      arrow
      placement='bottom-end'
      >
          <Button onClick={() => toggleDrawer(true)} sx={{ width:'150px', height:'40px', padding:'0px', margin:'0px'}}>
              <SearchIcon sx={{ paddingRight:'3px'}}/>
              <p>Search User</p>
          </Button>   
      </Tooltip>
      <Drawer open={open} onClose={() => {
        setUsers(prevUsers => {
          return {
            ...prevUsers,
            isLoading: false,
            data: [],
            searchQuery: '',
            error : null
          }
        })
        toggleDrawer(false);
        }}>
        <div style={{ width: '280px', padding: '10px'}}>
          <h3>Search User's</h3>
          <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <input onChange={searchHandler} style={{ padding: '5px', width:'220px', marginRight:'5px'}} type="text" placeholder="Search User" />
            <Button onClick={getUsersHandler} size='small' variant='outlined'>Go</Button>
          </div>
            {
              users.isLoading ? (
                <Loading width={230}/>
              ) : (
                users.data.map((user) => {
                  return (
                    <UsersListItem key={user._id} user={user} handleFunction={() => handleFunction(user._id)} />
                  )
                })
              )
            }
            {
              users.error && <p>{users.error}</p>
            }
        </div>
      {
        <Progress loading={loading} />
      }
      </Drawer>
        {
          toster.open && <Toster Toster={toster} handleClose={handleClose} />
        }
    </div>
  )
}

export default SideDrawer