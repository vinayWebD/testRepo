import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { CREATE_POST, FETCH_POSTS } = NETWORK_CONSTANTS;

/**
 * API for creating post
 * @param {*} param0
 * @returns
 */
const createPost = async ({ caption, links = [], media = [] }) => {
  media = media.map((m) => ({ path: m.path }));
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

const fetchPosts = async ({ page = 1 }) => {
  try {
    const response = await apiUtility(FETCH_POSTS, 'GET', { page });
    return response;
  } catch (error) {
    return error;
  }
};

export { createPost, fetchPosts };
