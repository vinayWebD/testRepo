export const REGEX = {
  EMAIL_PATTERN: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w{2,4}([-.]\w+)*$/,
  PASSWORD_PATTERN: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,16}$/,
  INTEGER_PATTERN: /^-?\d+(\.\d+)?$/,
};

export const VERIFY_EMAIL_ORIGIN = {
  FORGOT_PWD: '1fp',
};
