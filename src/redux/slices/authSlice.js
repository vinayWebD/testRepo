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
      const { email, name, username, token } = action.payload || {};
      state.isAuthenticated = true;
      state.user = {
        email,
        name,
        username,
      };
      state.token = token; // Store the token
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
