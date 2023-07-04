import { AccountCircle, Favorite } from "@mui/icons-material";
import {
  Modal,
  Card,
  CardContent,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  AvatarGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PhotoHeart = ({ open, setOpen, user, friends, handleToOther }) => {
  const [openHearts, setOpenHearts] = useState(false);

  useEffect(() => {
    !open && setOpenHearts(false);
  }, [open]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <>
        <Modal open={openHearts} onClose={() => setOpenHearts(false)}>
          <Card
            sx={{
              width: "90%",
              minWidth: 300,
              maxWidth: 400,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxSizing: "border-box",
              maxHeight: 700,
            }}
          >
            <CardContent sx={{ pb: "16px !important" }}>
              <List sx={{ p: 0 }}>
                {user?.photoHeart?.map((h, idx) => {
                  return (
                    <Link
                      key={`${h}~${idx}`}
                      to={`/profile/${friends?.filter((f) => f.uid === h)[0]?.uid}`}
                      onClick={handleToOther}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem onClick={() => setOpen(false)}>
                        <ListItemAvatar>
                          <Avatar src={friends?.filter((f) => f.uid === h)[0]?.photoURL}>
                            <AccountCircle />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            friends?.filter((f) => f.uid === h)[0]?.displayName ||
                            friends?.filter((f) => f.uid === h)[0]?.email
                          }
                          secondary={friends?.filter((f) => f.uid === h)[0]?.ministry}
                        />
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Modal>

        <Card
          sx={{
            width: "90%",
            minWidth: 300,
            maxWidth: 400,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxSizing: "border-box",
            maxHeight: 700,
          }}
        >
          <CardContent sx={{ p: 0, overflow: "auto", maxHeight: 500 }}>
            <img src={user?.photoURL} style={{ width: "100%" }} alt="" />
          </CardContent>

          <CardContent
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <Favorite color="error" />
            </IconButton>

            {/* <Typography variant='caption' sx={{ color: '#f44336' }}>
            {user?.photoHeart?.length}
          </Typography> */}

            <AvatarGroup
              onClick={() => setOpenHearts(true)}
              max={4}
              sx={{ "& > .MuiAvatar-root": { width: 24, height: 24 } }}
            >
              {user?.photoHeart?.map((h, idx) => {
                const user = friends?.filter((f) => f.uid === h)[0];
                return (
                  <Avatar
                    key={`${user?.uid}~${idx}`}
                    alt={user?.displayName}
                    src={user?.photoURL}
                  />
                );
              })}
            </AvatarGroup>
          </CardContent>
          {/* <Divider /> */}
        </Card>
      </>
    </Modal>
  );
};

export default PhotoHeart;
