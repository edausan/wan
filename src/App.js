import "./App.css"
import {Grid, Typography} from "@mui/material"
import Navigation from "./components/Navigation"
import {useState, createContext, useEffect} from "react"
import Home from "./components/Pages/Home"
import Assignments from "./components/Pages/Assignments"
import Lineup from "./components/Lineup/LineupMain"
import {WAN_LOGO} from "./data"
import {createAccount, RealtimeMetadata} from "./Firebase/authApi"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import NewLineup from "./components/Lineup/NewLineup"
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles"
import Settings from "./components/Pages/Settings"
import Login from "./components/Pages/Auth/Login"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {FirebaseApp, Firestore} from "./Firebase"
import Splash from "./components/Pages/Auth/Splash"
import EditProfile from "./components/Pages/EditProfile"
import {doc, onSnapshot, collection} from "firebase/firestore"
import ProfilePage from "./components/Pages/Profile"
import APP_BG from "./assets/bg.jpg"

export const AppCtx = createContext()

const auth = getAuth(FirebaseApp)
const user = auth.currentUser

function App() {
	const defaultTheme = useTheme()
	const {data} = RealtimeMetadata()
	const [currentUser, setCurrentUser] = useState({
		user: null,
		user_metadata: null
	})

	const [worshipLeader, setWorshipLeader] = useState(0)
	const [index, setIndex] = useState(0)
	const [mode, setMode] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [lineups, setLineups] = useState([])

	console.log({lineups})

	useEffect(() => {
		console.log({data})
		setCurrentUser({...currentUser, user_metadata: data})
	}, [data])

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setCurrentUser({...currentUser, user})
			} else {
				console.log({user})
				setCurrentUser({...currentUser, user})
			}
		})
	}, [])

	const value = {
		setWorshipLeader,
		worshipLeader,
		setIndex,
		index,
		setMode,
		mode,
		setCurrentUser,
		currentUser,
		setIsLoggedIn,
		isLoggedIn,
		setLineups,
		lineups
	}

	console.log({paper: defaultTheme.palette.background.paper})

	const theme = createTheme({
		palette: {
			mode: mode ? "light" : "dark",
			background: {
				paper: mode ? "#ffffff85" : "#121212c9",
				default: mode ? "#ffffff85" : "#121212c9"
			}
		}
	})

	useEffect(() => {
		document.body.style.background = mode ? "#eee" : "#121212"
	}, [mode])

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AppCtx.Provider value={value}>
					{!currentUser?.user ? (
						<Splash />
					) : (
						<main>
							<Grid
								container
								sx={{
									justifyContent: "center",
									backgroundSize: "cover",
									backgroundAttachment: "fixed",
									overflow: "auto",
									maxHeight: "100vh",
									backgroundOpacity: 0.5,
									position: "relative",
									"&::before": {
										position: "fixed",
										top: 0,
										left: 0,
										content: '""',
										width: "100%",
										height: "100%",
										background: `url(${APP_BG})`,
										backgroundSize: "cover",
										zIndex: 1000,
										opacity: 0.2
									},
									"& .MuiCard-root": {
										backdropFilter: "blur(5px)"
									}
								}}
							>
								<Navigation />
								<Grid
									item
									sx={{
										p: 2,
										mt: 1,
										pb: 10,
										height: "100vh",
										maxWidth: 500,
										width: "100%",
										overlfow: "auto",
										zIndex: 1001
									}}
								>
									<Switch>
										<Route exact path="/" component={Home} />
										<Route path="/assignments" component={Assignments} />
										<Route exact path="/lineup" component={Lineup} />
										<Route path="/lineup/new" component={NewLineup} />
										<Route path="/lineup/edit/:id" component={NewLineup} />
										<Route path="/settings" component={Settings} />
										<Route path="/edit_profile" component={EditProfile} />
										<Route path="/profile/:id" component={ProfilePage} />
									</Switch>
								</Grid>
							</Grid>
						</main>
					)}
				</AppCtx.Provider>
			</Router>
		</ThemeProvider>
	)
}

export default App
