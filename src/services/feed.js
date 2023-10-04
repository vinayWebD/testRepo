import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { CREATE_POST } = NETWORK_CONSTANTS;

/**
 * API for creating post
 * @param {*} param0
 * @returns
 */
const createPost = async ({ caption, links = [], media = [] }) => {
  try {
    const response = await apiUtility(CREATE_POST, 'POST', {
      caption,
      links,
      media,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { createPost };
