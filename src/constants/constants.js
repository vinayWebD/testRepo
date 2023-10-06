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
  POST_MAX_IMAGE_SIZE_IN_BYTES: 1e7,
};

export const POST_IMAGE_TYPES = [
  'image/heif',
  'image/heic',
  'image/png',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg',
];

export const POST_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/webm',
  'video/x-matroska',
  'video/quicktime',
];

export const POST_IMAGE_EXTENSIONS = ['heif', 'heic', 'png', 'jpeg', 'png', 'gif', 'jpg'];
export const POST_VIDEO_EXTENSIONS = ['mp4', 'mpeg', 'webm', 'x-matroska', 'quicktime'];
