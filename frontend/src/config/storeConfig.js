import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/auth.slice.js";
const root = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: root,
});

export default store;
