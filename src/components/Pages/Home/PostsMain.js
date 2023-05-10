/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Suspense, Fragment } from "react";
import { useParams } from "react-router-dom";
import PostLoading from "./PostLoading";
import { GetAllPosts } from "../../../Firebase/postsApi";
import { useQuery } from "react-query";

const Post = React.lazy(() => import("./Post"));

const PostsMain = ({ profile }) => {
	const params = useParams();
	const [allPosts, setAllPosts] = useState([]);

	const { data, isFetching } = useQuery("posts", GetAllPosts, {
		cacheTime: 60 * 60 * 1000,
	});

	useEffect(() => {
		// if (profile && params?.id && data?.length > 0 && !isFetching) {
		// 	const p = data?.filter((p) => p.uid === params?.id);
		// 	setAllPosts(p);
		// } else if (data?.length > 0 && !isFetching) {
		// 	setAllPosts(data);
		// }
		if (data.length > 0 && !isFetching) {
			setAllPosts(data);
		}
	}, [params.id, data, isFetching]);

	return (
		<>
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
		</>
	);
};

export default React.memo(PostsMain);
