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
  POST_CAPTION_MAX_LIMIT: 500,
  POST_MAX_IMAGE_SIZE_IN_BYTES: 10485760,
  POST_MAX_VIDEO_SIZE_IN_BYTES: 52428800,
  POST_MAX_ALLOWED_MEDIA: 10,
  POST_READ_MORE_LIMIT: 200,
  COMMENT_MAX_LIMIT: 500,
};

export const POST_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/png', 'image/jpg'];

export const POST_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/webm',
  'video/x-matroska',
  'video/quicktime',
];

export const POST_IMAGE_EXTENSIONS = ['png', 'jpeg', 'png', 'jpg'];
export const POST_VIDEO_EXTENSIONS = ['mp4', 'mpeg', 'webm', 'x-matroska', 'quicktime'];

export const PAGE_SIZE = {
  FEED: 20,
  COMMENT: 5,
};

export const DATE_FORMAT = {
  POST: 'DD MMMM YYYY',
  CAPTION: 'DD MMM YY',
};

export const RESPONSE_FOR_NETWORK = {
  Following: {
    type: 'Following',
    innerType: 'FollowingUser',
  },
  Followers: {
    type: 'Followers',
    innerType: 'User',
  },
  Connections: {
    type: 'Connections',
    innerType: 'User',
  },
};
