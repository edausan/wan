/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Suspense, Fragment } from "react";
import { useParams } from "react-router-dom";
import PostLoading from "./PostLoading";
import { GetAllPosts } from "../../../Firebase/postsApi";
import { useQuery } from "react-query";
import PostsQuery from "../../../api/postsQuery";
import { Typography } from "@mui/material";

const Post = React.lazy(() => import("./Post"));

const PostsMain = ({ profile }) => {
	const params = useParams();
	const postsQuery = PostsQuery(params.id);
	const [allPosts, setAllPosts] = useState([]);

	const posts = postsQuery.postsQuery;
	const userPosts = postsQuery.userPostQuery;

	useEffect(() => {
		userPosts.refetch();
	}, [params.id]);

	useEffect(() => {
		if (profile) {
			setAllPosts(userPosts.data);
		} else if (posts.data?.length > 0 && !posts.isFetching) {
			setAllPosts(posts.data);
		}
	}, [params.id, posts.data, posts.isFetching, userPosts.data, profile]);

	return (
		<>
			{allPosts?.length > 0 ? (
				<section className={`flex flex-col gap-3 mt-4 w-full`}>
					{allPosts
						?.slice()
						.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
						.map((post, idx) => {
							return (
								<Fragment key={`${post?.id}~${idx}`}>
									<Suspense key={post?.id} fallback={<PostLoading />}>
										<Post key={post?.id} post={post} profile={profile} />
									</Suspense>
								</Fragment>
							);
						})}
					<section className="flex flex-row p-4 pb-[80px] justify-center items-center">
						<div className="text-sm text-gray-300">End of Posts</div>
					</section>
				</section>
			) : (
				<div>
					<Typography variant="body2" sx={{ textAlign: "center" }}>
						{userPosts.isFetching ? (
							<div>Loading...</div>
						) : (
							<div>No post yet.</div>
						)}
					</Typography>
				</div>
			)}
		</>
	);
};

export default React.memo(PostsMain);
