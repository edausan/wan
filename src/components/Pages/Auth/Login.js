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
	Grid,
	IconButton,
	Input,
	InputAdornment,
	TextField,
	useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppCtx } from "../../../App";
import { SignIn } from "../../../Firebase/authApi";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import WAN_LOGO_NEW from "../../../assets/WAN_LOGO_NEW.png";

export const blue = "#00addd";
export const pink = "#f51088";

const Login = ({ setScreen }) => {
	const theme = useTheme();
	const { setMode, mode, setCurrentUser } = useContext(AppCtx);
	const [show, setShow] = useState(false);
	const [user, setUser] = useState({ email: "", password: "" });
	const [userId, setUserId] = useState(null);
	const [isSigning, setIsSigning] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setMode(false);
	}, []);

	const handleSignIn = async () => {
		setIsSigning(true);
		setError(null);
		setMode(true);
		const response = await SignIn({
			email: user.email,
			password: user.password,
		});

		if (response.user?.auth) {
			//   response.auth.currentUser.uid && setIsSigning(true);
			setCurrentUser(response);
			setUserId(response.user.uid);
		} else {
			const err_msg =
				response.code === "auth/email-already-in-use"
					? "Email already in use"
					: response.code === "auth/wrong-password"
					? `The email or password that you've entered doesn't match any account.`
					: response.code === "auth/user-not-found"
					? `The email or password that you've entered doesn't match any account.`
					: "No internet connection.";
			setError(err_msg);
			setIsSigning(false);
		}
		// setCurrentUser(response.auth.currentUser);
	};

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
						src={WAN_LOGO_NEW}
						alt="WAN | Belleview"
						style={{ width: "100%" }}
					/>
				</Box>
				{/* <Typography variant='body1' sx={{ mb: 2 }}>
          LOGIN
        </Typography> */}
				{error && (
					<Alert
						severity="error"
						sx={{ mb: 1, textAlign: "left", fontSize: 12 }}
						onClose={() => setError(null)}>
						{error}
					</Alert>
				)}
				<Grid container spacing={2} className="mt-[-20%]">
					<Grid item xs={12} md={12}>
						<TextField
							variant="standard"
							label="Email Address"
							fullWidth
							type="email"
							disabled={isSigning}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							//   sx={{
							//     '&:autofill': { background: 'rgba(0,0,0,0)' },
							//     '& > *:autofill': { background: 'rgba(0,0,0,0)' },
							//   }}
							className="autofill:bg-red-700"
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<Input
							variant="standard"
							label="Password"
							fullWidth
							disabled={isSigning}
							type={show ? "text" : "password"}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
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
					</Grid>
					<Grid item xs={12} md={12} sx={{ mt: 2 }}>
						<Grid container spacing={2}>
							<Grid item xs={8} md={8}>
								<LoadingButton
									className="text-white"
									color="primary"
									onClick={handleSignIn}
									loading={isSigning}
									loadingPosition="start"
									startIcon={<LoginOutlined />}
									variant="outlined"
									fullWidth
									disableElevation
									disabled={!user.email || !user.password}>
									LOGIN
								</LoadingButton>
							</Grid>
							<Grid item xs={4} md={4}>
								<Button
									variant="text"
									fullWidth
									disabled={isSigning}
									onClick={() => setScreen("signup")}>
									Sign Up
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default Login;
