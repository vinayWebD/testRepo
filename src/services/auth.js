import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';
const {
  LOGIN,
  LOGOUT,
  PROFILE,
  FORGOT_PASSWORD_OTP,
  FORGOT_PASSWORD_VERIFY_OTP,
  FORGOT_PASSWORD_RESET_PWD,
  DELETE_ACCOUNT,
} = NETWORK_CONSTANTS;

/**
 * Function for API calling of login
 * @param {*} param0
 * @returns
 */
const loginUser = async ({ email = '', password = '', fcmToken = '', dispatch }) => {
  try {
    const { status, data } = await apiUtility(
      LOGIN,
      'POST',
      { email: email.trim()?.toLowerCase(), password: password.trim(), fcmToken: fcmToken },
      dispatch,
    );

    return { status, data };
  } catch (error) {
    return error;
  }
};

/**
 * Function for API calling of logout
 * @returns
 */
const logoutUser = async (dispatch) => {
  try {
    if (localStorage.getItem('token')) {
      const { status } = await apiUtility(LOGOUT, 'DELETE', undefined, dispatch);
      return { status };
    }

    return 204;
  } catch (error) {
    return error;
  }
};

/**
 * Function for API calling of user's profile
 * @param {*} dispatch
 * @returns
 */
const userProfile = async (dispatch) => {
  try {
    const { data, status } = await apiUtility(PROFILE, 'GET', undefined, dispatch);

    return { data, status };
  } catch (error) {
    return error;
  }
};

/**
 * The API for sending OTP for forgot password
 * @param {*} dispatch
 * @returns
 */
const sendForgotPasswordOtp = async ({ email = '', dispatch }) => {
  try {
    const { data, status } = await apiUtility(
      FORGOT_PASSWORD_OTP,
      'POST',
      {
        email: email.trim().toLowerCase(),
      },
      dispatch,
    );
    return { data, status };
  } catch (error) {
    return error;
  }
};

/**
 * API for validating OTP from forgot password
 * @param {*} param0
 * @returns
 */
const forgotPasswordOtpValidation = async ({ email = '', code }) => {
  try {
    const response = await apiUtility(FORGOT_PASSWORD_VERIFY_OTP, 'POST', {
      email: email.trim().toLowerCase(),
      code,
    });
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * API for resetting the password from forgot password
 * @param {*} param0
 * @returns
 */
const resetPassword = async ({ email = '', code, password = '', confirmPassword = '' }) => {
  try {
    const response = await apiUtility(FORGOT_PASSWORD_RESET_PWD, 'POST', {
      email: email.trim().toLowerCase(),
      code,
      password: password.trim(),
      confirmPassword: confirmPassword?.trim(),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteAccount = async ({ password = '' }) => {
  try {
    const response = await apiUtility(DELETE_ACCOUNT, 'DELETE', {
      password: password.trim(),
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  loginUser,
  logoutUser,
  userProfile,
  sendForgotPasswordOtp,
  forgotPasswordOtpValidation,
  resetPassword,
  deleteAccount,
};
