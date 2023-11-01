import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: null,
    user: {},
    globalLoading: false,
    globalTransparentLoadingPrivate: false,
  },
  reducers: {
    login: (state, action) => {
      const { email, name, username, token } = action.payload || {};
      state.isAuthenticated = true;
      state.user = {
        email,
        name,
        username,
      };
      state.token = token; // Store the token
      state.globalLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.token = null; // Clear the token
      state.globalLoading = false;
    },
    profile: (state, action) => {
      state.isAuthenticated = true;
      state.user = action?.payload;
      state.token = state.token || localStorage.getItem('token');
      state.globalLoading = false;
    },
    globalLoading: (state, action) => {
      state.globalLoading = action?.payload;
    },
    globalTransparentLoadingPrivate: (state, action) => {
      // This is a state for showing a transparent full screen loader for private routes
      state.globalTransparentLoadingPrivate = action?.payload;
    },
  },
});

export const { login, logout, profile, globalLoading, globalTransparentLoadingPrivate } =
  authSlice.actions;
export default authSlice.reducer;
