import { PAGE_SIZE } from '../constants/constants';
import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const {
  INVITE_PEOPLE,
  MY_FOLLOWERS,
  MY_FOLLOWINGS,
  MY_CONNECTIONS,
  FETCH_FOLLOW_REQUEST,
  ACCEPT_FOLLOW_REQUEST,
  REJECT_FOLLOW_REQUEST,
} = NETWORK_CONSTANTS;

const invitePeople = async ({ email, description }) => {
  try {
    const data = await apiUtility(INVITE_PEOPLE, 'POST', { email, description });
    return data;
  } catch (error) {
    return error;
  }
};

const fetchMyFollowers = async ({ page = 1, limit = 10, search = '' }) => {
  try {
    const data = await apiUtility(MY_FOLLOWERS, 'GET', { page, limit, search });
    return data;
  } catch (error) {
    return error;
  }
};

const fetchMyFollowings = async ({ page = 1, limit = 10, search = '' }) => {
  try {
    const data = await apiUtility(MY_FOLLOWINGS, 'GET', { page, limit, search });
    return data;
  } catch (error) {
    return error;
  }
};

const fetchMyConnections = async ({ page = 1, limit = 10, search = '' }) => {
  try {
    const data = await apiUtility(MY_CONNECTIONS, 'GET', { page, limit, search });
    return data;
  } catch (error) {
    return error;
  }
};

const fetchFollowRequests = async ({
  page = 1,
  limit = PAGE_SIZE.FOLLOW_REQUESTS,
  search = '',
}) => {
  try {
    const data = await apiUtility(FETCH_FOLLOW_REQUEST, 'GET', { page, limit, search });
    return data;
  } catch (error) {
    return error;
  }
};

const acceptFollowRequest = async ({ id }) => {
  try {
    const data = await apiUtility(ACCEPT_FOLLOW_REQUEST(id), 'POST');
    return data;
  } catch (error) {
    return error;
  }
};

const rejectFollowRequest = async ({ id }) => {
  try {
    const data = await apiUtility(REJECT_FOLLOW_REQUEST(id), 'DELETE');
    return data;
  } catch (error) {
    return error;
  }
};

export {
  invitePeople,
  fetchMyFollowers,
  fetchMyFollowings,
  fetchMyConnections,
  fetchFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
};
