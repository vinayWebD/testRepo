import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';
const {
  SIGNUP,
  VERIFY_EMAIL,
  PRE_SIGNED_URL,
  PROFILE,
  CAREERS,
  ABOUT,
  ADD_EXPERIENCE,
  EDIT_EXPERIENCE,
  EXPERIENCE_BY_ID,
  DELETE_EXPERIENCE,
  ADD_EDUCATION,
  EDIT_EDUCATION,
  GET_ALL_EDUCATIONS,
  EDUCATION_BY_ID,
  CAREER_BY_ID,
  DELETE_EDUCATION,
  ADD_CERTIFICATE,
  EDIT_CERTIFICATE,
  GET_ALL_CERTIFICATES,
  DELETE_CERTIFICATE,
  CERT_BY_ID,
  ADD_CAREER_LINK,
  GET_ALL_CAREER_SKILLS,
  UPDATE_CAREER_SKILLS,
  GET_OTHER_USER_CAREER,
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

const addEducation = async (dataTosend) => {
  try {
    const response = await apiUtility(ADD_EDUCATION(dataTosend?.id), 'POST', {
      institute: dataTosend?.institute,
      degree: dataTosend?.degree,
      filedOfStudy: dataTosend?.fieldOfStudy,
      startDate: dataTosend?.startDate,
      endDate: dataTosend?.endDate,
      otherActivities: dataTosend?.other,
    });
    return response;
  } catch (err) {
    return err;
  }
};

const editEducation = async (dataTosend) => {
  try {
    const response = await apiUtility(EDIT_EDUCATION(dataTosend?.id), 'PATCH', {
      institute: dataTosend?.institute,
      degree: dataTosend?.degree,
      filedOfStudy: dataTosend?.fieldOfStudy,
      startDate: dataTosend?.startDate,
      endDate: dataTosend?.endDate,
      otherActivities: dataTosend?.other,
    });
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

const fetchEducationById = async (id) => {
  try {
    const response = await apiUtility(EDUCATION_BY_ID(id), 'GET');
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
    const response = await apiUtility(GET_ALL_EDUCATIONS(id), 'GET');
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
    const response = await apiUtility(`${CAREERS}/${id}/links/`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of list of skills
 * @param {*} param
 * @returns
 */

const fetchCareerSkillslist = async (id) => {
  try {
    const response = await apiUtility(GET_ALL_CAREER_SKILLS(id), 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

const fetchCareerById = async (id) => {
  try {
    const response = await apiUtility(CAREER_BY_ID(id), 'GET');
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
    const response = await apiUtility(`${CAREERS}/${dataToSend?.id || ''}`, 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

const fetchOtherUserCareer = async ({ userId }) => {
  try {
    const response = await apiUtility(GET_OTHER_USER_CAREER(userId), 'GET');
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

const deleteEducation = async ({ id }) => {
  try {
    const response = await apiUtility(DELETE_EDUCATION(id), 'DELETE');
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
const addCertificate = async ({ title, year, institution, path, id }) => {
  try {
    const response = await apiUtility(ADD_CERTIFICATE(id), 'POST', {
      title,
      year,
      institution,
      path,
    });
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of editing Certificate
 * @param {*} param
 * @returns
 */
const updateCertificate = async ({ title, year, institution, path, id }) => {
  try {
    const response = await apiUtility(EDIT_CERTIFICATE(id), 'PATCH', {
      title,
      year,
      institution,
      path,
    });
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
    const response = await apiUtility(GET_ALL_CERTIFICATES(id), 'GET');
    return response;
  } catch (err) {
    return err;
  }
};

const deleteCertificate = async (id) => {
  try {
    const response = await apiUtility(DELETE_CERTIFICATE(id), 'DELETE');
    return response;
  } catch (err) {
    return err;
  }
};

/**
 * Function for API calling of getting 1 certificate
 * @param {*} param
 * @returns
 */
const fetchCertificateById = async (id) => {
  try {
    const response = await apiUtility(CERT_BY_ID(id), 'GET');
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
const addCareerLinks = async ({ links = [], careerId }) => {
  try {
    links = links.map((link) => {
      return {
        id: link?.id,
        domain: link?.domain,
        url: link?.url,
      };
    });
    const response = await apiUtility(ADD_CAREER_LINK(careerId), 'POST', links);
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
const updateCareerSkills = async (data = [], careerId) => {
  try {
    const response = await apiUtility(UPDATE_CAREER_SKILLS(careerId), 'POST', data);
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
  addEducation,
  editEducation,
  fetchCareerExperienceList,
  fetchCareerEducationList,
  fetchCareerCertificateList,
  updateCareerSkills,
  fetchCareerLinkslist,
  fetchCareerSkillslist,
  fetchCareersList,
  updateCareerTitle,
  updateExperience,
  fetchEducationById,
  fetchDeleteCareer,
  addExperience,
  fetchExperienceById,
  deleteExperience,
  fetchCareerById,
  deleteEducation,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  fetchCertificateById,
  addCareerLinks,
  fetchOtherUserCareer,
};
