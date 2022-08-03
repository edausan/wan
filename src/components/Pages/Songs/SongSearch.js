/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Chip, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Clear, FilterList, SearchOutlined } from '@mui/icons-material';
import FilterDrawer from './FilterDrawer';
import { useEffect } from 'react';

const SongSearch = ({
  setSearchText,
  open,
  setOpen,
  artists,
  albums,
  searchText,
  tags,
}) => {
  const [text, setText] = useState(null);

  useEffect(() => {
    setSearchText(text);
  }, [text]);

  return (
    <Card className='p-4 fixed top-0 left-0 w-[100%] z-10 box-border rounded-none '>
      <div className='max-w-[450px] mx-auto bg-white/10 flex flex-row items-center rounded-md pr-2 box-border'>
        <TextField
          fullWidth
          onChange={(e) => setText(e.target.value)}
          variant='filled'
          size='small'
          value={text}
          label={<span>Search Song</span>}
          className='TEXT [&>div::before]:!border-0 [&>div::after]:!border-0 [&>div]:!rounded-md [&>div]:!bg-white/0 [&>label]:!text-sm'
        />
        {searchText ? (
          <Clear onClick={() => setText(null)} />
        ) : (
          <SearchOutlined />
        )}
      </div>

      <FilterDrawer
        open={open}
        setOpen={setOpen}
        artists={artists}
        albums={albums}
        setSearchText={setText}
        searchText={text}
      />

      <div className='flex flex-row gap-2 phone:max-w-[100%] phone:overflow-x-auto pb-3 mt-4'>
        {tags.map((tag) => {
          return (
            <Chip
              key={tag}
              label={tag}
              className={`text-white text-xs !h-[26px] ${
                searchText === tag ? '!bg-gray-800' : '!bg-gray-600'
              }`}
              onClick={
                searchText === tag
                  ? () => setSearchText(null)
                  : () => setSearchText(tag)
              }
            />
          );
        })}
      </div>

      <div className='flex flex-row items-center justify-end mt-1'>
        <button
          className='px-3 py-0 rounded-sm bg-white/20 text-white text-xs '
          onClick={() => setOpen(true)}
        >
          Search Filter{searchText && `: ${searchText}`} <FilterList />
        </button>
      </div>
    </Card>
  );
};

export default React.memo(SongSearch);
