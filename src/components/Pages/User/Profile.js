/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useContext, useEffect, useState, lazy, memo, useMemo } from "react";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import { AppCtx } from "@/App";
import { HeartProfile } from "@/Firebase/authApi";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "@/Firebase";
import ProfileLoading from "./Loading/ProfileLoading";
import FriendsLoading from "./Loading/FriendsLoading";
import { JIL_ADMIN } from "@/data";
import { CampaignOutlined, Notes } from "@mui/icons-material";
import UserQuery from "@api/userQuery";
import LineupQuery from "@api/lineupQuery";

const WritePost = lazy(() => import("./WritePost"));
const FriendsModal = lazy(() => import("./FriendsModal"));
const PhotoHeart = lazy(() => import("./PhotoHeart"));
const UserTabs = lazy(() => import("./Tabs"));
const NewProfileLayout = lazy(() => import("./NewProfileLayout"));
const Friends = lazy(() => import("./Friends"));
const AddTheme = lazy(() => import("./AddTheme"));

const Profile = () => {
  const auth = getAuth(FirebaseApp);
  const userProfile = auth.currentUser;

  const params = useParams();
  const { scrollToTop } = useContext(AppCtx);
  const [open, setOpen] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);
  const [openAddTheme, setOpenAddTheme] = useState(false);

  const userQuery = UserQuery(params.id);
  const lineupQuery = LineupQuery(params.id);

  const userLineup = lineupQuery.userLineupQuery;

  // users
  const userData = useMemo(() => userQuery.userQuery, [userQuery.userQuery.data]);
  const users = useMemo(() => userQuery.usersQuery, []);

  useEffect(() => {
    setOpenFriends(false);
    userData.refetch();
    userLineup.refetch();
  }, [params.id]);

  // const { posts } = RealtimePosts();

  useEffect(() => {
    // setPostsData();
  }, [params.id]);

  useEffect(() => {
    setOpen(false);
    scrollToTop();
  }, []);

  // useEffect(() => {
  // 	setOpenFriends(false);
  // 	if (
  // 		currentUser?.user?.uid &&
  // 		params.id !== "undefined" &&
  // 		currentUser.user?.uid !== params.id
  // 	) {
  // 		const filtered = users.filter((u) => u.uid === params?.id)[0];
  // 		setUser(filtered);
  // 	} else {
  // 		setUser(currentUser.user_metadata);
  // 	}
  // }, [currentUser, params]);

  // useEffect(() => {
  // 	!user && handleGetUser();
  // }, [params?.id]);

  // const handleGetUser = async () => {
  // 	try {
  // 		const userData = await GetUserMetadata({ id: params.id });
  // 		setUser(userData);
  // 		userData?.ministry === "VIA" && handleLineups();
  // 	} catch (error) {
  // 		console.log({ handleGetUser_ERR: error });
  // 	}
  // };

  const handleHeart = () => {
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

      // handleGetUser();
    }
  };

  const handleToOther = () => {
    setOpen(false);
  };

  // useEffect(() => {
  // 	window.addEventListener("scroll", handleScroll);

  // 	return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScroll = (e) => {
  // 	console.log(e);
  // 	const scrollY = e?.path[1]?.scrollY;
  // 	const profile = document.querySelector("#new-profile-layout")?.clientHeight;
  // 	if (scrollY > profile) {
  // 		setShowHeader(true);
  // 	} else {
  // 		setShowHeader(false);
  // 	}
  // };

  const user = userData.data;

  return (
    <section className="relative">
      {/* <ProfileHeader show={showHeader} user={user} /> */}
      <Suspense fallback={<div />}>
        <FriendsModal
          open={openFriends}
          setOpen={setOpenFriends}
          user={user}
          friends={users.data}
        />
      </Suspense>

      <Suspense fallback={<div />}>
        <PhotoHeart
          friends={users.data}
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

      <section className="max-w-[680px] mx-auto">
        <Suspense fallback={<FriendsLoading />}>
          <Friends friends={users.data} id={params?.id} setOpenFriends={setOpenFriends} />
        </Suspense>

        {params.id === JIL_ADMIN && (
          <Suspense fallback={<div />}>
            <AddTheme open={openAddTheme} setOpen={setOpenAddTheme} />
          </Suspense>
        )}

        {params.id === JIL_ADMIN && (
          <Card className="mb-4">
            <div className="p-4 flex flex-row gap-4 items-center justify-start">
              <button
                disabled
                className="text-sm border border-gray-700 rounded-md px-4 py-2 enabled:hover:bg-gray-600 enabled:hover:border-gray-600 disabled:opacity-40 bg-black/30 disabled:border-0 disabled:text-white/25"
              >
                <CampaignOutlined /> Add Announcement
              </button>
              <button
                className="flex flex-row gap-2 items-center text-sm border border-gray-700 rounded-md px-4 py-2 hover:bg-gray-600 hover:border-gray-600"
                onClick={() => setOpenAddTheme(true)}
              >
                <Notes />{" "}
                <span flex flex-row items-center>
                  Add Theme
                </span>
              </button>
            </div>
          </Card>
        )}

        {/* {params.id === userProfile?.uid && (
					<Suspense fallback={<WritepostLoading />}>
						<WritePost />
					</Suspense>
				)} */}

        <Card elevation={0} className="bg-transparent">
          <Suspense fallback={<div />}>
            <UserTabs userlineup={userLineup.data} user={user} />
          </Suspense>
        </Card>
      </section>
    </section>
  );
};

export default memo(Profile);
