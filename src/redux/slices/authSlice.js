import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: null,
    user: null,
    isLoading: false,
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
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.token = null; // Clear the token
      state.isLoading = false;
    },
    profile: (state, action) => {
      state.isAuthenticated = true;
      state.user = action?.payload;
      state.token = state.token || localStorage.getItem('token');
      state.isLoading = false;
    },
    isLoading: (state, action) => {
      state.isLoading = action?.payload?.isLoading;
    },
  },
});

export const { login, logout, profile, isLoading } = authSlice.actions;
export default authSlice.reducer;
