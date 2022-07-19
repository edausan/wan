import React from 'react';
import { TextField } from '@mui/material';

const TextArea = ({ value }) => {
  return (
    <TextField
      disabled
      multiline
      value={value}
      fullWidth
      className='first:px-0'
      sx={{
        border: 'none',
        '& > .MuiOutlinedInput-root': {
          p: 0,
          border: 'none',
          '& textarea': {
            border: 'none',
            '-webkit-text-fill-color': '#fff',
            fontSize: '0.875rem',
          },
          '& fieldset': {
            border: 'none',
          },
        },
      }}
    />
  );
};

export default TextArea;
