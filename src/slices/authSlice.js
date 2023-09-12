import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token; // Store the token
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null; // Clear the token
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
