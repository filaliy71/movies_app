import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import HomeSlice from "./HomeSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    home: HomeSlice,
  },
});
