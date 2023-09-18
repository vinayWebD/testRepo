import { loginUser, logoutUser, userProfile } from '../../services/auth';
import { isLoading, login, logout, profile } from '../slices/authSlice';

/**
 * The dispatcher method to call the login API and do the necessary React related functionalities
 */
const loginDispatcher =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(isLoading(true));
    const { status, data } = await loginUser({ email, password, dispatch });

    if (status === 201) {
      localStorage.setItem('token', data?.token);
      dispatch(login(data));
      // We are calling profile dispatcher so that the profile gets updated - API + Redux
      dispatch(profileDispatcher());
    }
  };

/**
 * Logout dispatcher will call logout user API and
 */
const logoutDispatcher = () => async (dispatch) => {
  dispatch(isLoading(true));

  if (localStorage.getItem('token')) {
    await logoutUser(dispatch);
  }
  localStorage.removeItem('token');
  dispatch(logout());
};

/**
 * Profile Dispatcher will call the user profile API so that we can keep the user data up to date
 */
const profileDispatcher = () => async (dispatch) => {
  dispatch(isLoading(true));
  const { status, data } = await userProfile(dispatch);

  if (status === 200) {
    dispatch(profile(data));
  }
};

export { loginDispatcher, logoutDispatcher, profileDispatcher };
