import React from "react";
import { useQuery } from "react-query";
import { GetAllPosts, GetPosts } from "../Firebase/postsApi";

const PostsQuery = (uid = "") => {
	const postsQuery = useQuery("posts", GetAllPosts, {
		cacheTime: 60 * 60 * 1000,
	});

	const userPostQuery = useQuery("userPosts", () => GetPosts({ id: uid }), {
		cacheTime: 60 * 60 * 1000,
	});

	return {
		postsQuery,
		userPostQuery,
	};
};

export default PostsQuery;
