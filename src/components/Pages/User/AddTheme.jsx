/* eslint-disable react-hooks/exhaustive-deps */
import { AddAPhotoTwoTone, Clear } from "@mui/icons-material";
import { IconButton, SwipeableDrawer, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { CreateTheme, UploadThemeMedia } from "@/Firebase/postsApi";
import useResize from "@hooks/useResize";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";

const AddTheme = ({ open, setOpen }) => {
  const inputRef = useRef(null);
  const [img, setImg] = useState(null);
  const { resized, processfile } = useResize({ quality: 0.9 });
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    photoURL: null,
    title: null,
    verse: null,
    body: null,
    link: null,
    tags: [],
  });

  useEffect(() => {
    resized && setPhoto(resized);
  }, [resized]);

  useEffect(() => {
    img && processfile(img);
  }, [img]);

  const handleClear = () => {
    setImg(null);
    setPhoto(null);
  };

  const handleUploadMedia = async () => {
    try {
      const photoURL = await UploadThemeMedia({
        image: {
          name: theme?.title?.split(" ").join("-").toLowerCase(),
          url: photo,
        },
      });
      if (photoURL) {
        setPhotoURL(photoURL);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    photoURL && handleSave();
  }, [photoURL]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = {
        ...theme,
        photoURL: photo,
        tags: [moment().format("YYYY"), moment().format("MMMM"), "Theme"],
        date_created: moment().format("LLLL"),
      };
      const res = await CreateTheme({ theme: data });
      if (res === undefined) {
        setSaving(false);
        setOpen(false);
        setImg(null);
        setPhoto(null);
        setPhotoURL(null);
        setTheme({
          title: null,
          body: null,
          verse: null,
          link: null,
          photoURL: null,
          tags: [],
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <LoadingScreen status={saving} text="Saving" />
      <SwipeableDrawer open={open} onClose={() => setOpen(false)} anchor="bottom">
        <section className="max-w-[680px] mx-auto">
          <div className="desktop:min-h-[349px] laptop:min-h-[349px] phone:min-h-[211px] relative bg-black/30">
            <input
              type="file"
              name=""
              id=""
              hidden
              ref={inputRef}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <img src={photo} alt="" className="w-full" />
            <IconButton
              onClick={() => inputRef.current.click()}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10"
            >
              <AddAPhotoTwoTone />
            </IconButton>
            {photo && (
              <IconButton className="absolute top-[15px] right-[15px] z-10" onClick={handleClear}>
                <Clear />
              </IconButton>
            )}
          </div>
          <div className="p-4">
            <div className="">
              <TextField
                label="Title"
                variant="standard"
                size="small"
                fullWidth
                className="mb-4"
                disabled={saving}
                onChange={(e) => setTheme({ ...theme, title: e.target.value })}
              />
              <TextField
                label="Verse"
                variant="standard"
                size="small"
                multiline
                fullWidth
                className="mb-4"
                disabled={saving}
                onChange={(e) => setTheme({ ...theme, verse: e.target.value })}
              />
              <TextField
                label="Body"
                variant="standard"
                size="small"
                multiline
                fullWidth
                className="mb-4"
                disabled={saving}
                onChange={(e) => setTheme({ ...theme, body: e.target.value })}
              />
              <TextField
                label="Link"
                variant="standard"
                size="small"
                multiline
                fullWidth
                className="mb-4"
                disabled={saving}
                onChange={(e) => setTheme({ ...theme, link: e.target.value })}
              />

              <button
                onClick={handleUploadMedia}
                className="w-full px-4 py-2 bg-sky-500 rounded-md mb-4 disabled:bg-gray-500 disabled:opacity-50"
              >
                Save Theme
              </button>
            </div>
          </div>
        </section>
      </SwipeableDrawer>
    </>
  );
};

export default AddTheme;
