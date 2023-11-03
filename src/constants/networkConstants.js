const NETWORK_CONSTANTS = {
  LOGIN: '/v1/accounts/login/',
  LOGOUT: '/v1/accounts/logout/',
  PROFILE: '/v1/accounts/',
  SIGNUP: '/v1/accounts/sign-up/',
  VERIFY_EMAIL: '/v1/accounts/verify-sign-up/',
  PRE_SIGNED_URL: '/v1/presigned-url/',
  FORGOT_PASSWORD_OTP: '/v1/accounts/forgot-password/',
  FORGOT_PASSWORD_OTP_VALIDATION: '/v1/accounts/verify-sign-up/',
  FORGOT_PASSWORD_VERIFY_OTP: '/v1/accounts/verify_otp/',
  FORGOT_PASSWORD_RESET_PWD: '/v1/accounts/reset-password/',
  CREATE_POST: '/v1/feeds/posts/',
  FETCH_POSTS: '/v1/feeds/',
  LIKE_UNLIKE_POST: (postId) => `/v1/feeds/posts/${postId}/likes/`,
  FETCH_POST_DETAILS: (postId) => `/v1/feeds/posts/${postId}/`,
  DELETE_POST: (postId) => `/v1/feeds/posts/${postId}/`,
};

export default NETWORK_CONSTANTS;
