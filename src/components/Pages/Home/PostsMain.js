import React from 'react';
import { RealtimeUsers } from '../../../Firebase/authApi';
import { RealtimePosts } from '../../../Firebase/postsApi';
import Post from './Post';

const PostsMain = () => {
  const { posts } = RealtimePosts();
  const { data } = RealtimeUsers();
  return (
    <section className='flex flex-col gap-2 mt-2'>
      {posts.map((post) => {
        return <Post key={post.id} post={post} friends={data} />;
      })}
    </section>
  );
};

export default PostsMain;
