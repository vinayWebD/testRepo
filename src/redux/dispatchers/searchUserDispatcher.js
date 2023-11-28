import { searchUser } from '../../services/searchUser';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const searchUserDispatcher =
  ({ search = '', page = 1, limit = 10 }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await searchUser({ search, page, limit });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { searchUserDispatcher };
