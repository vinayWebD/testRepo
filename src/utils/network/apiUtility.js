import api from './axiosConfig';

const apiUtility = async (endpoint, method = 'GET', data) => {
  try {
    const response = await api({
      method,
      url: `${process.env.REACT_APP_API_BASE_URL}${endpoint}`,
      data,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log('---error imn api utu', error);
    if (error?.response?.status === 401) {
      // @todo: logout this user
      return { data: error.response.data, status: error.response.status };
    } else {
      return { data: error.response.data, status: error.response.status };
    }
  }
};

export default apiUtility;
