import React from 'react';
import { Box, Modal, Fade } from '@mui/material';

function FullscreenImageModal({ open, handleClose, imgSrc, alt }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        width: '50%', 
                        height: '80%', 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '5px', 
                        outline: 'none' 
                    }}
                >
                    <img src={imgSrc} alt={alt} style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'cover', borderRadius: '4px' }} />
                </Box>
            </Fade>
        </Modal>
    );
}

export default FullscreenImageModal;
