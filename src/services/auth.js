import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';
const { LOGIN, LOGOUT, PROFILE } = NETWORK_CONSTANTS;

/**
 * Function for API calling of login
 * @param {*} param0
 * @returns
 */
const loginUser = async ({ email, password, dispatch }) => {
  try {
    const { status, data } = await apiUtility(LOGIN, 'POST', { email, password }, dispatch);

    return { status, data };
  } catch (error) {
    return { error };
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
    return { error };
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
    return { error };
  }
};

export { loginUser, logoutUser, userProfile };
