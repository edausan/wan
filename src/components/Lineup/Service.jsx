import { ChurchTwoTone } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";

export const JIL_BELLEVIEW =
  "https://firebasestorage.googleapis.com/v0/b/wan-belleview.appspot.com/o/other%2FJIL%20Belleview%20SM.jpg?alt=media&token=3354d3cb-e9af-46e8-bbbc-ddaf7e0ec118";

export const KKB_BELLEVIEW =
  "https://firebasestorage.googleapis.com/v0/b/wan-belleview.appspot.com/o/other%2FKKB%20Belleview.jpg?alt=media&token=43ebe990-3181-40e5-b38e-bfe39202e972";

export const PRAYER_NIGHT =
  "https://firebasestorage.googleapis.com/v0/b/wan-belleview.appspot.com/o/other%2FPrayer%20Night.jpg?alt=media&token=3294f7b4-ee28-42b6-8f64-9edc452ed2ea";

export const PRAYER_MEETING =
  "https://firebasestorage.googleapis.com/v0/b/wan-belleview.appspot.com/o/other%2FPrayer%20Meeting.jpg?alt=media&token=2f341f4b-a5be-484f-bd97-46a25774d033";

const Service = ({ setOpen, open, service, setService }) => {
  // const [services, setService] = useState(null)
  useEffect(() => {
    setOpen(false);
  }, [service, setOpen]);

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Select Worship Service</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem
          autoFocus={service === "Anniversary | Belleview"}
          button
          onClick={() => setService("Anniversary | Belleview")}
        >
          <ListItemAvatar>
            <Avatar src={JIL_BELLEVIEW} />
          </ListItemAvatar>
          <ListItemText primary="Anniversary | Belleview" />
        </ListItem>

        <ListItem
          autoFocus={service === "Worship Service | Belleview"}
          button
          onClick={() => setService("Worship Service | Belleview")}
        >
          <ListItemAvatar>
            <Avatar src={JIL_BELLEVIEW} />
          </ListItemAvatar>
          <ListItemText primary="Belleview" />
        </ListItem>

        <ListItem
          autoFocus={service === "Worship Service | Lumina"}
          button
          onClick={() => setService("Worship Service | Lumina")}
        >
          <ListItemAvatar>
            <Avatar>
              <ChurchTwoTone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Lumina" />
        </ListItem>
        <ListItem
          autoFocus={service === "Youth Service"}
          button
          onClick={() => setService("Youth Service")}
        >
          <ListItemAvatar>
            <Avatar src={KKB_BELLEVIEW} />
          </ListItemAvatar>
          <ListItemText primary="Youth Service" />
        </ListItem>
        <ListItem
          autoFocus={service === "Prayer Night"}
          button
          onClick={() => setService("Prayer Night")}
        >
          <ListItemAvatar>
            <Avatar src={PRAYER_NIGHT} />
          </ListItemAvatar>
          <ListItemText primary="Prayer Night" />
        </ListItem>
        <ListItem
          autoFocus={service === "Prayer Meeting"}
          button
          onClick={() => setService("Prayer Meeting")}
        >
          <ListItemAvatar>
            <Avatar src={PRAYER_MEETING} />
          </ListItemAvatar>
          <ListItemText primary="Prayer Meeting" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default Service;
