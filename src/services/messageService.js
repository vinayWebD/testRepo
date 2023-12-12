import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { FETCH_ALL_FOLLOWERS_FOLLOWING_CONNECTION } = NETWORK_CONSTANTS;

const AllUsers = async () => {
  try {
    const data = await apiUtility(FETCH_ALL_FOLLOWERS_FOLLOWING_CONNECTION, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};
export { AllUsers };
