import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { NETWORK_COUNT, UPDATE_EMAIL_SEND_OTP } = NETWORK_CONSTANTS;

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

export { networkCount, sendOtpToUpdateEmail };
