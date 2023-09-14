import { loginUser, logoutUser } from '../../services/auth';
import { login, logout } from '../slices/authSlice';

const loginDispatcher =
  ({ email, password }) =>
  async (dispatch) => {
    const data = await loginUser({ email, password });

    if (!data?.error) {
      dispatch(login(data));
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
