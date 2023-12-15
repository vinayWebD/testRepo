import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';
const {
  SIGNUP,
  VERIFY_EMAIL,
  PRE_SIGNED_URL,
  PROFILE,
  CAREERS,
  ABOUT,
  CERTIFICATE,
  EDUCATION,
  ADD_EXPERIENCE,
  EDIT_EXPERIENCE,
  EXPERIENCE_BY_ID,
  DELETE_EXPERIENCE,
} = NETWORK_CONSTANTS;

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
    const { data, status } = await apiUtility(VERIFY_EMAIL, 'POST', dataToSend);

    return { data, status };
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
  const { url, selectedFile } = data;
  try {
    const response = await apiUtility(url, 'PUT', selectedFile, false, () => {}, true);
    return response;
  } catch (err) {
    return Promise.reject(err);
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

const addCareerTitle = async (dataTosend) => {
  try {
    const response = await apiUtility(CAREERS, 'POST', dataTosend);
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
      `${CAREERS}${dataTosend?.id}/educations/`,
      'POST',
      dataTosend.data,
    );
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling get single experience
 * @param {*} param
 * @returns
 */

const fetchEducationSingle = async (id) => {
  try {
    const response = await apiUtility(`${EDUCATION}${id}/`, 'GET');
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
      `${CAREERS}${dataTosend?.id}/certificates/`,
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
    const response = await apiUtility(`${CAREERS}/${id}/experiences/`, 'GET');
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
    const response = await apiUtility(`${CAREERS}${id}/educations/`, 'GET');
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
    const response = await apiUtility(`${CAREERS}${id}/certificates/`, 'GET');
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

const fetchUpdateCertificate = async (dataTosend) => {
  try {
    const response = await apiUtility(
      `${CERTIFICATE}${dataTosend?.id}/`,
      'PATCH',
      dataTosend?.data,
    );
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of get Certificate
 * @param {*} param
 * @returns
 */

const fetchCareerCertificateSingle = async (id) => {
  try {
    const response = await apiUtility(`${CERTIFICATE}${id}/`, 'GET');
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
    const response = await apiUtility(`${CAREERS}${id}/links/`, 'POST', postData);
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
    const response = await apiUtility(`${CAREERS}${id}/skills/`, 'POST', postData);
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of list of links
 * @param {*} param
 * @returns
 */

const fetchCareerLinkslist = async (id) => {
  try {
    const response = await apiUtility(`${CAREERS}${id}/links/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};
/**
 * Function for API calling of list of Links
 * @param {*} param
 * @returns
 */

const fetchCareerSkillslist = async (id) => {
  try {
    const response = await apiUtility(`${CAREERS}${id}/skills/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling get list of careers
 * @param {*} param
 * @returns
 */

const fetchCareersList = async (dataToSend) => {
  try {
    const response = await apiUtility(`${CAREERS}/${dataToSend?.id ? dataToSend?.id : ''}`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling update career
 * @param {*} param
 * @returns
 */

const updateCareerTitle = async (dataToSend) => {
  const { postData, id } = dataToSend;
  try {
    const response = await apiUtility(`${CAREERS}/${id}`, 'PATCH', postData);
    return response;
  } catch (err) {
    return err;
  }
};

const fetchDeleteCareer = async ({ id }) => {
  try {
    const response = await apiUtility(`${CAREERS}/${id}`, 'DELETE');
    return response;
  } catch (err) {
    return err;
  }
};

const addExperience = async ({
  careerId,
  title,
  description,
  startDate,
  endDate,
  company,
  isVolunteerExperience,
  isCurrentlyWorking,
}) => {
  try {
    const response = await apiUtility(ADD_EXPERIENCE(careerId), 'POST', {
      title: title?.trim(),
      description,
      startDate,
      endDate,
      company,
      isVolunteerExperience,
      isCurrentlyWorking,
    });
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling update experience
 * @param {*} param
 * @returns
 */

const updateExperience = async ({
  experienceId,
  title,
  description,
  startDate,
  endDate,
  company,
  isVolunteerExperience,
  isCurrentlyWorking,
}) => {
  try {
    const response = await apiUtility(EDIT_EXPERIENCE(experienceId), 'PATCH', {
      title: title?.trim(),
      description,
      startDate,
      endDate,
      company,
      isVolunteerExperience,
      isCurrentlyWorking,
    });
    return response;
  } catch (err) {
    return err;
  }
};

const fetchExperienceById = async ({ id }) => {
  try {
    const response = await apiUtility(EXPERIENCE_BY_ID(id), 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

const deleteExperience = async ({ id }) => {
  try {
    const response = await apiUtility(DELETE_EXPERIENCE(id), 'DELETE');
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
  addCareerTitle,
  fetchWorkInterest,
  fetchCareerEducation,
  fetchCareerCertificate,
  fetchCareerExperienceList,
  fetchCareerEducationList,
  fetchCareerCertificateList,
  fetchCareerAddLinks,
  fetchCareerAddSkills,
  fetchCareerLinkslist,
  fetchCareerSkillslist,
  fetchCareersList,
  updateCareerTitle,
  fetchUpdateCertificate,
  fetchCareerCertificateSingle,
  updateExperience,
  fetchEducationSingle,
  fetchDeleteCareer,
  addExperience,
  fetchExperienceById,
  deleteExperience,
};
