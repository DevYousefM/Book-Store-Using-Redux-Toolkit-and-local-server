import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    getUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { logInOut, getUserName } = authSlice.actions;
export default authSlice.reducer;
