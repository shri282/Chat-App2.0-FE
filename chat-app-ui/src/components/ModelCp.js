import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModelCp = ({ children, user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    event.stopPropagation(); // Prevent event from propagating to parent components
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ color:'black', fontSize:'15px', textTransform:'capitalize'}} onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textTransform:'capitalize' }} id="modal-modal-title" variant="h6" component="h2">
            {user.name}
          </Typography>
          <img src={user.pic} alt={user.name} style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '10px auto'}} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email: {user.email}
          </Typography>
          <Button onClick={handleClose} variant='contained' sx={{ marginTop: '10px'}}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default ModelCp