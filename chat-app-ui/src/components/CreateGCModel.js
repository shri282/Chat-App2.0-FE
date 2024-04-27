import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MultiSelect from './MultiSelect';

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 200,
    bgcolor: 'background.paper',
    borderRadius:'3px',
    boxShadow: 24,
    p: 4,
  };

function CreateGCModel({ children, user }) {
  const [open, setOpen] = React.useState(false);
  const [groupChatData, setgroupChatData] = React.useState({
    chatName : null,
    groupMembers : []
  });

  const handleOpen = (event) => {
    event.stopPropagation(); // Prevent event from propagating to parent components
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const chatNameHandler = (event) => {
    setgroupChatData((prevData) => {
        return {
           ...prevData,
           chatName : event.target.value
        }
    });
  }

  const submitHandler = () => {
    setOpen(false);
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
       
        <Box sx={style}>
          <TextField sx={{ width:'200px'}} onChange={chatNameHandler} id="outlined-basic" label="Chat Name" variant="outlined" />
          <MultiSelect></MultiSelect>
          <Button onClick={submitHandler} variant='contained' sx={{ marginTop: '10px'}}>Create</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateGCModel;