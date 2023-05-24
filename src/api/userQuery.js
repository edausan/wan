import { useQuery } from "react-query";
import { GetAllUsers, GetUserMetadata } from "../Firebase/userApi";

const UserQuery = (id = "") => {
	const userQuery = useQuery("userData", () => GetUserMetadata({ id }), {
		cacheTime: 60 * 60 * 1000,
	});

	const usersQuery = useQuery("users", GetAllUsers, {
		cacheTime: 60 * 60 * 1000,
	});

	return {
		userQuery,
		usersQuery,
	};
};

export default UserQuery;
