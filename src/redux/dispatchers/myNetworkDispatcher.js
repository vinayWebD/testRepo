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

const fetchMyFollowersDispatcher = () => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await fetchMyFollowers({});
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data: data?.data?.Followers || [] };
};

const fetchMyFollowingsDispatcher = () => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await fetchMyFollowings({});
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data: data?.data?.Following || [] };
};

const fetchMyConnectionsDispatcher = () => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await fetchMyConnections({});
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data: data?.data?.Connections || [] };
};

export {
  invitePeopleDispatcher,
  fetchMyConnectionsDispatcher,
  fetchMyFollowersDispatcher,
  fetchMyFollowingsDispatcher,
};
