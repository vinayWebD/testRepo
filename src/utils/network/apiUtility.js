import { logoutDispatcher } from '../../redux/dispatchers/authDispatcher';
import { globalLoading } from '../../redux/slices/authSlice';
import api from './axiosConfig';

/**
 * Utility function to make API calls.
 *
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use. Defaults to 'GET'.
 * @param {Object} [data] - Data payload for POST, PUT, PATCH methods.
 * @param {Function} [dispatch=() => {}] - Redux dispatch function to dispatch actions. Defaults to a no-op function.
 *
 * @returns {Object} Returns an object with the response data and status.
 *                   In case of a 401 error, it dispatches the logout action, else returns the error.
 */
const apiUtility = async (url, method = 'GET', data, useAuthToken = true, dispatch = () => {}) => {
  try {
    const config = {
      method,
      url,
      useAuthToken,
    };

    // If it's a GET request and data is provided, treat data as query params
    if (method === 'GET' && data) {
      config.params = data;
    } else {
      config.data = data;
    }

    const response = await api(config);

    return { data: response.data, status: response.status };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch(logoutDispatcher());
    } else {
      // @todo: we can probably call a dispatcher for toast
      dispatch(globalLoading(false));
      return { data: error.response.data, status: error.response.status };
    }
  }
};

export default apiUtility;
