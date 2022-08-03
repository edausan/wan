import React from 'react';
import { TextField } from '@mui/material';

const TextArea = ({ value, className, size, styles, color = '#fff' }) => {
  return (
    <TextField
      disabled
      multiline
      value={value}
      fullWidth
      className={`first:px-0 ${className}`}
      sx={{
        border: 'none',
        '& > .MuiOutlinedInput-root': {
          p: 0,
          border: 'none',
          '& textarea': {
            border: 'none',
            '-webkit-text-fill-color': color,
            fontSize: size,
            ...styles,
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
