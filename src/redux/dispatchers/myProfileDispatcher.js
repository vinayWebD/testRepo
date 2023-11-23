import { changePassword, contactAdmin, sendOtpToUpdateEmail } from '../../services/myProfile';
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

const contactAdminDispatcher =
  ({ userQuery }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await contactAdmin({
      userQuery,
    });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export { sendOtpToUpdateEmailDispatcher, changePasswordDispatcher, contactAdminDispatcher };
