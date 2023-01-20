import {
	Avatar,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppCtx } from "../../../App";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Visibility } from "@mui/icons-material";

const Friends = ({ setOpenFriends, friends, id }) => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up("sm"));

	const count = matches ? 10 : 5;

	return (
		<Card
			sx={{
				mb: 2,
				position: "relative",
			}}
			elevation={0}
			className="shadow-md">
			<CardContent>
				<Typography
					variant="body2"
					sx={{ mb: 2, alignItems: "center", display: "flex" }}
					onClick={() => setOpenFriends(true)}>
					Friends •{" "}
					{
						friends
							.filter((f) => f.id !== id || f.uid !== id)
							.filter((f) => f.id || f.uid).length
					}
					<Button
						disabled={friends.length <= 0}
						size="small"
						variant="text"
						sx={{
							fontSize: 12,
							ml: 1,
							pb: 0,
							pt: "2px",
							textTransform: "capitalize",
						}}
						onClick={
							friends.length <= 0 ? () => {} : () => setOpenFriends(true)
						}>
						Show more
					</Button>
				</Typography>

				<section className="flex flex-row gap-2 items-center justify-center">
					{friends
						.filter((f) => f.uid !== id)
						.filter((f) => f.uid)
						.slice(0, count)
						.map((f) => {
							return (
								<Link
									to={`/profile/${f.uid}`}
									style={{
										textDecoration: "none",
										color: "inherit",
										width: "100%",
									}}>
									<Avatar
										alt={f.displayName}
										src={f.photoURL}
										className="w-[50px] h-[50px]"
									/>
								</Link>
							);
						})}

					{!matches && (
						<IconButton
							className="p-0 m-0"
							onClick={
								friends.length <= 0 ? () => {} : () => setOpenFriends(true)
							}>
							<Avatar className="w-[50px] h-[50px]">
								<Visibility />
							</Avatar>
						</IconButton>
					)}
				</section>
				{/* <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="stretch"
        >
          {friends
            .filter((f) => f.uid !== id)
            .filter((f) => f.uid)
            .slice(0, count)
            .map((f) => {
              return (
                <Grid
                  key={f.uid}
                  item
                  alignItems="stretch"
                  display="flex"
                  justifyContent="center"
                  sx={{ width: 60 }}
                >
                  {f.uid ? (
                    <Link
                      to={`/profile/${f.uid}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        width: "100%",
                      }}
                    >
                      <Avatar
                        alt={f.displayName}
                        src={f.photoURL}
                        className="w-[50px] h-[50px]"
                      />
                    </Link>
                  ) : (
                    <Card
                      sx={{
                        p: 1,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "auto",
                      }}
                    >
                      <CardMedia component="div" alt={f.displayName || f.email}>
                        <Avatar aria-label="recipe" src={f.photoURL}></Avatar>
                      </CardMedia>
                      <CardContent>
                        <Typography variant="caption" sx={{ mt: 1 }}>
                          <div
                            style={{
                              textOverflow: "ellipsis",
                              width: 37,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {f.displayName
                              ? f.displayName.split(" ")[0]
                              : f.email.split("@gmail.com")[0]}
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              );
            })}

          {!matches && <Avatar className="w-[50px] h-[50px]" />}
        </Grid> */}
			</CardContent>
		</Card>
	);
};

export default Friends;
