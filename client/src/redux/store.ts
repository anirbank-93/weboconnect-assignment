import {
  // combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

// Reducers
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;