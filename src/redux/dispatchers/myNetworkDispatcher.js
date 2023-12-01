import { PAGE_SIZE } from '../../constants/constants';
import {
  acceptFollowRequest,
  fetchFollowRequests,
  fetchMyConnections,
  fetchMyFollowers,
  fetchMyFollowings,
  invitePeople,
  rejectFollowRequest,
} from '../../services/myNetwork';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const invitePeopleDispatcher =
  ({ email = '', description = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await invitePeople({ email, description });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const fetchMyFollowersDispatcher =
  ({ page = 1, limit = 10, search = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await fetchMyFollowers({ page, limit, search });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data: data?.data };
  };

const fetchMyFollowingsDispatcher =
  ({ page = 1, limit = 10, search = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await fetchMyFollowings({ page, limit, search });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data: data?.data };
  };

const fetchMyConnectionsDispatcher =
  ({ page = 1, limit = 10, search = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await fetchMyConnections({ page, limit, search });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data: data?.data };
  };

const fetchFollowRequestsDispatcher =
  ({ page = 1, limit = PAGE_SIZE.FOLLOW_REQUESTS, search = '', showLoader = false }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await fetchFollowRequests({ page, limit, search });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const acceptFollowRequestDispatcher =
  ({ id }) =>
  async () => {
    const { status, data } = await acceptFollowRequest({ id });
    return { status, data };
  };

const rejectFollowRequestDispatcher =
  ({ id }) =>
  async () => {
    const { status, data } = await rejectFollowRequest({ id });
    return { status, data };
  };

export {
  invitePeopleDispatcher,
  fetchMyConnectionsDispatcher,
  fetchMyFollowersDispatcher,
  fetchMyFollowingsDispatcher,
  fetchFollowRequestsDispatcher,
  acceptFollowRequestDispatcher,
  rejectFollowRequestDispatcher,
};
