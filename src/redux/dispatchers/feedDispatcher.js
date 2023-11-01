import { deletePost } from '../../services/feed';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

/**
 * The dispatcher method to call the login API and do the necessary React related functionalities
 */
const deletePostDispatcher =
  ({ postId }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await deletePost({ postId, dispatch });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { deletePostDispatcher };
