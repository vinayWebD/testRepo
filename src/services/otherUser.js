import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { OTHER_USER_PROFILE, OTHER_USER_NETWORKING_COUNT, OTHER_USER_FOLLOW, OTHER_USER_UNFOLLOW } =
  NETWORK_CONSTANTS;

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

const followOtherUser = async ({ id }) => {
  try {
    const data = await apiUtility(OTHER_USER_FOLLOW(id), 'POST');
    return data;
  } catch (error) {
    return error;
  }
};

const unfollowOtherUser = async ({ id }) => {
  try {
    const data = await apiUtility(OTHER_USER_UNFOLLOW(id), 'DELETE');
    return data;
  } catch (error) {
    return error;
  }
};

export { otherUserBasicData, otherUserNetworkingCount, followOtherUser, unfollowOtherUser };
