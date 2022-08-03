import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  userPosts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPost: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    setPosts: (state, action) => {
      console.log({ action, state });
      state.posts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPost, setPosts, setUserPosts } = postsSlice.actions;
export const selectPost = (state) => state.posts;
export const selectUserPost = (state) => state.posts.userPosts;

export default postsSlice.reducer;
