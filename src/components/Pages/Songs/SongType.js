import { MusicNoteTwoTone } from "@mui/icons-material";
import {
	Avatar,
	Dialog,
	DialogTitle,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";

const SongType = ({ open, setOpen, setSongType }) => {
	return (
		<Dialog onClose={() => setOpen(false)} open={open}>
			<DialogTitle className="text-sm">Select Song Type</DialogTitle>
			<List>
				<ListItemButton onClick={() => setSongType("Praise")}>
					<ListItemIcon>
						<Avatar>
							<MusicNoteTwoTone />
						</Avatar>
					</ListItemIcon>
					<ListItemText primary="Praise" />
				</ListItemButton>

				<ListItemButton onClick={() => setSongType("Worship")}>
					<ListItemIcon>
						<Avatar>
							<MusicNoteTwoTone />
						</Avatar>
					</ListItemIcon>
					<ListItemText primary="Worship" />
				</ListItemButton>
			</List>
		</Dialog>
	);
};

export default SongType;
