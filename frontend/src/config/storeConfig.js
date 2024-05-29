import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/auth.slice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk";

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false,
// });
const persistConfig = {
  key: "root",
  storage,
};

const root = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer({ ...persistConfig }, root);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [],
});

export const persistor = persistStore(store);

export default store;
