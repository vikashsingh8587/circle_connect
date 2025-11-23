import { createSlice } from "@reduxjs/toolkit";
import { Profiler } from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    token: null,
    username: null,
    role: null,
    ProfileImage: null,
    createAt: null,
    


  },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.role = action.payload.role
      state.ProfileImage = action.payload.ProfileImage


    },

    logout(state) {
      state.email = null;
      state.token = null;
      state.username = null;
      state.role = null;
      state.ProfileImage = null;
      
    }
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
