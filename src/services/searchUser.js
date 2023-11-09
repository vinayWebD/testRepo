import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { SEARCH_USER } = NETWORK_CONSTANTS;

/**
 * Function for calling API for searching a user
 * @param {*} param
 * @returns
 */

const searchUser = async ({ search = '', page = 1, limit = 10 }) => {
  try {
    const data = await apiUtility(SEARCH_USER, 'GET', { search, page, limit });
    return data;
  } catch (error) {
    return error;
  }
};

export { searchUser };
