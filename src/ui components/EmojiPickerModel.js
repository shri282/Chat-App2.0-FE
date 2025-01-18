import * as React from 'react';
import Popper from '@mui/material/Popper';
import EmojiPicker from 'emoji-picker-react';


const EmojiPickerModel = ({ popupAnchorEl, emojiPickerRef, onEmojiClick, setPopupAnchorEl, handleClose }) => {

  const open = Boolean(popupAnchorEl);
  const id = open ? 'simple-popper' : undefined;
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target) && !emojiPickerRef.current.contains(event.target)) {
        console.log('outside click');
        setPopupAnchorEl(null);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, handleClose, setPopupAnchorEl, emojiPickerRef]); 

  return (
    <div>
      <Popper ref={containerRef} id={id} open={open} anchorEl={popupAnchorEl}>
          <EmojiPicker height={450} width={450} emojiStyle='google' theme='dark' open={open} onEmojiClick={onEmojiClick} />
      </Popper>
    </div>
  );
}

export default EmojiPickerModel;