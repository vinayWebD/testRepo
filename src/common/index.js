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
 * @param {*} obj
 * @returns
 */

export const getErrorMessage = (obj) => {
  const message = Object.values(obj).flat()[0];
  if (message === '<') {
    return null;
  }
  return message;
};
