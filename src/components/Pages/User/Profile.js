/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AppCtx } from './../../../App';
import { GetUserMetadata, HeartProfile } from '../../../Firebase/authApi';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from './../../../Firebase';
import { GetLineup } from '../../../Firebase/songsApi';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../redux/slices/usersSlice';
import { selectUserPost } from '../../../redux/slices/postsSlice';
import ProfileLoading from './Loading/ProfileLoading';
import FriendsLoading from './Loading/FriendsLoading';
import WritepostLoading from './Loading/WritepostLoading';
// import Friends from './Friends';

const WritePost = React.lazy(() => import('./WritePost'));
const FriendsModal = React.lazy(() => import('./FriendsModal'));
const PhotoHeart = React.lazy(() => import('./PhotoHeart'));
const UserTabs = React.lazy(() => import('./Tabs'));
const NewProfileLayout = React.lazy(() => import('./NewProfileLayout'));
const Friends = React.lazy(() => import('./Friends'));

const Profile = () => {
  const stateUsers = useSelector(selectUsers);
  const userPosts = useSelector(selectUserPost);
  const { users, currentUser } = stateUsers;

  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;

  const params = useParams();
  const { scrollToTop, setPostsData } = useContext(AppCtx);
  const [user, setUser] = useState(null);
  const [userlineup, setUserlineup] = useState([]);
  const [friends, setFriends] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);

  // const { posts } = RealtimePosts();

  useEffect(() => {
    console.log({ userPosts });
    userPosts.length <= 0 && setPostsData();
  }, [userPosts]);

  useEffect(() => {
    setOpen(false);
    scrollToTop();
    setFriends(users);
  }, []);

  useEffect(() => {
    console.log({ currentUser, params, users });
    setOpenFriends(false);
    if (
      currentUser?.user?.uid &&
      params.id !== 'undefined' &&
      currentUser.user?.uid !== params.id
    ) {
      const filtered = users.filter((u) => u.uid === params?.id)[0];
      console.log({ filtered });
      setUser(filtered);
    } else {
      setUser(currentUser.user_metadata);
    }
  }, [currentUser, params]);

  const handleGetUser = async () => {
    try {
      const userData = await GetUserMetadata({ id: params.id });
      setUser(userData);
      userData?.ministry === 'VIA' && handleLineups();
    } catch (error) {
      console.log({ handleGetUser_ERR: error });
    }
  };

  const handleLineups = async () => {
    const userLineups = await GetLineup({ id: params.id });
    console.log({ userLineups });
    setUserlineup(
      userLineups.sort(
        (a, b) => new Date(b.date_created) - new Date(a.date_created)
      )
    );
  };

  const handleHeart = () => {
    console.log({ user });
    const idx = user?.photoHeart?.findIndex((h) => h === userProfile.uid);

    if (idx === -1) {
      HeartProfile({
        heart: {
          photoHeart: user?.photoHeart
            ? [...user?.photoHeart, userProfile?.uid]
            : [userProfile?.uid],
        },
        id: params.id,
      });

      handleGetUser();
    }
  };

  const handleToOther = () => {
    setOpen(false);
  };

  return (
    <>
      <Suspense fallback={<div />}>
        <FriendsModal
          open={openFriends}
          setOpen={setOpenFriends}
          user={user}
          friends={friends}
        />
      </Suspense>

      <Suspense fallback={<div />}>
        <PhotoHeart
          friends={friends}
          handleToOther={handleToOther}
          open={open}
          setOpen={setOpen}
          user={user}
        />
      </Suspense>

      <Suspense fallback={<ProfileLoading />}>
        <NewProfileLayout
          user={user}
          paramsId={params.id}
          currentUser={userProfile}
          handleHeart={handleHeart}
          setOpen={setOpen}
        />
      </Suspense>

      <Suspense fallback={<FriendsLoading />}>
        <Friends
          friends={friends}
          id={params?.id}
          setOpenFriends={setOpenFriends}
        />
      </Suspense>

      {params.id === userProfile?.uid && (
        <Suspense fallback={<WritepostLoading />}>
          <WritePost />
        </Suspense>
      )}

      <Card>
        <Suspense fallback={<div />}>
          <UserTabs userlineup={userlineup} userPosts={userPosts} user={user} />
        </Suspense>
      </Card>
    </>
  );
};

export default React.memo(Profile);
