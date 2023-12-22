import { PAGE_SIZE } from '../../constants/constants';
import {
  changePassword,
  contactAdmin,
  getPrivacySettings,
  getSpecificUsersForPrivacySettings,
  sendOtpToUpdateEmail,
  sendOtpToUpdateNewEmail,
  sendOtpToUpdateOldEmail,
  updatePrivacySettings,
  updateSpecificUsersForPrivacySettings,
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

const sendOtpToUpdateOldEmailDispatcher =
  ({ email = '' }) =>
  async (dispatch) => {
    if (email) {
      dispatch(globalTransparentLoadingPrivate(true));
      const { status, data } = await sendOtpToUpdateOldEmail({ email });
      dispatch(globalTransparentLoadingPrivate(false));
      return { status, data };
    }
  };

const sendOtpToUpdateNewEmailDispatcher =
  ({ email = '' }) =>
  async (dispatch) => {
    if (email) {
      dispatch(globalTransparentLoadingPrivate(true));
      const { status, data } = await sendOtpToUpdateNewEmail({ email });
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

const getPrivacySettingsDispatcher = () => async (dispatch) => {
  dispatch(globalTransparentLoadingPrivate(true));
  const { status, data } = await getPrivacySettings();
  dispatch(globalTransparentLoadingPrivate(false));
  return { status, data };
};

const updatePrivacySettingsDispatcher =
  (dataToSend = {}) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await updatePrivacySettings(dataToSend);
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const updateSpecificUsersForPrivacySettingsDispatcher =
  (dataToSend = {}) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await updateSpecificUsersForPrivacySettings(dataToSend);
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

const getSpecificUsersForPrivacySettingsDispatcher =
  ({ search = '', page = 1, limit = PAGE_SIZE.PRIVACY_SETTING_SELECT_USERS, type = null }) =>
  async (dispatch) => {
    dispatch(globalTransparentLoadingPrivate(true));
    const { status, data } = await getSpecificUsersForPrivacySettings({
      search,
      page,
      limit,
      type,
    });
    dispatch(globalTransparentLoadingPrivate(false));
    return { status, data };
  };

export {
  sendOtpToUpdateEmailDispatcher,
  sendOtpToUpdateOldEmailDispatcher,
  sendOtpToUpdateNewEmailDispatcher,
  changePasswordDispatcher,
  contactAdminDispatcher,
  verifyOldEmailDispatcher,
  verifyNewEmailDispatcher,
  getPrivacySettingsDispatcher,
  updatePrivacySettingsDispatcher,
  updateSpecificUsersForPrivacySettingsDispatcher,
  getSpecificUsersForPrivacySettingsDispatcher,
};
