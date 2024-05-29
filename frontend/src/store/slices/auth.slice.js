import { createSlice } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/auth.reducer";
const initialState = {
  user: null,
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authReducer, //object of all reducers
});

export const { login, logout, updateUserDetails } = authSlice.actions;
export default authSlice.reducer;
