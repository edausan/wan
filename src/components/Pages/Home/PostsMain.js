import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseApp } from '../../../Firebase';
import { RealtimeUsers } from '../../../Firebase/authApi';
import { GetPosts, RealtimePosts } from '../../../Firebase/postsApi';
import Post from './Post';

const PostsMain = ({ profile }) => {
  const params = useParams();
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;
  const { posts } = RealtimePosts();
  const { data } = RealtimeUsers();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    handleGetPosts();
  }, [params, posts]);

  const handleGetPosts = async () => {
    const res = await GetPosts({ id: params.id });
    setUserPosts(res);
  };

  const posts_data = profile ? userPosts : posts;

  return (
    <section
      className={`flex flex-col gap-2 mt-2 pb-[${profile ? '0' : '200px'}]  `}
    >
      {posts_data
        .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        .map((post) => {
          return <Post key={post.id} post={post} friends={data} />;
        })}
    </section>
  );
};

export default PostsMain;
