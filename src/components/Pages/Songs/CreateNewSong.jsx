/* eslint-disable react-hooks/exhaustive-deps */
import { AddAPhotoOutlined, ClearOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Alert,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Snackbar,
  SwipeableDrawer,
  Chip,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AddNewSong, UploadAlbumCover } from "@/Firebase/songsApi";
import useResize from "@hooks/useResize";
import AlbumCover from "./AlbumCover";
import EditSongTabs from "./EditSongTabs";
import ALBUM_PLACEHOLDER from "@assets/music_placeholder.jpg";
import SongType from "./SongType";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";
import { SongsCtx } from "./SongsMain";

const CreateNewSong = ({ open, setOpen }) => {
  const [newTag, setNewTag] = useState(null);
  const [image, setImage] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [tagExist, setTagExist] = useState(false);
  const [openCovers, setOpenCovers] = useState(false);
  const [selectedCover, setSelectedCover] = useState(null);
  const [openSongType, setOpenSongType] = useState(true);
  const [showLyrics, setShowLyrics] = useState(false);

  const { refetch } = useContext(SongsCtx);

  const { processfile, resized } = useResize(0.8);

  const [editDetails, setEditDetails] = useState({
    title: true,
    artist: true,
    album: true,
    lyrics: true,
    chords: true,
    media: true,
    tag: false,
  });

  const [songDetails, setSongDetails] = useState({
    cover: null,
    title: null,
    album: null,
    artist: null,
    key: null,
    lyrics: {
      verse: null,
      pre_chorus: null,
      chorus: null,
      bridge: null,
    },
    chords: {
      verse: null,
      pre_: null,
      chorus: null,
      bridge: null,
    },
    media: {
      youtube: null,
      spotify: null,
    },
    tags: ["Joyful", "Solemn"],
  });

  useEffect(() => {
    image && processfile(image);
  }, [image]);

  useEffect(() => {
    resized && handleUploadCover();
  }, [resized]);

  useEffect(() => {
    photoURL && setSongDetails({ ...songDetails, cover: photoURL });
  }, [photoURL]);

  const handleUploadCover = async () => {
    try {
      const { photoURL } = await UploadAlbumCover({
        id: image.name,
        image: resized,
      });
      setPhotoURL(photoURL);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    setSongDetails({ ...songDetails, cover: selectedCover?.photoURL });
  }, [selectedCover]);

  useEffect(() => {
    const idx = songDetails?.tags?.findIndex((tag) => tag?.toLowerCase() === newTag?.toLowerCase());
    if (idx >= 0) {
      setTagExist(true);
    } else {
      setTagExist(false);
    }
  }, [newTag]);

  const handleSave = async () => {
    setUpdating(true);
    try {
      const { title, artist, album } = songDetails;
      const song = {
        ...songDetails,
        title: title?.trim(),
        artist: artist ? artist?.trim() : null,
        album: album ? album?.trim() : null,
      };
      await AddNewSong({ song });
      setUpdating(false);
      setUpdated(true);

      setTimeout(() => {
        setOpen(false);
        setUpdated(false);
        refetch();
      }, 1000);
    } catch (error) {
      setUpdating(false);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (!open) {
      setOpenSongType(true);
      setSongDetails({
        album: null,
        chords: null,
        cover: null,
        lyrics: null,
        tags: [],
        title: null,
        media: {
          youtube: null,
          spotify: null,
        },
      });
      setImage(null);
      setSelectedCover(null);
      setNewTag(null);
      setPhotoURL(null);
    }
  }, [open]);

  useEffect(() => {
    if (updating) {
      setEditDetails({
        title: true,
        artist: true,
        album: true,
        lyrics: true,
        chords: true,
        media: true,
        tag: false,
      });
    }
  }, [updating, open]);

  const handleDeleteTag = (tag) => {
    const filtered = songDetails.tags.filter((t) => t !== tag);
    setSongDetails({ ...songDetails, tags: filtered });
  };

  const handleAddTag = () => {
    if (!tagExist && newTag) {
      setEditDetails({
        ...editDetails,
        tag: false,
      });

      const tagArr = newTag.split(" ");

      for (var i = 0; i < tagArr.length; i++) {
        tagArr[i] = tagArr[i].charAt(0).toUpperCase() + tagArr[i].slice(1);
      }

      const tag = tagArr.join(" ");

      setSongDetails({
        ...songDetails,
        tags: [...songDetails.tags, tag],
      });
    }
  };

  const handleSongType = (type) => {
    setSongDetails({ ...songDetails, tags: [...type] });
    setOpenSongType(false);
  };

  return (
    <>
      <SongType
        open={openSongType && open}
        setOpen={setOpenSongType}
        setSongType={handleSongType}
      />
      {/* <AlbumCovers
        open={openCovers}
        setOpen={setOpenCovers}
        setSelectedCover={setSelectedCover}
        selectedCover={selectedCover}
        setImage={setImage}
        resized={resized}
      /> */}
      <LoadingScreen status={updating} text="Saving, " />
      <SwipeableDrawer
        anchor="bottom"
        open={open || false}
        onClose={() => setOpen(false)}
        onOpen={() => {}}
        className="[&>.MuiDrawer-paper]:items-center"
      >
        <div className="max-w-[680px] m-x-auto w-full max-h-[100vh] overflow-y-auto">
          <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={updated}
            autoHideDuration={null}
            onClose={() => setUpdated(false)}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {songDetails?.title} is successfully saved!
            </Alert>
          </Snackbar>

          <div className="flex flex-row gap-2 items-end">
            {/* <div className="w-[70px] relative">
              <label
                htmlFor="upload-cover"
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10"
              >
                <IconButton
                  component="span"
                  className="bg-black/50 z-10"
                  onClick={() => setOpenCovers(true)}
                >
                  <AddAPhotoOutlined />
                </IconButton>
              </label>

              <img src={songDetails?.cover || ALBUM_PLACEHOLDER} alt="" className="w-full" />
            </div> */}
            <div className="p-4 pb-0 box-border flex-1">
              <FormControl size="small" variant="standard" fullWidth>
                <InputLabel>Song Title</InputLabel>
                <Input
                  autoFocus
                  onChange={(e) => setSongDetails({ ...songDetails, title: e.target.value })}
                  // className={`INPUT [&>textarea]:text-xs [&::before]:!border-b-0 [&::after]:border-0 ${
                  // 	editDetails.title ? "[&::before]:border-0" : ""
                  // }`}
                />
              </FormControl>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4 space-y-0">
            <div className="col-span-1">
              <FormControl size="small" variant="standard" fullWidth>
                <InputLabel>Artist</InputLabel>
                <Input
                  onChange={(e) => setSongDetails({ ...songDetails, artist: e.target.value })}
                />
              </FormControl>
            </div>
            <div className="col-span-1">
              <FormControl size="small" variant="standard" fullWidth>
                <InputLabel>Album</InputLabel>
                <Input
                  onChange={(e) => setSongDetails({ ...songDetails, album: e.target.value })}
                />
              </FormControl>
            </div>
          </div>
          <div className="px-4 mb-1 text-xs">Tags</div>

          <div className="px-4 py-2 flex flex-row gap-2 flex-wrap">
            {songDetails?.tags?.map((tag) => {
              return (
                <Chip key={tag} label={tag} size="medium" onDelete={() => handleDeleteTag(tag)} />
              );
            })}
            {!editDetails.tag && (
              <Chip
                variant="outlined"
                label="+ Add Tag"
                size="medium"
                onClick={() =>
                  setEditDetails({
                    ...editDetails,
                    tag: true,
                  })
                }
              />
            )}
          </div>

          <div className="px-4 py-2 flex flex-row">
            {editDetails.tag && (
              <>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  label="New Tag"
                  // className="TAG [&>label]:text-sm [&>div>input]:text-sm"
                  onChange={(e) => setNewTag(e.target.value)}
                  error={tagExist}
                  helperText={tagExist ? "Tag already exists." : ""}
                />
                <IconButton onClick={handleAddTag} disabled={!newTag || tagExist}>
                  <SaveOutlined className="w-[18px] h-[18px]" />
                </IconButton>
                <IconButton
                  onClick={() =>
                    setEditDetails({
                      ...editDetails,
                      tag: false,
                    })
                  }
                >
                  <ClearOutlined className="w-[18px] h-[18px]" />
                </IconButton>
              </>
            )}
          </div>

          <div className="px-4 py-2 flex flex-row justify-end">
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className="px-4 py-1 bg-blue-500 text-white text-xs rounded-full"
            >
              {showLyrics
                ? "Hide"
                : songDetails?.lyrics?.verse ||
                  songDetails?.lyrics?.pre_chorus ||
                  songDetails?.lyrics?.chorus ||
                  songDetails?.lyrics?.bridge
                ? "Show"
                : "Add"}{" "}
              Lyrics / Chords
            </button>
          </div>

          {showLyrics && (
            <EditSongTabs
              song={songDetails}
              setSongDetails={setSongDetails}
              save={handleSave}
              updating={updating}
            />
          )}

          <div className="flex flex-row items-center justify-center p-2">
            <button
              className="flex-1 bg-green-500 text-white disabled:bg-black/10 disabled:text-white/25 py-1 rounded-sm"
              disabled={!songDetails?.title}
              onClick={handleSave}
            >
              Save Song
            </button>
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default React.memo(CreateNewSong);
