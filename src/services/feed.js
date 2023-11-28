import { PAGE_SIZE } from '../constants/constants';
import NETWORK_CONSTANTS from '../constants/networkConstants';
import apiUtility from '../utils/network/apiUtility';

const {
  CREATE_POST,
  FETCH_POSTS,
  LIKE_UNLIKE_POST,
  FETCH_POST_DETAILS,
  DELETE_POST,
  EDIT_POST,
  CREATE_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT,
} = NETWORK_CONSTANTS;

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

const fetchPosts = async ({ page = 1, userId }) => {
  try {
    const response = await apiUtility(FETCH_POSTS, 'GET', { page, limit: PAGE_SIZE.FEED, userId });
    return response;
  } catch (error) {
    return error;
  }
};

const likePost = async ({ postId, type = 1 }) => {
  // 1 -> like, 0 -> unlike
  try {
    const response = await apiUtility(LIKE_UNLIKE_POST, 'POST', { PostId: postId, type });
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

const deletePost = async ({ postId }) => {
  try {
    const response = await apiUtility(DELETE_POST(postId), 'DELETE');
    return response;
  } catch (error) {
    return error;
  }
};

/**
 * API for editing post
 * @param {*} param0
 * @returns
 */
const editPost = async ({ postId, caption }) => {
  try {
    const response = await apiUtility(EDIT_POST(postId), 'PATCH', {
      caption,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const createComment = async ({ postId, description }) => {
  try {
    const response = await apiUtility(CREATE_COMMENT, 'POST', {
      PostId: postId,
      description,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getComments = async ({ postId, page = 1 }) => {
  try {
    const response = await apiUtility(GET_COMMENTS(postId), 'GET', {
      page,
      limit: PAGE_SIZE.COMMENT,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const deleteComment = async ({ id }) => {
  try {
    const response = await apiUtility(DELETE_COMMENT(id), 'DELETE');
    return response;
  } catch (error) {
    return error;
  }
};

const editComment = async ({ id, description }) => {
  try {
    const response = await apiUtility(EDIT_COMMENT(id), 'PATCH', {
      description,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  createPost,
  fetchPosts,
  likePost,
  fetchPostDetails,
  deletePost,
  editPost,
  createComment,
  getComments,
  deleteComment,
  editComment,
};
