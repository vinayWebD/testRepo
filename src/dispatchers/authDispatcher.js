import { loginUser, logoutUser } from '../services/auth';
import { login, logout } from '../slices/authSlice';

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