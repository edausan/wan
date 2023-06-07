import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

export const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const { setAssignments } = assignmentSlice.actions;
export const selectAssignments = (state) => state.assignments.assignments;

export default assignmentSlice.reducer;
