/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import {
	Avatar,
	AvatarGroup,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Divider,
	IconButton,
	Skeleton,
} from "@mui/material";
import { GetAllUsers } from "../../../Firebase/authApi";
import {
	CommentTwoTone,
	EmojiEmotionsTwoTone,
	FavoriteTwoTone,
	MoreVert,
	SentimentVeryDissatisfiedTwoTone,
	ShareTwoTone,
	ThumbUpOffAltOutlined,
	ThumbUpTwoTone,
} from "@mui/icons-material";
import PostDrawer from "./PostDrawer";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "../../../Firebase";
import ReactionDrawer from "./ReactionDrawer";
import { GetAllPosts, GetPost, ReactPost } from "../../../Firebase/postsApi";
import { Link, useParams } from "react-router-dom";
import ReactionsModal from "./ReactionsModal";
import PostComments from "./PostComments";
import TextArea from "./../../CustomComponents/TextArea";
import { useSelector } from "react-redux";
import {
	selectUsers,
	selectCurrentUser,
} from "../../../redux/slices/usersSlice";
import { selectPost } from "../../../redux/slices/postsSlice";
import { AppCtx } from "../../../App";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";

const Post = ({ post: current, profile }) => {
	const params = useParams();
	const auth = getAuth(FirebaseApp);
	const userProfile = auth.currentUser;
	const { scrollToTop } = useContext(AppCtx);

	// const users = useSelector(selectUsers);
	const { data: users } = useQuery("users", GetAllUsers);
	const postsQuery = useQuery("posts", GetAllPosts);

	const currentUser = useSelector(selectCurrentUser);

	const [user, setUser] = useState(null);
	const [open, setOpen] = useState(false);
	const [reaction, setReaction] = useState(null);
	const [reactionsOpen, setReactionsOpen] = useState(false);
	const [msg, setMsg] = useState("");
	const [hashtags, setHashtags] = useState([]);
	const [openReacions, setOpenReactions] = useState(false);
	const [openComments, setOpenComments] = useState(false);
	const [post, setPost] = useState(null);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		scrollToTop();
	}, []);

	useEffect(() => {
		if (params?.id === currentUser.uid && profile) {
			handlePost({ post: current, user: currentUser });
		} else if (
			params?.id !== currentUser.uid ||
			(!profile && postsQuery.data)
		) {
			handleGetPost();
		}
	}, [current, params?.id, postsQuery.data]);

	const handleGetPost = () => {
		try {
			const id = params?.id || current.uid;
			const post = postsQuery.data?.filter((pq) => pq.id === id)[0];
			// const user = await GetUserMetadata({ id: post?.uid || id });
			const user = users.filter((u) => u.uid === (current?.uid || post.uid))[0];
			handlePost({ post: post || current, user });
			// if (user.uid) {
			// 	handlePost({ post: post || current, user });
			// }
		} catch (error) {}
	};

	const handlePost = (postData) => {
		setMsg(postData?.post?.message?.split("#")[0].trim());
		const tags = postData?.post?.message?.split("#").filter((t, i) => i !== 0);
		setHashtags(tags);
		setPost(postData.post);
		setUser(postData.user);
	};

	useEffect(() => {
		setFriends(users);
	}, [users]);

	useEffect(() => {
		setReactionsOpen(false);
		reaction && handleReact();
	}, [reaction]);

	const handleReact = async () => {
		try {
			const idx =
				post?.reactions?.findIndex((r) => r.uid === userProfile.uid) === -1;
			const reacts =
				idx === -1
					? post?.reactions
					: post?.reactions.filter((r) => r.uid !== userProfile.uid);
			const reactions = [
				...reacts,
				{
					uid: userProfile.uid,
					reaction,
				},
			];
			await ReactPost({ postId: post?.id, reactions });
			setReaction(null);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleReactions = (reaction, list) => {
		switch (reaction) {
			case "love":
				return {
					icon: <FavoriteTwoTone className="text-red-500" />,
					color: "text-red-500",
				};
			case "like":
				return {
					icon: <ThumbUpTwoTone className="text-blue-500" />,
					color: "text-blue-500",
				};
			case "haha":
				return {
					icon: <EmojiEmotionsTwoTone className="text-yellow-500" />,
					color: "text-yellow-500",
				};
			case "sad":
				return {
					icon: (
						<SentimentVeryDissatisfiedTwoTone className="text-purple-500" />
					),
					color: "text-purple-500",
				};

			default:
				return {
					icon: null,
					color: "#ccc",
				};
		}
	};
	const handleHeart = async () => {};

	// useEffect(() => {
	// 	if (post?.media_type === "video/mp4") {
	// 		const media = post?.media
	// 			.split("video/upload")
	// 			.join("video/upload/f_jpg");
	// 	}
	// }, [post]);

	return (
		<Card
			className={`w-full shadow-md ${!profile ? "max-w-[680px] mx-auto" : ""}`}
			elevation={0}>
			<ReactionsModal
				setOpen={setOpenReactions}
				open={openReacions}
				friends={friends}
				reactions={post?.reactions}
				handleReactions={handleReactions}
			/>
			<CardHeader
				avatar={
					<>
						{/* <Link to={`/profile/${post?.uid}`}> */}
						{user?.photoURL ? (
							<Avatar src={user?.photoURL} aria-label="recipe">
								{user?.displayName.split("")[0]}
							</Avatar>
						) : (
							<Skeleton variant="circular" width={40} height={40} />
						)}
						{/* </Link> */}
					</>
				}
				action={
					!params?.id && (
						<IconButton aria-label="settings" onClick={() => setOpen(true)}>
							<MoreVert />
						</IconButton>
					)
				}
				title={
					<>
						{/* <Link to={`/profile/${post?.uid}`}> */}
						{user?.displayName ? (
							<span className="text-sm">{user?.displayName}</span>
						) : (
							<Skeleton variant="text" />
						)}
						{/* </Link> */}
					</>
				}
				subheader={
					<span className="text-xs">
						{post?.date_created ? (
							post?.date_created
						) : (
							<Skeleton variant="text" />
						)}
					</span>
				}
			/>
			{post?.media_type === "video/mp4" ? (
				<CardMedia
					src={post?.media}
					component="video"
					controls
					preload="none"
					poster={post?.media.split("video/upload").join("video/upload/f_jpg")}
				/>
			) : (
				<LazyLoadImage
					alt="demonstration1"
					effect="blur"
					placeholder={<Skeleton variant="rectangular" height={350} />}
					src={post?.media}
				/>
			)}
			<CardContent>
				<p>{msg}</p>

				<div>
					{hashtags?.map((hash, idx) => {
						return (
							<Link
								key={`${hash}~${idx}`}
								to="#"
								className="no-underline text-sky-500 italic">
								#{hash}
							</Link>
						);
					})}
				</div>
				{/* <p className='text-sm'>{post?.message}</p> */}
			</CardContent>
			{post?.reactions?.length > 0 && (
				<>
					<Divider />
					<CardContent
						onClick={() => setOpenReactions(true)}
						className="p-2 flex flex-row items-center">
						<AvatarGroup
							className="self-start"
							max={5}
							sx={{
								"& > .MuiAvatar-root": {
									width: 20,
									height: 20,
								},
								"& .MuiAvatarGroup-avatar": {
									border: "3px solid #282626",
									"&:first-child": {
										display: post?.reactions?.length > 3 ? "none" : "flex",
									},
									//   p: '.25rem',
									//   background: '#333',
								},
							}}>
							{post?.reactions?.map((r, idx) => {
								const user = friends?.filter((f) => f.uid === r?.uid)[0];
								return (
									<Avatar
										key={`${user?.uid}~${idx}`}
										alt={user?.displayName}
										src={user?.photoURL}
										className={`text-[8px] !bg${
											handleReactions(r.reaction)?.color.split("text")[1]
										}`}>
										{/* {handleReactions(r.reaction)?.icon} */}
									</Avatar>
								);
							})}
						</AvatarGroup>
						<div className="text-xs ml-2">
							{post?.reactions?.map((r, i) => {
								const user = friends?.filter((f) => f.uid === r?.uid)[0];
								if (i <= 1) {
									return (
										<>
											<span key={`${user?.uid}~${i}`}>
												{i >= 1 && ", "}
												{user?.displayName}
											</span>
										</>
									);
								}
							})}

							{post?.reactions?.length > 2 && (
								<span>
									{" "}
									and {post?.reactions?.length - 2} other
									{post?.reactions?.length - 2 > 1 && "s"}
								</span>
							)}
						</div>
					</CardContent>
				</>
			)}
			<Divider />

			<CardActions className="justify-center grid grid-cols-3 p-1">
				<Button
					className="col-span-1 ml-0"
					variant="text"
					onClick={() => setReactionsOpen(true)}
					startIcon={
						post?.reactions?.findIndex((r) => r?.uid === userProfile?.uid) !==
							-1 || reaction ? (
							handleReactions(
								reaction ||
									post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
										?.reaction
							)?.icon
						) : (
							<ThumbUpOffAltOutlined className="" onClick={handleHeart} />
						)
					}>
					<span
						className={`!capitalize text-xs ${
							handleReactions(
								reaction ||
									post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
										?.reaction
							)?.color
						}`}>
						{reaction?.charAt(0).toUpperCase() + reaction?.slice(1) ||
							post?.reactions
								?.filter((r) => r?.uid === userProfile?.uid)[0]
								?.reaction?.charAt(0)
								.toUpperCase() +
								post?.reactions
									?.filter((r) => r?.uid === userProfile?.uid)[0]
									?.reaction?.slice(1) || (
								<span className="text-white/40">Like</span>
							)}
					</span>
				</Button>
				<Button
					variant="text"
					className={`!ml-0 ${
						post?.comments?.length > 0 ? "text-sky-500" : ""
					} col-span-1`}
					startIcon={<CommentTwoTone className="w-[16px] h-[16px]" />}
					onClick={() => setOpenComments(true)}>
					<span className="!capitalize text-xs">
						Comment
						{post?.comments?.length > 1 ? (
							<span className="lowercase">s</span>
						) : (
							""
						)}{" "}
						<span>({post?.comments?.length})</span>
					</span>
				</Button>
				<Button
					// disabled`
					variant="text"
					color="inherit"
					className="ml-0 col-span-1"
					startIcon={<ShareTwoTone className="w-[16px] h-[16px]" />}>
					<a
						href={`https://m.me/j/Aba8ddZutv5MvPbi/`}
						style={{ textDecoration: "none", color: "inherit" }}
						onClick={() => {
							navigator.clipboard.writeText(
								`https://wan-belleview.web.app/post/${post?.id}`
							);
						}}
						className="ml-2">
						<span className="!capitalize text-xs">Share</span>
					</a>
				</Button>
			</CardActions>

			{post?.comments?.length > 0 && (
				<>
					<Divider />
					<CardContent className="!pb-1 p-1">
						<PostComments
							open={openComments}
							setOpen={setOpenComments}
							post={post}
							preview
						/>
					</CardContent>
				</>
			)}

			<ReactionDrawer
				open={reactionsOpen}
				setOpen={setReactionsOpen}
				setReaction={setReaction}
				reaction={
					reaction ||
					post?.reactions?.filter((r) => r?.uid === userProfile?.uid)[0]
						?.reaction
				}
				post={post}
			/>
			{!params?.id && <PostDrawer open={open} setOpen={setOpen} post={post} />}
			<PostComments open={openComments} setOpen={setOpenComments} post={post} />
		</Card>
	);
};

export default React.memo(Post);
