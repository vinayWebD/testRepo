import * as yup from 'yup';
import { REGEX } from '../constants/constants';
import { MESSAGES } from '../constants/messages';

const { IS_REQUIRED, EMAIL_INVALID, MSG_PASSWORD_TYPE, CONFIRM_PASSWORD_MISMATCH } = MESSAGES;
const { EMAIL_PATTERN, PASSWORD_PATTERN } = REGEX;

const validationLoginSchema = yup.object({
  email: yup.string().matches(EMAIL_PATTERN, EMAIL_INVALID).required(IS_REQUIRED('Email')),
  password: yup
    .string()
    .matches(PASSWORD_PATTERN, MSG_PASSWORD_TYPE)
    .required(IS_REQUIRED('Password')),
});

const validationForgotPwdSchema = yup.object().shape({
  email: yup
    .string()
    .required(IS_REQUIRED('Email'))
    .test('isValidEmailFormat', EMAIL_INVALID, (value) => EMAIL_PATTERN.test(value)),
});

const validationResetPwdSchema = yup.object({
  password: yup
    .string()
    .matches(PASSWORD_PATTERN, MSG_PASSWORD_TYPE)
    .required(IS_REQUIRED('Password')),
  confirmPassword: yup
    .string()
    .required(IS_REQUIRED('Confirm Password'))
    .oneOf([yup.ref('password'), null], CONFIRM_PASSWORD_MISMATCH),
});

export { validationLoginSchema, validationForgotPwdSchema, validationResetPwdSchema };
