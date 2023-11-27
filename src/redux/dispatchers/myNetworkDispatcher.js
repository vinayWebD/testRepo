import { invitePeople } from '../../services/myNetwork';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const invitePeopleDispatcher =
  ({ email = '', description = '' }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await invitePeople({ email, description });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { invitePeopleDispatcher };
