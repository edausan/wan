import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lineups: [],
  userLineups: [],
};

export const lineupsSlice = createSlice({
  name: "lineups",
  initialState,
  reducers: {
    setLineups: (state, action) => {
      state.lineups = action.payload;
    },
    setUserLineups: (state, action) => {
      state.userLineups = action.payload;
    },
  },
});

export const selectLineups = (state) => state.lineups.lineups;
export const selectUserLineups = (state) => state.lineups.userlineups;

export const { setLineups, setUserLineups } = lineupsSlice.actions;
export default lineupsSlice.reducer;
