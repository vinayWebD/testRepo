export const REGEX = {
  EMAIL_PATTERN: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w{2,4}([-.]\w+)*$/,
  PASSWORD_PATTERN: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{4,16}$/,
  INTEGER_PATTERN: /^-?\d+(\.\d+)?$/,
  STRING_PATTERN: /^(\S+$)/g,
  POST_PATTERN: /^(?!\s*$).+/,
  LINK_PATTERN: /^https:\/\/[a-zA-Z0-9\-\\.]+\.[a-zA-Z]{2,}(\/\S*)?$/,
};

export const VERIFY_EMAIL_ORIGIN = {
  FORGOT_PWD: '1fp',
};

export const LIMITS = {
  POST_CAPTION_MAX_LIMIT: 100,
};
