export const MESSAGES = {
  IS_REQUIRED: (label) => `${label} is required`,
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_INVALID: 'Password must be at least 6 characters',
  MSG_VALID_EMAIL: 'Enter a valid email',
  MSG_FIELD_LENGTH: (field) => `${field} should not be of more than 50 characters`,
  MSG_PASSWORD_TYPE:
    'Password must contain between 4 and 16 characters with one upper case, lower case and numeric',
};

export const TOASTMESSAGES = {
  successToast: {
    TST_LOGIN_SUCCESSFULLY: 'Signed In Successfully',
    TST_LOGOUT_SUCCESSFULLY: 'Signed Out Successfully',
    TST_SIGNUP_SUCCESSFULLY: 'Signed Up Successfully',
    TST_RESET_SUCCESSFULLY: 'Password Updated Successfully',
    TST_CODESENT_SUCCESSFULLY: 'Please enter the one time passcode recieved in your email',
    TST_PROFILE_SUCCESSFULLY: 'Profile Updated Successfully',
  },
  errorToast: {
    TST_PERMISSION_DENIED: 'Authentication Permission Denied',
    TST_SOMTHING_WRONG: 'Something went wrong, please try after some time',
    TST_NO_USER: 'User Not found',
    TST_INVALID_IMAGE_TYPE: 'Only png, jpg and jpeg format are supported',
    TST_INVALID_IMAGE_SIZE: 'Image size should be less than 3 MB',
    TST_EMAIL_ALREADY: 'The email already exists. Please signin',
    TST_EMAIL_NOTEXIST: 'This email does not exist',
    TST_OTP_GENRATE_FAILED: 'Invalid OTP',
    TST_INVALID_IMAGE: 'Invalid image file',
    TST_INVALID_FILE: 'Invalid file type',
  },
  toastid: {
    TST_LOGIN_SUCCESS_ID: 'login-success',
    TST_LOGIN_ERROR_ID: 'login-error',
    TST_LOGOUT_SEUCCESS_ID: 'logout-success',
    TST_SOMTHING_WRONG_ID: 'something-wrong',
    TST_SIGNUP_SUCCESS_ID: 'signup-success',
    TST_CODERESEND_SUCCESS_ID: 'resentcode-success',
    TST_OTP_GENRATE_FAILED_ID: 'otp-genrate-failed',
    TST_PASSWORD_RESET_SUCESS_ID: 'password-reset-success',
    TST_PASSWORD_RESET_FAILED_ID: 'password-reset-failed',
    TST_INVALID_OTP_ID: 'invalid-otp',
    TST_CODE_SUCCESS_ID: 'sentcode-success',
    TST_LOGIN_FAILED_ID: 'login-failed',
    TST_OTP_VRIFY_FAILED: 'verify-otp-failed',
    TST_OTP_RESNED_ID: 'resend-otp-failed',
  },
};
