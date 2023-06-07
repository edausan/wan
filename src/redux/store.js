import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";
import assignmentsReducer from "./slices/assignmentsSlice";
import lineupsReducer from "./slices/lineupsSlice";
import songsReducer from "./slices/songsSlice";
import appReducer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    assignments: assignmentsReducer,
    lineups: lineupsReducer,
    songs: songsReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
