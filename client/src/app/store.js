// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import noteReducer from "../features/noteSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer
  }
});