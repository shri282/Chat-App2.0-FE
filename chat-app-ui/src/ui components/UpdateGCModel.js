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
    height: '35%',
    bgcolor: 'background.paper',
    borderRadius:'3px',
    boxShadow: 24,
    p: 4,
  };

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  flex-grow: 1;
`;

function UpdateGCModel({ children, user, selectedGroupChat, setopenEditGroupModel, openEditGroupModel }) {
  const [groupChatData, setgroupChatData] = React.useState({
    chatName : selectedGroupChat.chatName,
    groupMembers : selectedGroupChat.users
  });

  const [toster, setToster] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });
  const { users, accessToken, setChats } = useChatContext();

  const handleClose = () => {
    setopenEditGroupModel(false);
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
        const groupMembers = groupChatData.groupMembers.map((member) => member._id);
        const { data } = await axios.post('/api/chats/updateGroupChat', {
          groupId : selectedGroupChat._id,
          groupName : groupChatData.chatName,
          groupMembers : groupMembers
        },config);
        setopenEditGroupModel(false);
        setToster({
            open: true,
            severity: "success",
            message: "Group Chat updated successfully",
        });
        setChats((prevChats) => {
          return [...prevChats.filter((chat) => chat._id !== selectedGroupChat._id), data]
        });
      } catch (error) {
        console.log(error);
        setToster({
          open: true,
          severity: "error",
          message: error.response?.data?.message ? error.response.data.message : error.message,
        });
        setopenEditGroupModel(false);
      }
  }

  return (
    <div>
      <Modal
        open={openEditGroupModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <Box 
          sx={style}
        >
          <Box
           display={'flex'}
           flexDirection={'column'}
           width={'100%'}
           height={'50%'}
          >
            <Label>Group Name</Label>
            <TextField defaultValue={selectedGroupChat.chatName} sx={{ width:'100%', flexGrow:2}} size='small' onChange={chatNameHandler} id="outlined-basic" label="Chat Name" variant="outlined" />
          </Box>

          <Box
           display={'flex'}
           flexDirection={'column'}
           width={'100%'}
           height={'45%'}
          >
            <MultiSelect setMembers={setgroupChatData} users={users} defaultUsers={selectedGroupChat.users} />
          </Box>

          <Button onClick={submitHandler} variant='contained' sx={{ marginTop: '10px' }}>Update</Button>
        </Box>
      </Modal>
      <Box>
        {
            toster.open && (<Toster Toster={toster} handleClose={handleTosterClose} />)
        }
      </Box>
    </div>
  )
}

export default UpdateGCModel;