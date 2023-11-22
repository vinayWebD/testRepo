import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { NOTIFICATION_LIST, MARK_READ_PATH } = NETWORK_CONSTANTS;

/**
 * Function for calling API for searching a user
 * @param {*} param
 * @returns
 */

const notificationListing = async ({ page = 1, limit = 10 }) => {
  try {
    const data = await apiUtility(NOTIFICATION_LIST, 'GET', { page, limit });
    return data;
  } catch (error) {
    return error;
  }
};

const markReadApi = async (dataToSend) => {
  try {
    const data = await apiUtility(MARK_READ_PATH, 'POST', dataToSend);
    return data;
  } catch (error) {
    return error;
  }
};

export { notificationListing, markReadApi };
