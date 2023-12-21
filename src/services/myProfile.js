import { PAGE_SIZE } from '../constants/constants';
import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const {
  NETWORK_COUNT,
  UPDATE_EMAIL_SEND_OTP,
  UPDATE_EMAIL_RESEND_OTP_OLD,
  UPDATE_EMAIL_RESEND_OTP_NEW,
  CHANGE_PASSWORD,
  HELP_CENTER_CONTACT_ADMIN,
  UPDATE_EMAIL_VERIFY_OLD_EMAIL,
  UPDATE_EMAIL_VERIFY_NEW_EMAIL,
  GET_PRIVACY_SETTINGS,
  UPDATE_PRIVACY_SETTINGS,
  PRIVACY_SETTING_ADD_SPECIFIC_USERS,
  PRIVACY_SETTING_GET_SPECIFIC_USERS,
} = NETWORK_CONSTANTS;

const networkCount = async () => {
  try {
    const data = await apiUtility(NETWORK_COUNT, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

const sendOtpToUpdateEmail = async ({ email }) => {
  try {
    const data = await apiUtility(UPDATE_EMAIL_SEND_OTP, 'PATCH', { email });
    return data;
  } catch (error) {
    return error;
  }
};

const sendOtpToUpdateOldEmail = async ({ email }) => {
  try {
    const data = await apiUtility(UPDATE_EMAIL_RESEND_OTP_OLD, 'POST', { email });
    return data;
  } catch (error) {
    return error;
  }
};

const sendOtpToUpdateNewEmail = async ({ email }) => {
  try {
    const data = await apiUtility(UPDATE_EMAIL_RESEND_OTP_NEW, 'POST', { email });
    return data;
  } catch (error) {
    return error;
  }
};

const changePassword = async ({ currentPassword, newPassword, confirmPassword }) => {
  try {
    const data = await apiUtility(CHANGE_PASSWORD, 'PATCH', {
      currentPassword,
      newPassword,
      confirmPassword,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const contactAdmin = async ({ userQuery = '' }) => {
  try {
    const data = await apiUtility(HELP_CENTER_CONTACT_ADMIN, 'POST', {
      userQuery,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const verifyOldEmail = async ({ email = '', code }) => {
  try {
    const data = await apiUtility(UPDATE_EMAIL_VERIFY_OLD_EMAIL, 'POST', {
      email,
      code,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const verifyNewEmail = async ({ email = '', code }) => {
  try {
    const data = await apiUtility(UPDATE_EMAIL_VERIFY_NEW_EMAIL, 'POST', {
      email,
      code,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const getPrivacySettings = async () => {
  try {
    const data = await apiUtility(GET_PRIVACY_SETTINGS, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

const updatePrivacySettings = async (dataToSend = {}) => {
  try {
    const data = await apiUtility(UPDATE_PRIVACY_SETTINGS, 'POST', dataToSend);
    return data;
  } catch (error) {
    return error;
  }
};
const updateSpecificUsersForPrivacySettings = async (dataToSend = {}) => {
  try {
    const data = await apiUtility(PRIVACY_SETTING_ADD_SPECIFIC_USERS, 'POST', dataToSend);
    return data;
  } catch (error) {
    return error;
  }
};

const getSpecificUsersForPrivacySettings = async ({
  search = '',
  page = 1,
  limit = PAGE_SIZE.PRIVACY_SETTING_SELECT_USERS,
  type = null,
}) => {
  try {
    const data = await apiUtility(PRIVACY_SETTING_GET_SPECIFIC_USERS, 'GET', {
      search,
      page,
      limit,
      type,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export {
  networkCount,
  sendOtpToUpdateEmail,
  sendOtpToUpdateOldEmail,
  sendOtpToUpdateNewEmail,
  changePassword,
  contactAdmin,
  verifyOldEmail,
  verifyNewEmail,
  getPrivacySettings,
  updatePrivacySettings,
  updateSpecificUsersForPrivacySettings,
  getSpecificUsersForPrivacySettings,
};
