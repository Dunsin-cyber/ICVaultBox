import { configureStore } from "@reduxjs/toolkit";
import Password from "./slice/passwordSlice";

export const store = configureStore({
  reducer: {
    password: Password,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
