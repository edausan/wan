import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tab,
	Tabs,
	Typography,
	useTheme,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LineupItem from "../../Lineup/LineupItem";
import { AccountCircle } from "@mui/icons-material";

const TabPanel = (props) => {
	const params = useParams();
	const { children, value, index, filter, friends, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box
					sx={{
						p: 1,
						justifyContent: "center",
						display: "flex",
						flexDirection: "column",
					}}>
					<List>
						{friends
							.filter((f) => f.uid !== params.id)
							.filter((f) => f.uid)
							.filter((f) => (filter ? f.ministry === filter : f))
							.map((friend) => {
								return (
									<Link
										key={friend?.uid}
										to={`/profile/${friend?.uid}`}
										style={{ textDecoration: "none", color: "inherit" }}>
										<ListItem>
											<ListItemAvatar>
												<Avatar src={friend?.photoURL}>
													<AccountCircle />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													friend?.displayName
														? friend?.displayName
														: friend?.email
												}
												// secondary={
												//   friends?.filter((f) => f.uid === h)[0]?.ministry
												// }
											/>
										</ListItem>
									</Link>
								);
							})}
					</List>
				</Box>
			)}
		</div>
	);
};

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
};

const Label = ({ friends, id, filter }) => {
	return (
		<span
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: 8,
			}}>
			{filter}{" "}
			<span
				style={{
					fontSize: 10,
					background: "#333",
					color: "#fff",
					borderRadius: "100%",
					width: 20,
					height: 20,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				{
					friends
						.filter((f) => f.uid !== id)
						.filter((f) => f.ministry === filter).length
				}
			</span>
		</span>
	);
};

const FriendsTab = ({ friends }) => {
	const params = useParams();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{ width: "100%", minHeight: 458, maxHeight: 458, overflow: "auto" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					sx={{
						alignItems: "center",
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						zIndex: 1002,
						background: theme.palette.background.paper,
						backdropFilter: "blur(5px)",
						borderBottom: `1px solid ${theme.palette.background.default}`,
					}}>
					{/* <TabWrapper friends={friends} id={params.id} idx={1} />
          <TabWrapper friends={friends} id={params.id} idx={2} label='VIA' /> */}

					<Tab
						sx={{ fontSize: ".75rem", padding: "12px 4px", minWidth: 84 }}
						label={
							<span>
								All{" "}
								<span
									style={{
										fontSize: 10,
										background: "#333",
										padding: 4,
										color: "#fff",
										borderRadius: "100%",
										width: 20,
										height: 20,
									}}>
									{friends.filter((f) => f.uid !== params.id).length}
								</span>
							</span>
						}
						{...a11yProps(1)}
					/>

					<Tab
						sx={{ fontSize: ".75rem", padding: "12px 4px", minWidth: 80 }}
						label={<Label friends={friends} id={params.id} filter="VIA" />}
						{...a11yProps(2)}
					/>

					<Tab
						sx={{ fontSize: ".75rem", padding: "12px 4px", minWidth: 80 }}
						label={<Label friends={friends} id={params.id} filter="JAM" />}
						{...a11yProps(3)}
					/>

					<Tab
						sx={{ fontSize: ".75rem", padding: "12px 4px", minWidth: 80 }}
						label={<Label friends={friends} id={params.id} filter="TEAM" />}
						{...a11yProps(4)}
					/>
				</Tabs>
			</Box>
			<Box
				sx={{
					// maxHeight: 400,
					overflow: "auto",
					position: "relative",
					zIndex: 1001,
					pt: "40px",
				}}>
				<TabPanel value={value} index={0} filter={null} friends={friends}>
					All
				</TabPanel>

				<TabPanel value={value} index={1} filter="VIA" friends={friends}>
					VIA
				</TabPanel>
				<TabPanel value={value} index={2} filter="JAM" friends={friends}>
					JAM
				</TabPanel>
				<TabPanel value={value} index={3} filter="TEAM" friends={friends}>
					TEAM
				</TabPanel>
			</Box>
		</Box>
	);
};

export default FriendsTab;
