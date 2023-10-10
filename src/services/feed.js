import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const { CREATE_POST, FETCH_POSTS, LIKE_UNLIKE_POST, FETCH_POST_DETAILS } = NETWORK_CONSTANTS;

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

const likePost = async ({ postId }) => {
  try {
    const response = await apiUtility(LIKE_UNLIKE_POST(postId), 'POST');
    return response;
  } catch (error) {
    return error;
  }
};

const unlikePost = async ({ postId }) => {
  try {
    const response = await apiUtility(LIKE_UNLIKE_POST(postId), 'DELETE');
    return response;
  } catch (error) {
    return error;
  }
};

const fetchPostDetails = async ({ postId }) => {
  try {
    const response = await apiUtility(FETCH_POST_DETAILS(postId), 'GET');
    return response;
  } catch (error) {
    return error;
  }
};

export { createPost, fetchPosts, likePost, unlikePost, fetchPostDetails };
