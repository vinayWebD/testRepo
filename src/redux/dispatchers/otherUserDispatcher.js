import { otherUserBasicData } from '../../services/otherUser';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const fetchOtherUserBasicInfo =
  ({ id }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await otherUserBasicData({ id, dispatch });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { fetchOtherUserBasicInfo };
