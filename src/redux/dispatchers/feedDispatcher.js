import {
  createComment,
  deleteComment,
  deletePost,
  editComment,
  reportComment,
  reportPost,
  repost,
} from '../../services/feed';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

/**
 * The dispatcher method to call the login API and do the necessary React related functionalities
 */
const deletePostDispatcher =
  ({ postId }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await deletePost({ postId });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const createCommentDispatcher =
  ({ postId, description }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await createComment({ postId, description });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const deleteCommentDispatcher =
  ({ id }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await deleteComment({ id });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const editCommentDispatcher =
  ({ id, description }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await editComment({ id, description });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const repostDispatcher =
  ({ postId, caption = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await repost({ postId, caption });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const reportCommentDispatcher =
  ({ commentId, reason = '', postLink, profileLink }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await reportComment({ commentId, reason, postLink, profileLink });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const reportPostDispatcher =
  ({ postId, reason = '', postLink, profileLink }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await reportPost({ postId, reason, postLink, profileLink });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export {
  deletePostDispatcher,
  createCommentDispatcher,
  deleteCommentDispatcher,
  editCommentDispatcher,
  repostDispatcher,
  reportCommentDispatcher,
  reportPostDispatcher,
};
