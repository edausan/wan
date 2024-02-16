import { useQuery } from "@tanstack/react-query";
import { GetAllUsers, GetUserMetadata } from "@/Firebase/userApi";
import { FirebaseApp, time } from "@/Firebase";
import { getAuth } from "firebase/auth";

const UserQuery = (id = "") => {
  const auth = getAuth(FirebaseApp);
  const currentUser = auth.currentUser;

  const userQuery = useQuery({
    queryKey: ["userData"],
    queryFn: () => GetUserMetadata({ id }),
    cacheTime: time,
    staleTime: time,
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: GetAllUsers,
    cacheTime: time,
    staleTime: time,
  });

  return {
    userQuery,
    usersQuery,
    currentUser,
  };
};

export default UserQuery;
