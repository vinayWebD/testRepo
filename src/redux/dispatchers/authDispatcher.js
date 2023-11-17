import { loginUser, logoutUser, sendForgotPasswordOtp, userProfile } from '../../services/auth';
import { updateSearch } from '../slices/appSearchSlice';
import { globalLoading, login, logout, profile } from '../slices/authSlice';

/**
 * The dispatcher method to call the login API and do the necessary React related functionalities
 */
const loginDispatcher =
  ({ email, password }) =>
  async (dispatch) => {
    const { status, data } = await loginUser({ email, password, dispatch });

    if (status === 200) {
      localStorage.setItem('token', data?.data?.token);
      dispatch(login(data));
      // We are calling profile dispatcher so that the profile gets updated - API + Redux
      dispatch(profileDispatcher());
    }

    return { status, data };
  };

/**
 * Logout dispatcher will call logout user API and
 */
const logoutDispatcher = () => async (dispatch) => {
  dispatch(globalLoading(true));

  if (localStorage.getItem('token')) {
    await logoutUser(dispatch);
  }
  dispatch(updateSearch({ searchValue: '' }));
  localStorage.removeItem('token');
  dispatch(logout());
};

/**
 * Profile Dispatcher will call the user profile API so that we can keep the user data up to date
 */
const profileDispatcher = () => async (dispatch) => {
  dispatch(globalLoading(true));
  const {
    status,
    data: { data },
  } = await userProfile(dispatch);
  if (status === 200) {
    dispatch(profile(data));
  }
};

/**
 * To send the Forgot Password Otp
 * @param {*} param0
 * @returns
 */
const forgotPasswordOtpDispatcher =
  ({ email }) =>
  async (dispatch) => {
    const { status, data } = await sendForgotPasswordOtp({ email, dispatch });

    return { status, data };
  };

export { loginDispatcher, logoutDispatcher, profileDispatcher, forgotPasswordOtpDispatcher };
