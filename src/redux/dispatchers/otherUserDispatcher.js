import { PAGE_SIZE } from '../../constants/constants';
import {
  blockUser,
  fetchBlockedUsersList,
  followOtherUser,
  otherUserBasicData,
  otherUserNetworkingCount,
  reportUser,
  unblockUser,
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

const blockUserDispatcher =
  ({ userId, showLoader = false }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await blockUser({ userId });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const unblockUserDispatcher =
  ({ userId, showLoader = false }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(showLoader));
    const { status, data } = await unblockUser({ userId });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const fetchBlockedUsersDispatcher =
  ({ limit = PAGE_SIZE.BLOCKED_USERS_LIST, page = 1, search = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await fetchBlockedUsersList({ limit, page, search });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const reportUserDispatcher =
  ({ userId, reason = '', profileLink }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await reportUser({ userId, reason, profileLink });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export {
  fetchOtherUserBasicInfo,
  fetchOtherUserNetworkingCount,
  followOtherUserDispatcher,
  unfollowOtherUserDispatcher,
  blockUserDispatcher,
  unblockUserDispatcher,
  fetchBlockedUsersDispatcher,
  reportUserDispatcher,
};
