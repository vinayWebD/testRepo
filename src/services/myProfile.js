import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { NETWORK_COUNT, UPDATE_EMAIL_SEND_OTP, CHANGE_PASSWORD } = NETWORK_CONSTANTS;

const networkCount = async () => {
  try {
    const data = await apiUtility(NETWORK_COUNT, 'GET');
    return data;
  } catch (error) {
    return error;
  }
};

const sendOtpToUpdateEmail = async () => {
  try {
    const data = await apiUtility(UPDATE_EMAIL_SEND_OTP, 'PATCH');
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

export { networkCount, sendOtpToUpdateEmail, changePassword };
