import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MultiSelect from './MultiSelect';
import { useChatContext } from '../context/ChatProvider';
import axios from '../config/axios';
import styled from '@mui/material/styles/styled';
import Toster from './Toster';

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    height: '40%',
    bgcolor: 'background.paper',
    borderRadius:'3px',
    boxShadow: 24,
    p: 4,
  };

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

function CreateGCModel({ children, user }) {
  const [open, setOpen] = React.useState(false);
  const [groupChatData, setgroupChatData] = React.useState({
    chatName : null,
    groupMembers : []
  });
  const [toster, setToster] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  const { users, accessToken } = useChatContext();

  const handleOpen = (event) => {
    event.stopPropagation(); // Prevent event from propagating to parent components
    setOpen(true);
  };

  const handleClose = () => {
    setgroupChatData({
    chatName : null,
    groupMembers : []
    });
    setOpen(false);
  }

  const handleTosterClose = () => {
    setToster({
      open: false,
      severity: "success",
      message: "",
    });
  }

  const chatNameHandler = (event) => {
    setgroupChatData((prevData) => {
        return {
           ...prevData,
           chatName : event.target.value
        }
    });
  }

  const submitHandler = async() => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      console.log(accessToken);
      const groupMembers = groupChatData.groupMembers.map((member) => member._id);
      const { data } = await axios.post('/api/chats/createGroupChat', {
        groupName : groupChatData.chatName,
        groupMembers : groupMembers
      },config);
      console.log('gc created',data);
      setgroupChatData({
      chatName : null,
      groupMembers : []
      });
      setOpen(false);
      setToster({
        open: true,
        severity: "success",
        message: "Group Chat created successfully",
      });
    } catch (error) {
      console.log(error);
      setToster({
        open: true,
        severity: "error",
        message: error.response?.data?.message ? error.response.data.message : error.message,
      });
    }
  }

  return (
    <div>
      <span sx={{ color:'black', fontSize:'15px', textTransform:'capitalize'}} onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <Box 
          sx={style}
        >
          <Label>Group Name</Label>
          <TextField sx={{ width:'100%', marginBottom:'10px'}} size='small' onChange={chatNameHandler} id="outlined-basic" label="Chat Name" variant="outlined" />
          <MultiSelect setMembers={setgroupChatData} users={users} />
          <Button onClick={submitHandler} variant='contained' sx={{ marginTop: '30px' }}>Create</Button>
        </Box>
      </Modal>
      {
        toster.open && (<Toster Toster={toster} handleClose={handleTosterClose} />)
      }
    </div>
  )
}

export default CreateGCModel;