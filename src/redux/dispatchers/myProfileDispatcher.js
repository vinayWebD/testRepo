import {
  changePassword,
  contactAdmin,
  sendOtpToUpdateEmail,
  verifyNewEmail,
  verifyOldEmail,
} from '../../services/myProfile';
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

const verifyOldEmailDispatcher =
  ({ email, code }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await verifyOldEmail({
      email,
      code,
    });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const verifyNewEmailDispatcher =
  ({ email, code }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await verifyNewEmail({
      email,
      code,
    });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export {
  sendOtpToUpdateEmailDispatcher,
  changePasswordDispatcher,
  contactAdminDispatcher,
  verifyOldEmailDispatcher,
  verifyNewEmailDispatcher,
};
