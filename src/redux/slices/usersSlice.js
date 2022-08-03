import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUsers, setUser } = usersSlice.actions;

export const selectUsers = (state) => state.users;
export const selectCurrentUser = (state) => state.users.currentUser;

export default usersSlice.reducer;
