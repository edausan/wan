import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "./components/CustomComponents/Loading";

// Components
const Home = lazy(() => import("./components/Pages/Home"));
const Lineup = lazy(() => import("./components/Lineup/LineupMain"));
const Assignments = lazy(() => import("./components/Pages/Assignments"));
const NewLineup = lazy(() => import("./components/Lineup/NewLineup"));
const EditLineup = lazy(() => import("./components/Lineup/EditLineup"));
const Settings = lazy(() => import("./components/Pages/Settings"));
const EditProfile = lazy(() => import("./components/Pages/EditProfile"));
const ViewLineup = lazy(() => import("./components/Lineup/ViewLineup"));
const SetAssignment = lazy(() =>
	import("./components/Pages/Assignment/SetAssignment")
);
const Profile = lazy(() => import("./components/Pages/User/Profile"));
const Post = lazy(() => import("./components/Pages/Home/Post"));
const SongsMain = lazy(() => import("./components/Pages/Songs/SongsMain"));
const Theme = lazy(() => import("./components/Pages/Home/Theme"));

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Suspense fallback={<Loading />}>
					<Home />
				</Suspense>
			</Route>
			<Route exact path="/assignments">
				<Suspense fallback={<Loading />}>
					<Assignments />
				</Suspense>
			</Route>
			<Route path="/assignments/new">
				<Suspense fallback={<Loading />}>
					<SetAssignment />
				</Suspense>
			</Route>
			<Route exact path="/assignments/:id">
				<Suspense fallback={<Loading />}>
					<SetAssignment />
				</Suspense>
			</Route>
			<Route exact path="/lineup">
				<Suspense fallback={<Loading />}>
					<Lineup />
				</Suspense>
			</Route>
			<Route path="/lineup/new">
				<Suspense fallback={<Loading />}>
					<NewLineup />
				</Suspense>
			</Route>
			<Route exact path="/lineup/:id">
				<Suspense fallback={<Loading />}>
					<ViewLineup />
				</Suspense>
			</Route>
			<Route path="/lineup/edit/:id">
				<Suspense fallback={<Loading />}>
					<EditLineup />
				</Suspense>
			</Route>
			<Route path="/settings">
				<Suspense fallback={<Loading />}>
					<Settings />
				</Suspense>
			</Route>
			<Route path="/edit_profile">
				<Suspense fallback={<Loading />}>
					<EditProfile />
				</Suspense>
			</Route>
			<Route path="/profile/:id">
				<Suspense fallback={<Loading />}>
					<Profile />
				</Suspense>
			</Route>
			<Route path="/post/:id">
				<Suspense fallback={<Loading />}>
					<section className="p-3">
						<Post />
					</section>
				</Suspense>
			</Route>
			<Route path="/songs">
				<Suspense fallback={<Loading />}>
					<SongsMain />
				</Suspense>
			</Route>
			<Route path="/theme/:id">
				<Suspense fallback={<Loading />}>
					<Theme />
				</Suspense>
			</Route>
		</Switch>
	);
};

export default Routes;