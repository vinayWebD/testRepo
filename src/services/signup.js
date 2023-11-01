import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';
const { SIGNUP, VERIFY_EMAIL, PRE_SIGNED_URL, PROFILE } = NETWORK_CONSTANTS;

/**
 * Function for API calling of signup user step 1
 * @param {*} param
 * @returns
 */

const signupUser = async (dataToSend) => {
  try {
    const data = await apiUtility(SIGNUP, 'POST', dataToSend);
    return data;
  } catch (error) {
    return error;
  }
};

/**
 * Function for API calling of signup user step 1
 * @param {*} param
 * @returns
 */
const verifyEmail = async (dataToSend) => {
  try {
    const data = await apiUtility(VERIFY_EMAIL, 'POST', dataToSend);
    return data;
  } catch (error) {
    return error;
  }
};

const fetchGenratePreSignedUrl = async (extension = 'jpeg', type) => {
  try {
    const response = await apiUtility(PRE_SIGNED_URL, 'GET', {
      extension: extension?.toLowerCase(),
      type,
    });
    return response;
  } catch (err) {
    return err;
  }
};

const fetchFileUPloadAWS = async (data) => {
  const { url } = data;
  try {
    const response = await apiUtility(url, 'PUT', {}, false);
    return response;
  } catch (err) {
    return err;
  }
};
const fetchProfileEdit = async (dataTosend) => {
  try {
    const response = await apiUtility(PROFILE, 'PATCH', dataTosend);
    return response;
  } catch (err) {
    return err;
  }
};

export { signupUser, verifyEmail, fetchGenratePreSignedUrl, fetchFileUPloadAWS, fetchProfileEdit };
