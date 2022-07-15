import React from 'react';
import {
  EmojiEmotionsTwoTone,
  FavoriteTwoTone,
  SentimentVeryDissatisfiedTwoTone,
  ThumbUpTwoTone,
} from '@mui/icons-material';
import { Card, CardContent, Drawer } from '@mui/material';

const ReactionDrawer = ({ open, setOpen, setReaction, reaction, post }) => {
  return (
    <Drawer anchor='bottom' open={open} onClose={() => setOpen(false)}>
      <Card>
        <CardContent className='flex flex-row justify-evenly text-center'>
          <div
            onClick={() => setReaction('love')}
            className={`p-2 rounded-md ${
              reaction === 'heart' ? 'bg-white/10' : ''
            }`}
          >
            <FavoriteTwoTone className='text-red-500' />{' '}
            <div className='text-xs'>Love</div>
          </div>
          <div
            onClick={() => setReaction('like')}
            className={`p-2 rounded-md ${
              reaction === 'like' ? 'bg-white/10' : ''
            }`}
          >
            <ThumbUpTwoTone className='text-blue-500' />{' '}
            <div className='text-xs'>Like</div>
          </div>
          <div
            onClick={() => setReaction('haha')}
            className={`p-2 rounded-md ${
              reaction === 'haha' ? 'bg-white/10' : ''
            }`}
          >
            <EmojiEmotionsTwoTone className='text-yellow-500' />{' '}
            <div className='text-xs'>Haha</div>
          </div>
          <div
            onClick={() => setReaction('sad')}
            className={`p-2 rounded-md ${
              reaction === 'sad' ? 'bg-white/10' : ''
            }`}
          >
            <SentimentVeryDissatisfiedTwoTone className='text-purple-500' />{' '}
            <div className='text-xs'>Sad</div>
          </div>
        </CardContent>
      </Card>
    </Drawer>
  );
};

export default ReactionDrawer;
