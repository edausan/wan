import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  albumCovers: [],
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setAlbumCovers: (state, action) => {
      state.albumCovers = action.payload;
    },
  },
});

export const { setSongs, setAlbumCovers } = songsSlice.actions;
export const selectSongs = (state) => state.songs;

export default songsSlice.reducer;
