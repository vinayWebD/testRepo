/**
 * For API calls of authentication service
 * @param {*} param0
 * @returns
 */

import { LOGIN } from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const loginUser = async ({ email, password }) => {
  try {
    const { status, data } = await apiUtility(LOGIN, 'POST', { email, password });

    if (status === 201) {
      localStorage.setItem('token', data?.token);
    }
    return data;
  } catch (error) {
    console.log('---error', error);
    // Handle authentication error
    return { error };
  }
};

const logoutUser = async () => {
  return {
    status: true,
  };
};

export { loginUser, logoutUser };
