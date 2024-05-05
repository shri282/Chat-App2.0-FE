import * as React from 'react';
import Popper from '@mui/material/Popper';
import EmojiPicker from 'emoji-picker-react';


const EmojiPickerModel = ({ popupAnchorEl, onEmojiClick, showEmojiPicker }) => {

  const open = Boolean(popupAnchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Popper id={id} open={open} anchorEl={popupAnchorEl}>
        {/* <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}> */}
          <EmojiPicker height={450} width={450} emojiStyle='google' theme='dark' open={showEmojiPicker} onEmojiClick={onEmojiClick} />
        {/* </Box> */}
      </Popper>
    </div>
  );
}

export default EmojiPickerModel;