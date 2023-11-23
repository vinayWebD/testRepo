import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { NETWORK_COUNT, UPDATE_EMAIL_SEND_OTP, CHANGE_PASSWORD, HELP_CENTER_CONTACT_ADMIN } =
  NETWORK_CONSTANTS;

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

export { networkCount, sendOtpToUpdateEmail, changePassword, contactAdmin };
