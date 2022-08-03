import { ClearOutlined, SaveOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useCallback } from 'react';

const NewSongTag = ({ tagExist, setEditDetails, handleAddTag }) => {
  const [tag, setTag] = useState(null);

  // const handleAddTag = () => {
  //   setNewTag(tag);
  // };

  return (
    <div className='px-4 py-2 flex flex-row'>
      <TextField
        fullWidth
        variant='standard'
        size='small'
        label='New Tag'
        className='TAG [&>label]:text-sm [&>div>input]:text-sm'
        onChange={(e) => setTag(e.target.value)}
        error={tagExist}
        helperText={tagExist ? 'Tag already exists.' : ''}
      />
      <IconButton onClick={() => handleAddTag(tag)} disabled={!tag || tagExist}>
        <SaveOutlined className='w-[18px] h-[18px]' />
      </IconButton>
      <IconButton
        onClick={() =>
          setEditDetails((editDetails) => ({
            ...editDetails,
            tag: false,
          }))
        }
      >
        <ClearOutlined className='w-[18px] h-[18px]' />
      </IconButton>
    </div>
  );
};

export default NewSongTag;
