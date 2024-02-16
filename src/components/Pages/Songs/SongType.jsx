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
    <Dialog open={open}>
      <DialogTitle className="text-sm w-[240px] text-center">Select Song Type</DialogTitle>
      <List>
        <ListItemButton onClick={() => setSongType(["Praise", "Joyful"])}>
          <ListItemIcon>
            <Avatar className="w-8 h-8">
              <MusicNoteTwoTone />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Praise" />
        </ListItemButton>

        <ListItemButton onClick={() => setSongType(["Worship", "Solemn"])}>
          <ListItemIcon>
            <Avatar className="w-8 h-8">
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
