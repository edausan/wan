import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  userPosts: [],
  themes: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPost: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setThemes: (state, action) => {
      state.themes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPost, setPosts, setUserPosts, setThemes } = postsSlice.actions;
export const selectPost = (state) => state.posts;
export const selectUserPost = (state) => state.posts.userPosts;
export const selectThemes = (state) => state.posts.themes;

export default postsSlice.reducer;
