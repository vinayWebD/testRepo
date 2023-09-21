export const VALIDATION = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};
const REGEX = {
  EMAIL_PATTERN: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w{2,4}([-.]\w+)*$/,
  PASSWORD_PATTERN: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,16}$/,
};
export { REGEX };
