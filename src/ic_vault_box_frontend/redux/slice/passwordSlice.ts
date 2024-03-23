import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PasswordT } from "../types";

// Define the initial state using that type
const initialState: PasswordT[] = [];

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    addPassword: (state, { payload }: PayloadAction<PasswordT>) => {
      state.push(payload);
    },

    clearPassword: () => {
      return initialState;
    },
  },
});

export const { addPassword, clearPassword } = passwordSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default passwordSlice.reducer;
