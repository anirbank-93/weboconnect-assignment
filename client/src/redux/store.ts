import {
  // combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

// Reducers
import { authSlice } from "./slices/authSlice";
import { postSlice } from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authSlice.reducer,
    posts: postSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;