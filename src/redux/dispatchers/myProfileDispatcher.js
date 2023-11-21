import { changePassword, sendOtpToUpdateEmail } from '../../services/myProfile';
import { globalTransparentLoadingPrivate } from '../slices/authSlice';

const sendOtpToUpdateEmailDispatcher = () => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await sendOtpToUpdateEmail();
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data };
};

const changePasswordDispatcher =
  ({ currentPassword, newPassword, confirmPassword }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { sendOtpToUpdateEmailDispatcher, changePasswordDispatcher };
