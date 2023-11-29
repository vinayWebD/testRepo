import {
  fetchMyConnections,
  fetchMyFollowers,
  fetchMyFollowings,
  invitePeople,
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

export {
  invitePeopleDispatcher,
  fetchMyConnectionsDispatcher,
  fetchMyFollowersDispatcher,
  fetchMyFollowingsDispatcher,
};
