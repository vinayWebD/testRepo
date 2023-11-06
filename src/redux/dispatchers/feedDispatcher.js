import { createComment, deletePost } from '../../services/feed';
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

export { deletePostDispatcher, createCommentDispatcher };
