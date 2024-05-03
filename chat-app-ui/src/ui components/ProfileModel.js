import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FullscreenImageModal from './FullScreenImageModel';

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
  borderRadius:'3px',
  boxShadow: 24,
  p: 4,
};

const ProfileModel = ({ user, setOpenProfile, openProfile }) => { 
  const handleClose = () => setOpenProfile(false);
  const [imageModalOpen, setImageModalOpen] = React.useState(false);

  const handleAvatarClick = () => {
    handleClose();
    setImageModalOpen(true);
};
  
  return (
    <div>
      <Modal
        open={openProfile}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textTransform:'capitalize' }} id="modal-modal-title" variant="h6" component="h2">
            {user.name}
          </Typography>
          <img src={user.pic} onClick={handleAvatarClick} alt={user.name} style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '10px auto', cursor:'pointer'}} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email: {user.email}
          </Typography>
          <Button onClick={handleClose} variant='contained' sx={{ marginTop: '10px'}}>Close</Button>
        </Box>
      </Modal>
      <FullscreenImageModal
      open={imageModalOpen} 
      handleClose={() => setImageModalOpen(false)} 
      imgSrc={user.pic} 
      alt="Chat Avatar"
      />
    </div>
  )
}

export default ProfileModel;