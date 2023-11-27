import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { INVITE_PEOPLE, MY_FOLLOWERS, MY_FOLLOWINGS, MY_CONNECTIONS } = NETWORK_CONSTANTS;

const invitePeople = async ({ email, description }) => {
  try {
    const data = await apiUtility(INVITE_PEOPLE, 'POST', { email, description });
    return data;
  } catch (error) {
    return error;
  }
};

const fetchMyFollowers = async () => {
  try {
    const data = await apiUtility(MY_FOLLOWERS, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

const fetchMyFollowings = async () => {
  try {
    const data = await apiUtility(MY_FOLLOWINGS, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

const fetchMyConnections = async () => {
  try {
    const data = await apiUtility(MY_CONNECTIONS, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

export { invitePeople, fetchMyFollowers, fetchMyFollowings, fetchMyConnections };
