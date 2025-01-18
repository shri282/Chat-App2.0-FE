import React from 'react'
import {Snackbar, Alert} from '@mui/material';

function Toster({ Toster, handleClose}) {

  return (
    <div>
        <Snackbar 
          open={Toster.open}  
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000} 
          onClose={handleClose}
        >
            <Alert
            onClose={handleClose}
            severity={Toster.severity}
            variant="filled"
            sx={{ width: '100%' }}
            >
            {Toster.message}
            </Alert>
      </Snackbar>
    </div>
  )
}

export default Toster