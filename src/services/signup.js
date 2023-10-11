import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';
const { SIGNUP, VERIFY_EMAIL, PRE_SIGNED_URL, PROFILE, CARRERS, ABOUT } = NETWORK_CONSTANTS;

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

const fetchGenratePreSignedUrl = async () => {
  try {
    const response = await apiUtility(PRE_SIGNED_URL);
    return response;
  } catch (err) {
    return err;
  }
};

const fetchFileUPloadAWS = async (data) => {
  const { url, dataTosend } = data;
  try {
    const response = await apiUtility(url, 'POST', dataTosend, false);
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

/**
 * Function for API calling of signup user work and interset step 4
 * @param {*} param
 * @returns
 */
const fetchWorkInterest = async (dataTosend) => {
  try {
    const response = await apiUtility(ABOUT, 'PATCH', dataTosend);
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of signup user step 4
 * @param {*} param
 * @returns
 */

const fetchCareerTitle = async (dataTosend) => {
  try {
    const response = await apiUtility(CARRERS, 'POST', dataTosend);
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of add Experience
 * @param {*} param
 * @returns
 */

const fetchCareerExperience = async (dataTosend) => {
  try {
    const response = await apiUtility(
      `${CARRERS}${dataTosend?.id}/experiences/`,
      'POST',
      dataTosend.data,
    );
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of add Education
 * @param {*} param
 * @returns
 */

const fetchCareerEducation = async (dataTosend) => {
  try {
    const response = await apiUtility(
      `${CARRERS}${dataTosend?.id}/educations/`,
      'POST',
      dataTosend.data,
    );
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of add Certificate
 * @param {*} param
 * @returns
 */

const fetchCareerCertificate = async (dataTosend) => {
  try {
    const response = await apiUtility(
      `${CARRERS}${dataTosend?.id}/certificates/`,
      'POST',
      dataTosend?.data,
    );
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of get Experience List
 * @param {*} param
 * @returns
 */

const fetchCareerExperienceList = async (id) => {
  try {
    const response = await apiUtility(`${CARRERS}${id}/experiences/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of add Certificate
 * @param {*} param
 * @returns
 */

const fetchCareerEducationList = async (id) => {
  try {
    const response = await apiUtility(`${CARRERS}${id}/educations/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of get Certificate list
 * @param {*} param
 * @returns
 */

const fetchCareerCertificateList = async (id) => {
  try {
    const response = await apiUtility(`${CARRERS}${id}/certificates/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of add Links
 * @param {*} param
 * @returns
 */

const fetchCareerAddLinks = async (dataToSend) => {
  const { postData, id } = dataToSend;
  try {
    const response = await apiUtility(`${CARRERS}${id}/links/`, 'POST', postData);
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of add Skills
 * @param {*} param
 * @returns
 */

const fetchCareerAddSkills = async (dataToSend) => {
  const { postData, id } = dataToSend;
  try {
    const response = await apiUtility(`${CARRERS}${id}/skills/`, 'POST', postData);
    return response;
  } catch (err) {
    return err;
  }
};
const fetchCareerLinkslist = async (id) => {
  try {
    const response = await apiUtility(`${CARRERS}${id}/links/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of add Skills
 * @param {*} param
 * @returns
 */

const fetchCareerSkillslist = async (id) => {
  try {
    const response = await apiUtility(`${CARRERS}${id}/skills/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

export {
  signupUser,
  verifyEmail,
  fetchGenratePreSignedUrl,
  fetchFileUPloadAWS,
  fetchProfileEdit,
  fetchCareerTitle,
  fetchWorkInterest,
  fetchCareerExperience,
  fetchCareerEducation,
  fetchCareerCertificate,
  fetchCareerExperienceList,
  fetchCareerEducationList,
  fetchCareerCertificateList,
  fetchCareerAddLinks,
  fetchCareerAddSkills,
  fetchCareerLinkslist,
  fetchCareerSkillslist,
};
