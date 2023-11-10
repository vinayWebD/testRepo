import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { OTHER_USER_PROFILE } = NETWORK_CONSTANTS;

const otherUserBasicData = async ({ id }) => {
  try {
    const data = await apiUtility(OTHER_USER_PROFILE(id), 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

export { otherUserBasicData };
