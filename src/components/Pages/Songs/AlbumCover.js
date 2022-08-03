/* eslint-disable react-hooks/exhaustive-deps */
import { AddAPhotoOutlined } from '@mui/icons-material';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  SwipeableDrawer,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import { selectSongs } from '../../../redux/slices/songsSlice';

const AlbumCover = ({
  open,
  setOpen,
  setSelectedCover,
  selectedCover,
  setImage,
  resized,
}) => {
  const { albumCovers } = useSelector(selectSongs);
  const [img, setImg] = useState(null);

  useEffect(() => {
    setImage(img);
  }, [img]);

  const handleSelect = (cover) => {
    if (cover?.photoURL === selectedCover?.photoURL) {
      setSelectedCover(null);
    } else {
      setSelectedCover(cover);
      setOpen(false);
    }
  };

  const handleClick = () => {
    const upload = document.querySelector('#upload-cover-new');
    upload.click();
  };

  const covers = resized
    ? [...albumCovers, { name: img?.name, photoURL: resized }]
    : albumCovers;

  return (
    <SwipeableDrawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <div className='p-4'>
        <ImageList variant='masonry' cols={3} gap={6}>
          {covers.map((cover) => (
            <ImageListItem
              key={cover.photoURL}
              onClick={() => handleSelect(cover)}
              className={`${
                selectedCover?.name === cover?.name
                  ? 'border border-sky-500'
                  : ''
              }`}
            >
              <LazyLoadImage
                alt={cover?.name}
                effect='blur'
                placeholder={<Skeleton variant='rectangular' height={100} />}
                src={cover?.photoURL}
              />
              {/* <img
                src={`${cover.photoURL}`}
                srcSet={`${cover.photoURL}`}
                alt={cover.name}
                loading='lazy'
              /> */}
              <ImageListItemBar
                title={<span className='text-xs'>{cover.name}</span>}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      {/* <div className='flex flex-wrap items-start gap-4 h-[calc(60vh-50px)] max-h-[calc(60vh-50px)] overflow-x-auto p-4'>
        {[...covers, ...covers].map((cover) => {
          return (
            <div key={cover.photoURL} className='w-[30%]'>
              <Card
                onClick={() => handleSelect(cover)}
                className={`${
                  selectedCover?.name === cover?.name
                    ? 'border border-sky-500'
                    : ''
                }`}
              >
                <CardMedia image={cover.photoURL} component='img' />
                <CardContent className='p-2 !pb-2 !pt-2 '>
                  <div className='text-xs text-center'>{cover.name}</div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div> */}
      <div className='flex items-center justify-center'>
        <input
          type='file'
          id='upload-cover-new'
          accept='image/*'
          className='hidden'
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* <label htmlFor='upload-cover'> */}
        <button
          onClick={handleClick}
          className='p-2 text-sky-300 flex flex-row gap-2 items-center'
        >
          <AddAPhotoOutlined />
          Upload Album Cover
        </button>
        {/* </label> */}
      </div>
    </SwipeableDrawer>
  );
};

export default AlbumCover;
