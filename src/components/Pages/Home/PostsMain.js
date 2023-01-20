/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Suspense, Fragment } from "react";
import { useParams } from "react-router-dom";
import PostLoading from "./PostLoading";
import { RealtimePosts } from "../../../Firebase/postsApi";

const Post = React.lazy(() => import("./Post"));

const PostsMain = ({ profile }) => {
	const { posts: Posts } = RealtimePosts();
	const params = useParams();
	const [allPosts, setAllPosts] = useState([]);

	useEffect(() => {
		if (profile && params?.id && Posts.length > 0) {
			const p = Posts.filter((p) => p.uid === params?.id);
			setAllPosts(p);
		} else {
			setAllPosts(Posts);
		}
	}, [params.id, Posts]);

	return (
		<>
			<section className={`flex flex-col gap-3 mt-4 w-full`}>
				{allPosts
					.slice()
					.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
					.map((post) => {
						return (
							<Fragment key={post?.id}>
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
		</>
	);
};

export default React.memo(PostsMain);
