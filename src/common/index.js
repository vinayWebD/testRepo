/**
 * function to return boolean based on status Code
 * @param {*} statusCode
 * @returns
 */

export const successStatus = (statusCode) => {
  let status = parseInt(statusCode / 100) === 2;
  return status;
};

/**
 * function to return error string for given object
 * @param {*} data
 * @returns
 */

export const getErrorMessage = (data) => {
  return data?.message;
};
