import { sendOtpToUpdateEmail } from '../../services/myProfile';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const sendOtpToUpdateEmailDispatcher =
  ({ email = '' }) =>
  async (dispatch) => {
    if (email) {
      dispatch(globalTransparentLoadingPrivate(true));
      const { status, data } = await sendOtpToUpdateEmail({ email });
      dispatch(globalTransparentLoadingPrivate(false));
      return { status, data };
    }
  };

export { sendOtpToUpdateEmailDispatcher };
