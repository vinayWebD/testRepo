import { logoutDispatcher } from '../../redux/dispatchers/authDispatcher';
import { isLoading } from '../../redux/slices/authSlice';
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
const apiUtility = async (endpoint, method = 'GET', data, dispatch = () => {}) => {
  try {
    const response = await api({
      method,
      url: `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
      data,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    if (error?.response?.status === 401) {
      dispatch(logoutDispatcher());
    } else {
      // @todo: we can probably call a dispatcher for toast
      dispatch(isLoading(false));
      alert(Object.values(error.response.data)?.[0]);
      return { data: error.response.data, status: error.response.status };
    }
  }
};

export default apiUtility;
