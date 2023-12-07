import { fetchDeleteCareer } from '../../services/signup';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

/**
 * The dispatcher method to call the login API and do the necessary React related functionalities
 */
const deleteWorkDispatcher =
  ({ id }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await fetchDeleteCareer({ id });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { deleteWorkDispatcher };
