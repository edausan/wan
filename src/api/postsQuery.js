import { useQuery } from "react-query";
import { GetAllPosts, GetPosts } from "../Firebase/postsApi";
import { time } from "../Firebase";

const PostsQuery = (uid = "") => {
	const postsQuery = useQuery("posts", GetAllPosts, {
		cacheTime: time,
		staleTime: time,
	});

	const userPostQuery = useQuery("userPosts", () => GetPosts({ id: uid }), {
		cacheTime: time,
		staleTime: time,
	});

	return {
		postsQuery,
		userPostQuery,
	};
};

export default PostsQuery;
