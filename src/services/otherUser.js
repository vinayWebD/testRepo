import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { OTHER_USER_PROFILE, OTHER_USER_NETWORKING_COUNT } = NETWORK_CONSTANTS;

const otherUserBasicData = async ({ id }) => {
  try {
    const data = await apiUtility(OTHER_USER_PROFILE(id), 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

const otherUserNetworkingCount = async ({ id }) => {
  try {
    const data = await apiUtility(OTHER_USER_NETWORKING_COUNT(id), 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

export { otherUserBasicData, otherUserNetworkingCount };
