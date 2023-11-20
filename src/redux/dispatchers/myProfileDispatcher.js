import { sendOtpToUpdateEmail } from '../../services/myProfile';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const sendOtpToUpdateEmailDispatcher = () => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await sendOtpToUpdateEmail();
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data };
};

export { sendOtpToUpdateEmailDispatcher };
