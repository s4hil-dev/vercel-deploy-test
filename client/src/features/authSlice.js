// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    initialized: false,
    error: null
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.initialized = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.initialized = true;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.user = null;
      state.loading = false;
      state.initialized = true;
      state.error = action.payload;
    }
  }
});

export const { authStart, setUser, clearUser, authFailure } = authSlice.actions;
export default authSlice.reducer;


// 🔑 LOGIN (manual async function)
export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch(authStart());
    const res = await api.post("/auth/login", data);
    dispatch(setUser(res.data.user));
    return res.data.user;
  } catch (error) {
    const message = error.response?.data?.msg || "Login failed";
    dispatch(authFailure(message));
    throw error;
  }
};

// RESTORE USER AFTER REFRESH
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    dispatch(authStart());
    const res = await api.get("/auth/me");
    dispatch(setUser(res.data.user));
  } catch {
    dispatch(clearUser());
  }
};

// 🚪 LOGOUT
export const logoutUser = () => async (dispatch) => {
  await api.post("/auth/logout");
  dispatch(clearUser());
};
