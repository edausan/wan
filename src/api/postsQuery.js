import { useQuery } from "@tanstack/react-query";
import { GetAllPosts, GetPosts } from "../Firebase/postsApi";
import { time } from "../Firebase";

const PostsQuery = (uid = "") => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: GetAllPosts,
    cacheTime: time,
    staleTime: time,
  });

  const userPostQuery = useQuery({
    queryKey: ["userPosts"],
    queryFn: () => GetPosts({ id: uid }),
    cacheTime: time,
    staleTime: time,
  });

  return {
    postsQuery,
    userPostQuery,
  };
};

export default PostsQuery;
