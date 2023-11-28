import {
  followOtherUser,
  otherUserBasicData,
  otherUserNetworkingCount,
  unfollowOtherUser,
} from '../../services/otherUser';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const fetchOtherUserBasicInfo =
  ({ id, showLoader = true }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await otherUserBasicData({ id, dispatch });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const fetchOtherUserNetworkingCount =
  ({ id, showLoader = true }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await otherUserNetworkingCount({ id, dispatch });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const followOtherUserDispatcher =
  ({ id, showLoader = false }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await followOtherUser({ id, dispatch });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const unfollowOtherUserDispatcher =
  ({ id, showLoader = false }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await unfollowOtherUser({ id, dispatch });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export {
  fetchOtherUserBasicInfo,
  fetchOtherUserNetworkingCount,
  followOtherUserDispatcher,
  unfollowOtherUserDispatcher,
};
