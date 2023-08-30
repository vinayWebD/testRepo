import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../services/authentication';

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

const { login, logout } = authSlice.actions;

const loginDispatcher =
  ({ username, password }) =>
  async (dispatch) => {
    const response = await loginUser({ username, password });
    if (!response?.error) {
      dispatch(login(response));
    } else {
      dispatch(logout());
    }
  };

const logoutDispatcher = () => async (dispatch) => {
  const response = await logoutUser();
  if (!response?.error) {
    localStorage.removeItem('token');
    dispatch(logout());
  }
};

export { loginDispatcher, logoutDispatcher };
export default authSlice.reducer;
