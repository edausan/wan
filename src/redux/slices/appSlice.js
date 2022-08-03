import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = appSlice.actions;
export const selectApp = (state) => state.app;

export default appSlice.reducer;
