import {
	LoginOutlined,
	Visibility,
	VisibilityOff,
	Brightness7,
	Brightness4,
} from "@mui/icons-material";
import {
	Alert,
	Button,
	Card,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppCtx } from "../../../App";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import WAN_LOGO from "../../../assets/WAN_LOGO.png";
import WAN_LOGO_WHITE from "../../../assets/WAN_LOGO_WHITE.png";
import { CreateAccount, RealtimeTeams } from "../../../Firebase/authApi";
import { useEffect } from "react";

export const Ministries = [
	{
		name: "Jesus’ Army of Musicians (JAM)",
		id: "JAM",
	},
	{
		name: "Voices in Adoration (VIA)",
		id: "VIA",
	},
	{
		name: "TEAM (Triune, Elyondoulos, Acts, Movenerate)",
		id: "TEAM",
	},
	{
		name: "Multimedia Arts Network (MAN)",
		id: "MAN",
	},
];

const SignUp = ({ setScreen }) => {
	const theme = useTheme();
	const { setMode, mode, setCurrentUser, setIsLoggedIn } = useContext(AppCtx);
	const [show, setShow] = useState(false);
	const [user, setUser] = useState({
		email: null,
		password: null,
		ministry: null,
	});
	const [userId, setUserId] = useState(null);
	const [isSigning, setIsSigning] = useState(false);
	const [error, setError] = useState(null);
	const [code, setCode] = useState(null);

	const { data: Teams } = RealtimeTeams();

	useEffect(() => {
		setMode(false);
		if (user.email === "admin.wan@gmail.com") {
			setUser({ ...user, password: "admin@wan", ministry: "ADMIN" });
		}
	}, [user.email]);

	const getTeam = () => {
		const team = Teams.filter((team) => team.teamCode === code);
		if (team.length > 0) {
			return team[0];
		}
		return null;
	};

	const handleSignup = async () => {
		setIsSigning(true);
		setError(null);

		// const team = getTeam();

		// if (!code && Teams.length <= 0) {
		// 	setIsSigning(false);
		// 	return setError("Please enter Team Code.");
		// }

		// if (team !== null) {
		try {
			const response = await CreateAccount({ ...user });

			if (response.auth) {
				setUserId(response.auth.currentUser.uid);
			} else {
				const err_msg =
					response.code === "auth/email-already-in-use"
						? "Email already in use"
						: response.code === "auth/wrong-password"
						? `The email or password that you've entered doesn't match any account.`
						: response.code === "auth/invalid-email"
						? "Invalid Email"
						: "No internet connection.";
				setError(err_msg);
				setIsSigning(false);
			}
		} catch (error) {
			console.log(error.message);
		}
		// } else {
		// 	setIsSigning(false);
		// 	setError("Sorry! Your Team does not exist.");
		// }
	};

	const blue = "#00addd";
	const pink = "#f51088";

	return (
		<>
			<IconButton
				onClick={() => setMode(!mode)}
				sx={{ position: "fixed", left: 20, bottom: 20, zIndex: 1002 }}>
				{theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
			<Card
				elevation={0}
				className="py-2 px-2 text-center m-2 w-auto max-w-[345px] box-border backdrop-blur-sm z-[1002] bg-transparent">
				<Box sx={{ width: "100%", mb: 4 }}>
					<img
						// src={theme.palette.mode === "dark" ? WAN_LOGO_WHITE : WAN_LOGO}
						src={WAN_LOGO_WHITE}
						alt="WAN | Belleview"
						style={{ width: "100%" }}
					/>
				</Box>
				<Typography variant="body1" className="mb-5 font-bold">
					SIGN UP
				</Typography>

				{error && (
					<Alert
						severity="error"
						sx={{ mb: 1, textAlign: "left", fontSize: 12 }}
						onClose={() => setError(null)}>
						{error}
					</Alert>
				)}

				<Grid container spacing={2}>
					<Grid item xs={12} md={12}>
						<TextField
							required
							variant="standard"
							label="Email Address"
							fullWidth
							type="email"
							disabled={isSigning}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
						/>
					</Grid>

					<Grid item xs={12} md={12}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel id="password">Password</InputLabel>
							<Input
								variant="standard"
								label="Password"
								labelId="password"
								fullWidth
								type={show ? "text" : "password"}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
								disabled={isSigning}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setShow(!show)}
											onMouseDown={() => setShow(!show)}
											edge="end">
											{show ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12} md={12}>
						<FormControl variant="standard" fullWidth>
							<InputLabel id="ministry">Ministry</InputLabel>
							<Select
								labelId="ministry"
								label="Ministry"
								size="small"
								sx={{ fontSize: 14 }}
								onChange={(e) =>
									setUser({ ...user, ministry: e.target.value })
								}>
								{Ministries.map((ministry) => {
									return (
										<MenuItem value={ministry.id}>{ministry.name}</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>

					{/* <Grid item xs={12} md={12}>
						<TextField
							required
							label="Team Code"
							variant="standard"
							size="small"
							fullWidth
							onChange={(e) => setCode(e.target.value)}
							error={!code && error}
						/>
					</Grid> */}

					<Grid item xs={12} md={12} sx={{ mt: 2 }}>
						<Grid container spacing={2}>
							<Grid item xs={4} md={4}>
								<Button
									variant="text"
									fullWidth
									disabled={isSigning}
									onClick={() => setScreen("login")}>
									Login
								</Button>
							</Grid>
							<Grid item xs={8} md={8}>
								<LoadingButton
									className="text-white"
									color="primary"
									loadingPosition="start"
									variant="outlined"
									fullWidth
									disableElevation
									loading={isSigning}
									disabled={!user.email || !user.password || isSigning}
									startIcon={<LoginOutlined />}
									onClick={handleSignup}>
									Sign up
								</LoadingButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default SignUp;
